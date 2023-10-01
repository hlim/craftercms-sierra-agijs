import * as React from 'react';
import { Button, ButtonGroup, DialogActions, Paper } from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { AgiBridge } from './AgiBridge';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { get, post } from '@craftercms/studio-ui/utils/ajax';
//import { ajax, AjaxError, AjaxResponse, AjaxConfig } from 'rxjs/ajax';

export function EditPictureDialog(props) {
  const siteId = useActiveSiteId();

  const [commands, setCommands] = React.useState('');
  const [upCommands, setUpCommands] = React.useState('');

  const [mouseTrapped, setMouseTrapped] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(10);
  const [drawMode, setDrawMode] = useState('Abs');

  const prettyPrintCommands = (commands: any) => {
    let code = '';
    commands.forEach(function (command) {
      code += command + '\n';
    });

    return code;
  };

  const encodeCommands = (commandsToEncode) => {
    let encodedBuffer = new Uint8Array(100000);
    let parsedCommands = commandsToEncode.replaceAll('\n', '').split(';');

    let i = 0;
    var skip = false;

    parsedCommands.forEach(function (command) {
      var commandName = command.substring(0, command.indexOf('('));
      var args = command.replace(commandName, '').replaceAll(' ', '').replace('(', '').replace(')', '').split(',');
      var opCode = 0; // End

      if (commandName.startsWith('/*')) skip = true;
      else if (commandName.startsWith('//')) skip = true;
      else if ((skip = true && commandName.startsWith('*/'))) skip = false;

      if (!skip) {
        //console.log('Executing Command:' + commandName + '(' + args.join(',') + ');');
        switch (commandName) {
          case 'PicSetColor':
            opCode = 240;
            break;
          case 'PicDisable':
            opCode = 241;
            break;
          case 'PriSetcolor':
            opCode = 242;
            break;
          case 'PriDisable':
            opCode = 243;
            break;
          case 'DrawYCorner':
            opCode = 244;
            break;
          case 'DrawXCorner':
            opCode = 245;
            break;
          case 'DrawAbs':
            opCode = 246;
            break;
          case 'DrawRel':
            opCode = 247;
            break;
          case 'DrawFill':
            opCode = 248;
            break;
          case 'SetPen':
            opCode = 249;
            break;
          case 'DrawPen':
            opCode = 250;
            break;
          case 'End':
            opCode = 255;
            break;
        }

        if (opCode != 0) {
          encodedBuffer[i] = opCode;

          {
            i++;
            if (opCode != 255)
              for (var a = 0; a < args.length; a++) {
                var value = args[a];
                encodedBuffer[i] = parseInt(value);
                i++;
              }
          }
        }
      }
    });

    let rightsizedBuffer = new Uint8Array(i);
    for (var l = 0; l < i; l++) {
      rightsizedBuffer[l] = encodedBuffer[l];
    }

    // for the picture to terminate
    //   rightsizedBuffer[rightsizedBuffer.length - 1] = 255;

    return rightsizedBuffer;
  };

  const getFunctionArgsFromPicStream = (stream: any) => {
    var args = [];

    while (true) {
      var arg = stream.readUint8();
      if (arg >= 0xf0) break;
      args.push(arg);
    }

    stream.position--;

    return args;
  };

  const decodePictureStream = (stream: any) => {
    var decodedCommands = [];
    stream.position = 0;
    var processing = true;

    while (processing) {
      var opCode = stream.readUint8();

      if (opCode >= 0xf0) {
        switch (opCode) {
          case 240: // PicSetColor
            let picColor = stream.readUint8();
            decodedCommands.push('PicSetColor(' + picColor + ');');
            break;
          case 241: // PicDisable
            decodedCommands.push('PicDisable();');
            break;
          case 242: // PriSetcolor
            let priColor = stream.readUint8();
            decodedCommands.push('PriSetcolor(' + priColor + ');');
            break;
          case 243: // PriDisable
            decodedCommands.push('PriDisable();');
            break;
          case 244: // DrawYCorner
            var args = getFunctionArgsFromPicStream(stream);
            decodedCommands.push('DrawYCorner(' + args.join(',') + ');');
            break;
          case 245: // DrawXCorner
            var args = getFunctionArgsFromPicStream(stream);
            decodedCommands.push('DrawXCorner(' + args.join(',') + ');');
            break;
          case 246: // DrawAbs
            var args = getFunctionArgsFromPicStream(stream);
            decodedCommands.push('DrawAbs(' + args.join(',') + ');');
            break;
          case 247: // DrawRel
            var args = getFunctionArgsFromPicStream(stream);
            decodedCommands.push('DrawRel(' + args.join(',') + ');');
            break;
          case 248: // DrawFill
            var args = getFunctionArgsFromPicStream(stream);
            decodedCommands.push('DrawFill(' + args.join(',') + ');');
            break;
          case 249: // SetPen
            var value = stream.readUint8();
            decodedCommands.push('SetPen(' + value + ');');
            break;
          case 250: // DrawPen
            var args = getFunctionArgsFromPicStream(stream);
            decodedCommands.push('DrawPen(' + args.join(',') + ');');
            break;
          case 255: // End
            decodedCommands.push('End();');
            processing = false;
            break;
        }
      }
    }

    return decodedCommands;
  };

  const renderCommands = (commandsToRender) => {
    let encodedBuffer = encodeCommands(commandsToRender);

    let agiInterpreter = AgiBridge.agiExecute('Get interpreter', 'Agi.interpreter');
    let AgiPic = AgiBridge.agiExecute('Get Agi.Pic', 'Agi.Pic');
    let FsByteStream = AgiBridge.agiExecute('Get Fs', 'Fs.ByteStream');

    let picNo = agiInterpreter.variables[0];
    agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
    agiInterpreter.agi_draw_pic(0);
    agiInterpreter.agi_show_pic(0);
  };

  const mouseDraw = (clientX, clientY) => {
    // something is wrong with getting commands from inside this event :-/

    //@ts-ignore
    let previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
    let canvas = previewDocument.getElementById('canvas');
    let rect = canvas.getBoundingClientRect();

    // the bit map is 160 x 200 so we need to scale the mouse input
    let ratioOfX = clientX / rect.width;
    let ratioOfY = clientY / rect.height;
    let x = Math.round(160 * ratioOfX);
    let y = Math.round(200 * ratioOfY);
    let scale = scaleFactor;

    //@ts-ignore
    var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
    //@ts-ignore
    var existingDrawMode = window.agistudioDrawMode ? window.agistudioDrawMode : drawMode;

    var newCommands = existingCommands.replace('End();', '');

    if (existingDrawMode == 'Abs') {
      newCommands = newCommands + `DrawAbs(${x},${y},${x + 1},${y},${x},${y + 1},${x + 1},${y + 1});\nEnd();`;
    } else if (existingDrawMode == 'Pen') {
      newCommands =
        newCommands + `DrawPen(${x},${y},${x + scale},${y},${x},${y + scale},${x + scale},${y + scale});\nEnd();`;
    } else if (existingDrawMode == 'Fill') {
      newCommands = newCommands + `DrawFill(${x},${y});\nEnd();`;
    } else {
      alert('unknown tool');
    }

    setCommands(newCommands);

    //@ts-ignore
    window.agistudioPicCommands = newCommands;
    //@ts-ignore
    window.agistudioDrawMode = existingDrawMode;

    renderCommands(newCommands);
  };

  const handleCommandUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let updatedCommands = event.target.value;

    var commandsAsArray = [];
    var optimizedArray = [];

    commandsAsArray = updatedCommands.split(';');
    for (var i = 0; i < commandsAsArray.length; i++) {
      if (commandsAsArray[i] != commandsAsArray[i + 1]) {
        optimizedArray[optimizedArray.length] = commandsAsArray[i];

        if (commandsAsArray[i].indexOf('End()') != -1) {
          break;
        }
      }
    }

    var newCommands = optimizedArray.join(';');

    //@ts-ignore
    window.agistudioPicCommands = newCommands;

    setCommands(newCommands);
  };

  const handleDrawModeUpdate = (mode) => {
    setDrawMode(mode);
    //@ts-ignore
    window.agistudioDrawMode = mode;

    //@ts-ignore
    var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
    var newCommands = existingCommands.replace('End();', '');

    var value = 1 & 0x10 & 0x07;
    newCommands = newCommands + `PicSetPen(${value});\nEnd();`;
    setCommands(newCommands);

    //@ts-ignore
    window.agistudioPicCommands = newCommands;
  };

  const getCurrentPictureCommands = () => {
    try {
      let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
      let currentPictureStream = AgiBridge.agiExecute(
        'Get Pic Stream',
        'Resources.readAgiResource(Resources.AgiResource.Pic, ' + roomValue + ')'
      );

      let decodedPictureCommands = decodePictureStream(currentPictureStream);

      return prettyPrintCommands(decodedPictureCommands);
    } catch (err) {}
  };

  const handleSwitchBuffer = () => {
    AgiBridge.agiExecute(
      'Get buffer mode',
      'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1'
    );
    AgiBridge.agiExecute(
      'Keep Orig Visual Buffer',
      'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb'
    );
    AgiBridge.agiExecute(
      'Set Visual Buffer',
      'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb'
    );
    AgiBridge.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
  };

  const setColor = (color: number) => {
    //@ts-ignore
    var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
    var newCommands = existingCommands.replace('End();', '');
    newCommands = newCommands + `PicSetColor(${color});\nEnd();`;
    setCommands(newCommands);

    //@ts-ignore
    window.agistudioPicCommands = newCommands;
  };

  useEffect(() => {
    // load the current picture into the commands listing

    if (!mouseTrapped) {
      var handleMouseDown = function (event) {
        //@ts-ignore
        window.agistudioMouseDraw = true;
      };
      var handleMouseUp = function (event) {
        //@ts-ignore
        window.agistudioMouseDraw = false;
        mouseDraw(event.clientX, event.clientY);
      };
      var handleMouseMove = function (event) {
        //@ts-ignore
        if (window.agistudioMouseDraw === true) {
          mouseDraw(event.clientX, event.clientY);
        }
      };
      var handleMouseClick = function (event) {
        mouseDraw(event.clientX, event.clientY);
      };

      //@ts-ignore
      let previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
      let canvas = previewDocument.getElementById('canvas');
      canvas.addEventListener('click', handleMouseClick);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mousemove', handleMouseMove);

      setMouseTrapped(true);
    }
    let currentPictureCommands = getCurrentPictureCommands();

    setCommands(currentPictureCommands);

    //@ts-ignore
    window.agistudioPicCommands = currentPictureCommands;
  }, []);

  const addVolumeHeader = (picData, volume) => {
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

  const updateDirectoryOffsets = (dirname, dirRecords, startOffset, adjustBy) => {
    // now modify the directory
    let position = 0;
    let recordCount = dirRecords.length;
    let newDirEncoded = new Uint8Array(recordCount * 3);

    for (var d = 0; d < recordCount; d++) {
      if(dirRecords[d]) {
        var offset = dirRecords[d].volOffset;
        var volume = dirRecords[d].volNo;
  
        if (offset > startOffset) {
          offset = dirRecords[d].volOffset + adjustBy;
        }
  
        newDirEncoded[position] = volume;
        newDirEncoded[position + 1] = offset >> 8;
        newDirEncoded[position + 2] = offset & (0xffff >> 8);
      }
      else {
        newDirEncoded[position] = 255;
        newDirEncoded[position + 1] = 255;
        newDirEncoded[position + 2] = 255;
      }

      position = position + 3;
    }

    return newDirEncoded;
  };

  const saveFile = (siteId, path, filename, data) => {
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
        alert('File Saved: ' + filename);
      },
      error(e) {
        alert('File Failed :' + filename);
      }
    });
  };

  const handleSavePicture = () => {
    var game = 'contest2';
    downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        parseDirfile(buffers['LOGDIR'], logdirRecords);
        parseDirfile(buffers['PICDIR'], picdirRecords);
        parseDirfile(buffers['VIEWDIR'], viewdirRecords);
        parseDirfile(buffers['SNDDIR'], snddirRecords);
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

          let newPicData = encodeCommands(commands);
          newPicData = addVolumeHeader(newPicData, 0);

          let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
          let picRecord = picdirRecords[roomValue];
          let nextPicRecord = picdirRecords[roomValue + 1]; // assuption: not the last picture

          let picsStream = volBuffers[picRecord.volNo].buffer;

          let lengthOfOldPic = 0
          if(nextPicRecord) {
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

          let newPicDirEncoded = updateDirectoryOffsets("PICDIR", picdirRecords, picRecord.volOffset, newPicSizeDiff);
          let newLogDirEncoded = updateDirectoryOffsets("LOGDIR", logdirRecords, picRecord.volOffset, newPicSizeDiff);
          let newViewDirEncoded = updateDirectoryOffsets("VIEWDIR", viewdirRecords, picRecord.volOffset, newPicSizeDiff);
          let newSndDirEncoded = updateDirectoryOffsets("SNDDIR", snddirRecords, picRecord.volOffset, newPicSizeDiff);

          let gamePath = '/static-assets/games/' + game + '/';
          saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
          saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
          saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);

          // save updated volume file
          saveFile(siteId, gamePath, 'VOL.0', newStream);
        });
      }
    );
  };

  interface IDirectoryEntry {
    volNo: number;
    volOffset: number;
  }

  var logdirRecords: IDirectoryEntry[] = [],
    picdirRecords: IDirectoryEntry[] = [],
    viewdirRecords: IDirectoryEntry[] = [],
    snddirRecords: IDirectoryEntry[] = [];
  var volBuffers: ByteStream[] = [];
  var availableVols: boolean[] = [];

  function parseDirfile(buffer: ByteStream, records: IDirectoryEntry[]): void {
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

  enum AgiResource {
    Logic,
    Pic,
    View,
    Sound
  }

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
    }

    for (var i = 0; i < files.length; i++) {
      handleFile(i);
    }
  }

  return (
    <>
      <DialogActions>
        <Button onClick={handleSwitchBuffer} variant="outlined" sx={{ mr: 1 }}>
          Switch Buffer
        </Button>
      </DialogActions>

      <DialogContent>
        <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={10} value={commands} />
        <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={1} onChange={handleCommandUpdate} />

        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <TextField id="outlined-textarea" value={scaleFactor} />
          <TextField id="outlined-textarea" value={drawMode} />
        </Paper>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Picture Mode</Button>
            <Button>Priorty Mode</Button>
          </ButtonGroup>
        </Paper>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                handleDrawModeUpdate('Rel');
              }}
            >
              Draw Relative
            </Button>
            <Button
              onClick={() => {
                handleDrawModeUpdate('Abs');
              }}
            >
              Draw Absolute
            </Button>
            <Button
              onClick={() => {
                handleDrawModeUpdate('Pen');
              }}
            >
              Draw Pen
            </Button>
            <Button
              onClick={() => {
                handleDrawModeUpdate('Fill');
              }}
            >
              Draw Fill
            </Button>
          </ButtonGroup>
        </Paper>

        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                setColor(0);
              }}
              sx={{ height: '35px', 'background-color': 'black' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(1);
              }}
              sx={{ height: '35px', 'background-color': 'darkblue' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(2);
              }}
              sx={{ height: '35px', 'background-color': 'green' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(3);
              }}
              sx={{ height: '35px', 'background-color': 'crayon' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(4);
              }}
              sx={{ height: '35px', 'background-color': 'darkred' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(5);
              }}
              sx={{ height: '35px', 'background-color': 'purple' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(6);
              }}
              sx={{ height: '35px', 'background-color': 'brown' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(7);
              }}
              sx={{ height: '35px', 'background-color': 'lightgray' }}
            ></Button>
          </ButtonGroup>

          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                setColor(8);
              }}
              sx={{ height: '35px', 'background-color': 'gray' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(9);
              }}
              sx={{ height: '35px', 'background-color': 'blue' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(10);
              }}
              sx={{ height: '35px', 'background-color': 'lightgreen' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(11);
              }}
              sx={{ height: '35px', 'background-color': 'lightcrayon' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(12);
              }}
              sx={{ height: '35px', 'background-color': 'red' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(13);
              }}
              sx={{ height: '35px', 'background-color': 'magenta' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(14);
              }}
              sx={{ height: '35px', 'background-color': 'yellow', color: 'black' }}
            ></Button>
            <Button
              onClick={() => {
                setColor(15);
              }}
              sx={{ height: '35px', 'background-color': 'white', color: 'black' }}
            ></Button>
          </ButtonGroup>
        </Paper>

        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <Button onClick={handleSavePicture} variant="outlined" sx={{ mr: 1 }}>
            Save Picture
          </Button>
        </Paper>
      </DialogContent>
    </>
  );
}

export default EditPictureDialog;
