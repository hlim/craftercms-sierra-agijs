import * as React from 'react';
import { Button, DialogActions } from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { AgiBridge } from './AgiBridge';
import { useEffect, useState } from 'react';

export function EditPictureDialog(props) {
  const [commands, setCommands] = React.useState('');

  const prettyPrintCommands = (commands: any) => {
    let code = '';
    commands.forEach(function (command) {
      code += command + '\n';
    });

    return code;
  };

  const encodeCommands = () => {
    let encodedBuffer = new Uint8Array(100000);
    let parsedCommands = commands.replaceAll('\n', '').split(';');

    let i = 0;
    var skip = false

    parsedCommands.forEach(function (command) {
      var commandName = command.substring(0, command.indexOf('('));
      var args = command.replace(commandName, '').replaceAll(' ', '').replace('(', '').replace(')', '').split(',');
      var terminateArgs = false;
      var opCode = 0; // End

      if(commandName.startsWith("/*")) skip = true
      else if(commandName.startsWith("//")) skip = true
      else if(skip=true && commandName.startsWith("*/")) skip = false

      if(!skip) {
        console.log("Executing Command:"+commandName+"("+args.join(",")+");")
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
  
        // console.log('decoding ' + i + ' :' + commandName + ' => ' + opCode);
  
        encodedBuffer[i] = opCode;
        i++;
  
        for (var a = 0; a < args.length; a++) {
          var value = args[a];
          encodedBuffer[i] = parseInt(value);
          i++;
        }  
      }
    });

    let rightsizedBuffer = new Uint8Array(i);
    for (var l = 0; l < i; l++) {
      rightsizedBuffer[l] = encodedBuffer[l];
    }

    // for the picture to terminate
    rightsizedBuffer[rightsizedBuffer.length-1]=255

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

  const renderClick = (event: React.MouseEvent<HTMLElement>) => {
    let encodedBuffer = encodeCommands();

    let agiInterpreter = AgiBridge.agiExecute('Get interpreter', 'Agi.interpreter');
    let AgiPic = AgiBridge.agiExecute('Get Agi.Pic', 'Agi.Pic');
    let FsByteStream = AgiBridge.agiExecute('Get Fs', 'Fs.ByteStream');

    let picNo = agiInterpreter.variables[0];
    agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
    agiInterpreter.agi_draw_pic(picNo - 1);
    agiInterpreter.agi_show_pic(picNo - 1);

    // Agi.interpreter.loadedPics[1] = new Agi.Pic(new Fs.ByteStream( (new Uint8Array([240, 12    ,248, 49,119,255,           255])), 0));
    // Agi.interpreter.agi_draw_pic(0)
    // Agi.interpreter.agi_show_pic(0)
  };

  const handleCommandUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let updatedCommands = event.target.value;

    console.log('Updated :' + updatedCommands);
    setCommands(updatedCommands);
  };

const getCurrentPictureCommands = () => {
  try {

    let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    let currentPictureStream = AgiBridge.agiExecute(
      'Get Pic Stream',
      'Resources.readAgiResource(Resources.AgiResource.Pic, ' + roomValue + ')'
    );

    let decodedPictureCommands = decodePictureStream(currentPictureStream);

    setCommands(prettyPrintCommands(decodedPictureCommands));
  }
  catch(err) {

  }
}  
  useEffect(() => {
    // Initialize the dialog

    }, []);

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
  }

  return (
    <>
      <DialogActions>
        <Button onClick={getCurrentPictureCommands} variant="outlined" sx={{ mr: 1 }}>
          Get Commands
        </Button>

        <Button onClick={handleSwitchBuffer} variant="outlined" sx={{ mr: 1 }}>
          Switch Buffer
        </Button>

        <Button onClick={renderClick} variant="outlined" sx={{ mr: 1 }}>
          Render
        </Button>

      </DialogActions>

      <DialogContent>
        <TextField
          id="outlined-textarea"
          sx={{ width: '100%' }}
          multiline
          rows={10}
          defaultValue={commands}
          onChange={handleCommandUpdate}
        />
      </DialogContent>
    </>
  );
}

export default EditPictureDialog;
