import * as React from 'react';
import { Button, ButtonGroup, DialogActions, Paper } from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { AgiBridge } from './AgiBridge';
import { useState } from 'react';

export function EditPictureDialog(props) {
  const [commands, setCommands] = React.useState('');
  const [mouseTrapped, setMouseTrapped] = useState(false);

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
        console.log('Executing Command:' + commandName + '(' + args.join(',') + ');');
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
    rightsizedBuffer[rightsizedBuffer.length - 1] = 255;

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
    agiInterpreter.agi_draw_pic(picNo - 1);
    agiInterpreter.agi_show_pic(picNo - 1);
  };

  const renderClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!mouseTrapped) {
      var printMousePosition = function (event) {
        // something is wrong with getting commands from inside this event :-/

        let x = Math.round(event.clientX/2);
        let y = Math.round(event.clientY);

        //@ts-ignore
        var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;

        var newCommands = existingCommands.replace('End();', '');
        newCommands = newCommands + `DrawAbs(${x},${y},${x + 5},${y + 5});\nEnd();`;
        setCommands(newCommands);

        //@ts-ignore
        window.agistudioPicCommands = newCommands;

        renderCommands(newCommands);
      };

      setMouseTrapped(true);

      //@ts-ignore
      let previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
      let canvas = previewDocument.getElementById('canvas');
      canvas.addEventListener('click', printMousePosition);
    }
    //@ts-ignore
    var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;

    renderCommands(existingCommands);
  };

  const handleCommandUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let updatedCommands = event.target.value;
    //@ts-ignore
    window.agistudioPicCommands = updatedCommands;

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
    window.agistudioPicCommands = newCommands
  };

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
        <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={10} value={commands} />

        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Picture Mode</Button>
            <Button>Priorty Mode</Button>
          </ButtonGroup>
        </Paper>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Draw Relative</Button>
            <Button>Draw Absolute</Button>
            <Button>Draw Fill</Button>
          </ButtonGroup>
        </Paper>

        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={()=>{setColor(0)}} sx={{ height: "35px",  'background-color': 'black' }}></Button>
            <Button onClick={()=>{setColor(1)}} sx={{ height: "35px", 'background-color': 'darkblue' }}></Button>
            <Button onClick={()=>{setColor(2)}} sx={{ height: "35px", 'background-color': 'green' }}></Button>
            <Button onClick={()=>{setColor(3)}} sx={{ height: "35px", 'background-color': 'crayon' }}></Button>
            <Button onClick={()=>{setColor(4)}} sx={{ height: "35px", 'background-color': 'darkred' }}></Button>
            <Button onClick={()=>{setColor(5)}} sx={{ height: "35px", 'background-color': 'purple' }}></Button>
            <Button onClick={()=>{setColor(6)}} sx={{ height: "35px", 'background-color': 'brown' }}></Button>
            <Button onClick={()=>{setColor(7)}} sx={{ height: "35px", 'background-color': 'lightgray' }}></Button>
          </ButtonGroup>

          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={()=>{setColor(8)}}  sx={{ height: "35px", 'background-color': 'gray' }}></Button>
            <Button onClick={()=>{setColor(9)}}  sx={{ height: "35px", 'background-color': 'blue' }}></Button>
            <Button onClick={()=>{setColor(10)}} sx={{ height: "35px", 'background-color': 'lightgreen' }}></Button>
            <Button onClick={()=>{setColor(11)}} sx={{ height: "35px", 'background-color': 'lightcrayon' }}></Button>
            <Button onClick={()=>{setColor(12)}} sx={{ height: "35px", 'background-color': 'red' }}></Button>
            <Button onClick={()=>{setColor(13)}} sx={{ height: "35px", 'background-color': 'magenta' }}></Button>
            <Button onClick={()=>{setColor(14)}} sx={{ height: "35px", 'background-color': 'yellow', color: 'black' }}></Button>
            <Button onClick={()=>{setColor(15)}} sx={{ height: "35px", 'background-color': 'white', color: 'black' }}></Button>
          </ButtonGroup>
        </Paper>
      </DialogContent>
    </>
  );
}

export default EditPictureDialog;
