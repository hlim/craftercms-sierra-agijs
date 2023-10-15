import { post } from '@craftercms/studio-ui/utils/ajax';
import AgiActiveGame from './AgiActiveGame';
import AgiPicture from './AgiPicture';


enum AgiResource {
  Logic,
  Pic,
  View,
  Sound
}

/* globals */
var logdirRecords: IDirectoryEntry[] = [];
var picdirRecords: IDirectoryEntry[] = [];
var viewdirRecords: IDirectoryEntry[] = [];
var snddirRecords: IDirectoryEntry[] = [];
var volBuffers: ByteStream[] = [];
var availableVols: boolean[] = [];

function readAgiResource(type: AgiResource, num: number): ByteStream {
  var record = null;
  switch (type) {
    case AgiResource.Logic:
      record = logdirRecords[num];
      break;
    case AgiResource.Pic:
      record = picdirRecords[num];
      break;
    case AgiResource.View:
      record = viewdirRecords[num];
      break;
    case AgiResource.Sound:
      record = snddirRecords[num];
      break;
    default:
      throw 'Undefined resource type: ' + type;
  }

  var volstream = new ByteStream(volBuffers[record.volNo].buffer, record.volOffset);

  var sig: number = volstream.readUint16();
  var volNo: number = volstream.readUint8();
  var resLength = volstream.readUint16();

  var volPart = new ByteStream(volstream.buffer, record.volOffset + 5, record.volOffset + 5 + resLength);

  return volPart;
}

function downloadAllFiles(path: string, files: string[], done: (buffers: IByteStreamDict) => void) {
  var buffers: IByteStreamDict = {};
  var leftToDownload: number = files.length;

  function getBinary(url: string, success: (data: ArrayBuffer) => void): void {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url + '?crafterSite=agi-crafter', true);

    xhr.responseType = 'arraybuffer';

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.response === null) {
          throw "Fatal error downloading '" + url + "'";
        } else {
          console.log("Successfully downloaded '" + url + "'");
          success(xhr.response);
        }
      }
    };
    xhr.send();
  }

  function handleFile(num: number) {
    getBinary(path + files[num], (buffer: ArrayBuffer) => {
      buffers[files[num]] = new ByteStream(new Uint8Array(buffer));
      leftToDownload--;

      if (leftToDownload === 0) {
        done(buffers);
      }
    });

    for (var i = 0; i < files.length; i++) {
      handleFile(i);
    }
  }
}

interface IDirectoryEntry {
  volNo: number;
  volOffset: number;
}

class ByteStream {
  position: number = 0;
  length: number = 0;
  constructor(public buffer: Uint8Array, private startPosition: number = 0, private end: number = 0) {
    if (end == 0) this.end = this.buffer.byteLength;
    this.length = this.end - this.startPosition;
  }

  readUint8(): number {
    return this.buffer[this.startPosition + this.position++];
  }

  readUint16(littleEndian: boolean = true): number {
    var b1: number = this.buffer[this.startPosition + this.position++];
    var b2: number = this.buffer[this.startPosition + this.position++];
    if (littleEndian) {
      return (b2 << 8) + b1;
    }
    return (b1 << 8) + b2;
  }

  readInt16(littleEndian: boolean = true): number {
    var b1: number = this.buffer[this.startPosition + this.position++];
    var b2: number = this.buffer[this.startPosition + this.position++];
    if (littleEndian) {
      return (((b2 << 8) | b1) << 16) >> 16;
    }
    return (((b1 << 8) | b2) << 16) >> 16;
  }
}

interface IByteStreamDict {
  [index: string]: ByteStream;
}

export class AgiResources {
  
  static savePicture = (siteId, game, commands) => {
    downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        AgiResources.parseDirfile(buffers['LOGDIR'], logdirRecords);
        AgiResources.parseDirfile(buffers['PICDIR'], picdirRecords);
        AgiResources.parseDirfile(buffers['VIEWDIR'], viewdirRecords);
        AgiResources.parseDirfile(buffers['SNDDIR'], snddirRecords);
        var volNames: string[] = [];
        for (var i = 0; i < availableVols.length; i++) {
          if (availableVols[i] === true) {
            volNames.push('VOL.' + i);
          }
        }

        downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
          console.log('Resource volumes downloaded.');
          for (var j: number = 0; j < volNames.length; j++) {
            volBuffers[j] = buffers[volNames[j]];
          }

          let newPicData = AgiPicture.encodePictureCommands(commands);
          newPicData = AgiResources.addVolumeHeader(newPicData, 0);

          let roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
          let picRecord = picdirRecords[roomValue];
          let nextPicRecord = picdirRecords[roomValue + 1]; // assuption: not the last picture

          let picsStream = volBuffers[picRecord.volNo].buffer;

          let lengthOfOldPic = 0;
          if (nextPicRecord) {
            lengthOfOldPic = nextPicRecord.volOffset - picRecord.volOffset;
          }

          let newPicSizeDiff = newPicData.length - lengthOfOldPic; //+ 2; // last command + 255 end marker

          // now that we know how the new picture relates to the old one we can re-size the stream
          // up or down accordingly.
          let newStreamLength = picsStream.length + newPicSizeDiff;

          let newStream = new Uint8Array(newStreamLength);
          for (var n = 0; n < newStream.length; n++) {
            if (n < picRecord.volOffset || n > picRecord.volOffset + (newPicData.length - 1)) {
              // copy the original buffer to the new buffer
              if (n < picRecord.volOffset) {
                // before the new resource
                newStream[n] = picsStream[n];
              } else {
                // after our resource, we have to account for 'overlap'
                newStream[n] = picsStream[n - newPicSizeDiff];
              }
            } else {
              // copy the new picture into the new stream
              newStream[n] = newPicData[n - picRecord.volOffset];
            }
          }

          let newPicDirEncoded = AgiResources.updateDirectoryOffsets(
            'P',
            picdirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );
          let newLogDirEncoded = AgiResources.updateDirectoryOffsets(
            'L',
            logdirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );
          let newViewDirEncoded = AgiResources.updateDirectoryOffsets(
            'V',
            viewdirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );
          let newSndDirEncoded = AgiResources.updateDirectoryOffsets(
            'S',
            snddirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );

          let gamePath = '/static-assets/games/' + game + '/';
          AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);

          // save updated volume file
          AgiResources.saveFile(siteId, gamePath, 'VOL.0', newStream);
          AgiActiveGame.reload();
        });
      }
    );
  }

  static handleSaveAsNewPicture = (siteId, game) => {
    downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        AgiResources.parseDirfile(buffers['LOGDIR'], logdirRecords);
        AgiResources.parseDirfile(buffers['PICDIR'], picdirRecords);
        AgiResources.parseDirfile(buffers['VIEWDIR'], viewdirRecords);
        AgiResources.parseDirfile(buffers['SNDDIR'], snddirRecords);
        var volNames: string[] = [];
        for (var i = 0; i < availableVols.length; i++) {
          if (availableVols[i] === true) {
            volNames.push('VOL.' + i);
          }
        }

        downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
          console.log('Resource volumes downloaded.');
          for (var j: number = 0; j < volNames.length; j++) {
            volBuffers[j] = buffers[volNames[j]];
          }

          let newPicData = new Uint8Array(6);
          newPicData[0] = 240; // set pic color
          newPicData[1] = 0; // ard: black
          newPicData[2] = 0; // draw fill
          newPicData[3] = 10; // arg: x
          newPicData[4] = 0; // arg: y
          newPicData[5] = 255; // end

          newPicData = AgiResources.addVolumeHeader(newPicData, 0);

          let volNum = 0;
          let picsStream = volBuffers[0].buffer;
          let offset = picsStream.length;
          let roomValue = picdirRecords.length;
          let picRecord = (picdirRecords[roomValue] = { volNo: volNum, volOffset: offset });
          let newStreamLength = picsStream.length + newPicData.length;

          let newStream = new Uint8Array(newStreamLength);

          for (var n = 0; n < newStreamLength; n++) {
            if (n < picsStream.length) {
              // copy in the existing resources
              newStream[n] = picsStream[n];
            } else {
              // copy in new resource
              newStream[n] = newPicData[n - picsStream.length];
            }
          }

          let newPicDirEncoded = AgiResources.updateDirectoryOffsets('P', picdirRecords, picRecord.volOffset, 0);

          // Every room has a logic file. Add logic file
          let roomLogic = [
            12,
            34, // signature
            0, // volume
            112, // length
            84, // message start offset

            82,
            0,
            255,
            7,
            5,
            255,
            29,
            0,
            24,
            0,
            25,
            0,
            27,
            0,
            63,
            50,
            255,
            252,
            1,
            1,
            1,
            1,
            1,
            0,
            252,
            255,
            6,
            0,
            37,
            0,
            120,
            140,
            112,
            120,
            35,
            0,
            26,
            255,
            14,
            1,
            20,
            0,
            255,
            2,
            0,
            101,
            1,
            255,
            1,
            2,
            1,
            255,
            2,
            0,
            18,
            99,
            255,
            1,
            2,
            2,
            255,
            2,
            0,
            18,
            99,
            255,
            1,
            2,
            3,
            255,
            2,
            0,
            18,
            2,
            255,
            1,
            2,
            4,
            255,
            2,
            0,
            18,
            99,
            0,
            1,
            27,
            0,
            4,
            0,
            21,
            30,
            0,
            0,
            0,
            45,
            6,
            82,
            6,
            15,
            78,
            36,
            27,
            25,
            7,
            89,
            100,
            7,
            29,
            8,
            12,
            64,
            65
          ];

          let volStream = new Uint8Array(newStreamLength + 117);

          for (var n = 0; n < volStream.length; n++) {
            if (n < newStream.length) {
              // copy in the existing resources
              volStream[n] = newStream[n];
            } else {
              // copy in new resource
              volStream[n] = roomLogic[n - newStream.length];
            }
          }

          let logRecord = (logdirRecords[roomValue] = { volNo: volNum, volOffset: newStream.length });
          let newLogDirEncoded = AgiResources.updateDirectoryOffsets('L', logdirRecords, logRecord.volOffset, 0);

          //@ts-ignore
          let gamePath = '/static-assets/games/' + game + '/';
          AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);

          // save updated volume file
          AgiResources.saveFile(siteId, gamePath, 'VOL.0', volStream);

          AgiActiveGame.reload();
        });
      }
    );
  };

  static addVolumeHeader = (picData, volume) => {
    let endMarkerPosition = picData.length; //indexOf(255) + 1
    let sizeOfNewData = endMarkerPosition + 5;
    let dataWithHeader = new Uint8Array(sizeOfNewData);

    dataWithHeader[0] = 0x12; // signature
    dataWithHeader[1] = 0x34; // signature
    dataWithHeader[2] = volume; // volume
    dataWithHeader[3] = endMarkerPosition & (0xffff >> 8); // resource len LO
    dataWithHeader[4] = endMarkerPosition >> 8; // resource len HI
    // dataWithHeader[5] = 0    // compressed resource len LO
    // dataWithHeader[6] = 0    // compressed resource len HI

    for (var i = 0; i < picData.length; i++) {
      dataWithHeader[i + 5] = picData[i];
    }

    return dataWithHeader;
  };

  static updateDirectoryOffsets = (dirname, dirRecords, startOffset, adjustBy) => {
    // now modify the directory
    let position = 0;
    let recordCount = dirRecords.length;
    let newDirEncoded = new Uint8Array(recordCount * 3);

    for (var d = 0; d < recordCount; d++) {
      if (dirRecords[d]) {
        var offset = dirRecords[d].volOffset;
        var volume = dirRecords[d].volNo;

        if (offset > startOffset) {
          offset = dirRecords[d].volOffset + adjustBy;
        }

        newDirEncoded[position] = volume;
        newDirEncoded[position + 1] = offset >> 8;
        newDirEncoded[position + 2] = offset & (0xffff >> 8);
      } else {
        newDirEncoded[position] = 255;
        newDirEncoded[position + 1] = 255;
        newDirEncoded[position + 2] = 255;
      }

      position = position + 3;
    }

    return newDirEncoded;
  };

  static saveFile = (siteId, path, filename, data) => {
    const API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';

    // write the volume file
    let gameContentPath = path;
    let uploadFilename = filename;
    let serviceUrl =
      API_WRITE_CONTENT +
      `?site=${siteId}&path=${path}&contentType=folder&createFolders=true&draft=false&duplicate=false&unlock=true`;

    let body = new FormData();
    body.append('site', siteId);
    body.append('relativePath', 'null');
    body.append('validating', 'false');
    body.append('path', path);
    body.append('name', filename);

    body.append('type', 'application/octet-stream');
    body.append('allowed', 'true');
    body.append('file', new Blob([data]), filename);

    post(serviceUrl, body).subscribe({
      next: (response) => {
        // alert('File Saved: ' + filename);
      },
      error(e) {
        alert('File Failed :' + filename);
      }
    });
  };

  static parseDirfile(buffer: ByteStream, records: IDirectoryEntry[]): void {
    var length: number = buffer.length / 3;
    for (var i: number = 0; i < length; i++) {
      var val: number = (buffer.readUint8() << 16) + (buffer.readUint8() << 8) + buffer.readUint8();
      var volNo: number = val >>> 20;
      var volOffset: number = val & 0xfffff;
      if (val >>> 16 == 0xff) continue;
      records[i] = { volNo: volNo, volOffset: volOffset };
      if (availableVols[volNo] === undefined) availableVols[volNo] = true;
    }
  }
}

export default AgiResources
