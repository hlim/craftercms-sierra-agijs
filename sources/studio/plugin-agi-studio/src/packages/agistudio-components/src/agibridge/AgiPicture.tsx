import AgiActiveGame from './AgiActiveGame';
import AgiResources from './AgiResources';

export class AgiPicture {
  static prettyPrintPictureCommands = (commands: any) => {
    let code = '';
    commands.forEach(function (command) {
      code += command + '\n';
    });

    return code;
  };

  static encodePictureCommands = (commandsToEncode) => {
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

    return rightsizedBuffer;
  };

  static getFunctionArgsFromPictureStream = (stream: any) => {
    var args = [];

    while (true) {
      var arg = stream.readUint8();
      if (arg >= 0xf0) break;
      args.push(arg);
    }

    stream.position--;

    return args;
  };

  static decodePictureStream = (stream: any) => {
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
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawYCorner(' + args.join(',') + ');');
            break;
          case 245: // DrawXCorner
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawXCorner(' + args.join(',') + ');');
            break;
          case 246: // DrawAbs
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawAbs(' + args.join(',') + ');');
            break;
          case 247: // DrawRel
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawRel(' + args.join(',') + ');');
            break;
          case 248: // DrawFill
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawFill(' + args.join(',') + ');');
            break;
          case 249: // SetPen
            var value = stream.readUint8();
            decodedCommands.push('SetPen(' + value + ');');
            break;
          case 250: // DrawPen
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
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

  static renderPictureCommands = (commandsToRender) => {
    let encodedBuffer = AgiPicture.encodePictureCommands(commandsToRender);

    let agiInterpreter = AgiActiveGame.agiExecute('Get interpreter', 'Agi.interpreter');
    let AgiPic = AgiActiveGame.agiExecute('Get Agi.Pic', 'Agi.Pic');
    let FsByteStream = AgiActiveGame.agiExecute('Get Fs', 'Fs.ByteStream');

    let picNo = agiInterpreter.variables[0];
    agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
    agiInterpreter.agi_draw_pic(0);
    agiInterpreter.agi_show_pic(0);
  };

  static createPictureDrawModeCommand = (mode) => {
    var value = 1 & 0x10 & 0x07;
    return `PicSetPen(${value});`;
  };

  static createPictureDrawCommand = (mode, x, y, scale) => {
    var newCommand = '';

    if (mode == 'Abs') {
      newCommand = `DrawAbs(${x},${y},${x + 1},${y});`;
    } else if (mode == 'Pen') {
      newCommand = `DrawPen(${x},${y},${x + scale},${y},${x},${y + scale},${x + scale},${y + scale});`;
    } else if (mode == 'Fill') {
      newCommand = `DrawFill(${x},${y});`;
    } else {
      console.log('unknown tool -> ' + mode);
    }

    return newCommand;
  };

  static createPictureSetColorCommand = (color: number) => {
    return `PicSetColor(${color});`;
  };

  static getCurrentPictureCommands = () => {
    try {
      let roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
      let currentPictureStream = AgiActiveGame.agiExecute(
        'Get Pic Stream',
        'Resources.readAgiResource(Resources.AgiResource.Pic, ' + roomValue + ')'
      );

      let decodedPictureCommands = AgiPicture.decodePictureStream(currentPictureStream);

      return AgiPicture.prettyPrintPictureCommands(decodedPictureCommands);
    } catch (err) {}
  };

  static undoPictureCommand = (commands) => {
    //@ts-ignore
    var commandsAsArray = commands.split(';');

    var lastCommandPosition = -1;
    var i = commandsAsArray.length - 1;

    // find last command position
    while (lastCommandPosition == -1 && i != 0) {
      var command = commandsAsArray[i];
      if (command != '' && command != '\n' && command != '\nEnd()') {
        lastCommandPosition = i;
      }
      i--;
    }
    var numberOfElementsToRemove = commandsAsArray.length - lastCommandPosition;
    commandsAsArray.splice(lastCommandPosition, numberOfElementsToRemove);

    var commandsAsText = commandsAsArray.join(';');
    commandsAsText += ';\nEnd();';

    return commandsAsText;
  };

  static appendPictureCommandToTail = (commands, command) => {
    var newCommands = commands.replace('End();', '');
    newCommands = newCommands + `${command}\nEnd();`;

    return newCommands;
  };

}

export default AgiPicture;
