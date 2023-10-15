import * as React from 'react';
import { Button, ButtonGroup, DialogActions, Paper } from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import  AgiPicture  from "../agibridge/AgiPicture"
import  AgiResources  from "../agibridge/AgiResources"
import  AgiActiveGame  from "../agibridge/AgiActiveGame"

export function EditPictureDialog(props) {
  const siteId = useActiveSiteId();

  const [commands, setCommands] = React.useState('');
  const [mouseTrapped, setMouseTrapped] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(10);
  const [drawMode, setDrawMode] = useState('Abs');

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

    let currentPictureCommands = AgiPicture.getCurrentPictureCommands();

    setCommands(currentPictureCommands);

    //@ts-ignore
    window.agistudioPicCommands = currentPictureCommands;
  }, []);

  const appendCommandAndRender = (command) => {
    //@ts-ignore
    if (command != window.agistudioLastCommand) {
      //@ts-ignore
      window.agistudioLastCommand = command;
      //@ts-ignore
      var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;

      var newCommands = AgiPicture.appendPictureCommandToTail(existingCommands, command);

      var newCommands = existingCommands.replace('End();', '');
      newCommands = newCommands + `${command}\nEnd();`;

      setCommands(newCommands);

      //@ts-ignore
      window.agistudioPicCommands = newCommands;

      AgiPicture.renderPictureCommands(newCommands);
    }
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

    var newCommand = AgiPicture.createPictureDrawCommand(existingDrawMode, x, y, scale);

    appendCommandAndRender(newCommand);
  };

  const handleUndoCommand = () => {
    //@ts-ignore
    var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;

    var newCommands = AgiPicture.undoPictureCommand(existingCommands);

    //@ts-ignore
    window.agistudioPicCommands = newCommands;
    setCommands(newCommands);

    AgiPicture.renderPictureCommands(newCommands);
  };

  const handleSwitchBuffer = () => {
    AgiActiveGame.switchPictureBuffer();
  };

  const handleDrawModeUpdate = (mode) => {
    setDrawMode(mode);

    //@ts-ignore
    window.agistudioDrawMode = mode;

    var newCommand = AgiPicture.createPictureDrawModeCommand(mode);
    appendCommandAndRender(newCommand);
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

    var newCommands = optimizedArray.join(';') + ';';

    //@ts-ignore
    window.agistudioPicCommands = newCommands;
    setCommands(newCommands);
    AgiPicture.renderPictureCommands(newCommands);
  };

  const handleSetColor = (color: number) => {
    var newCommand = AgiPicture.createPictureSetColorCommand(color);
    appendCommandAndRender(newCommand);
  };

  const handleSaveAsNewPicture = () => {
    var game = AgiActiveGame.getActiveGameId();

    //@ts-ignore
    AgiResources.handleSaveAsNewPicture(siteId, game);

    alert('New Picture Add Complete'); // do better
  };

  const handleSavePicture = () => {
    var game = AgiActiveGame.getActiveGameId();

    //@ts-ignore
    AgiResources.savePicture(siteId, game, commands);
    
    alert('Save Complete'); // do better
  };

  return (
    <>
      <DialogActions>
        <Button onClick={handleSaveAsNewPicture} variant="outlined" sx={{ mr: 1 }}>
          Add New Picture
        </Button>

        <Button onClick={handleSwitchBuffer} variant="outlined" sx={{ mr: 1 }}>
          Switch Buffer
        </Button>
      </DialogActions>

      <DialogContent>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <Button
            onClick={() => {
              handleUndoCommand();
            }}
          >
            Undo
          </Button>
        </Paper>

        <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={3} value={commands} />
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
                handleSetColor(0);
              }}
              sx={{ height: '35px', 'background-color': 'black' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(1);
              }}
              sx={{ height: '35px', 'background-color': 'blue' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(2);
              }}
              sx={{ height: '35px', 'background-color': 'green' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(3);
              }}
              sx={{ height: '35px', 'background-color': 'Teal' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(4);
              }}
              sx={{ height: '35px', 'background-color': 'red' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(5);
              }}
              sx={{ height: '35px', 'background-color': 'purple' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(6);
              }}
              sx={{ height: '35px', 'background-color': 'brown' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(7);
              }}
              sx={{ height: '35px', 'background-color': 'lightgray' }}
            ></Button>
          </ButtonGroup>

          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                handleSetColor(8);
              }}
              sx={{ height: '35px', 'background-color': 'gray' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(9);
              }}
              sx={{ height: '35px', 'background-color': 'RoyalBlue' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(10);
              }}
              sx={{ height: '35px', 'background-color': 'lightgreen' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(11);
              }}
              sx={{ height: '35px', 'background-color': 'Aqua' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(12);
              }}
              sx={{ height: '35px', 'background-color': 'Salmon' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(13);
              }}
              sx={{ height: '35px', 'background-color': 'magenta' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(14);
              }}
              sx={{ height: '35px', 'background-color': 'yellow', color: 'black' }}
            ></Button>
            <Button
              onClick={() => {
                handleSetColor(15);
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
export {}
export default EditPictureDialog;
