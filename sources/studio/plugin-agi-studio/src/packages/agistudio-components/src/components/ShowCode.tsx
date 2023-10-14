import * as React from 'react';
import { Tooltip } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import { AgiBridge } from './AgiBridge';

export function ShowCode(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState(null);
  const [compiledCode, setCompiledCode] = React.useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    let currentRoom = AgiBridge.currentRoom();
    let Agi = AgiBridge.agiExecute('Get Logic Array', 'Agi');
    let code = new Agi.LogicParser(Agi.interpreter, currentRoom);
    
    let codeData = AgiBridge.agiExecute('Get Binary', 'Resources.readAgiResource(Resources.AgiResource.Logic, ' + currentRoom + ')');
    let decompiledCode = AgiBridge.decompile(codeData, code)
    let prettyPrintedCode = AgiBridge.prettyPrintCode(decompiledCode)
    setRoomCode(prettyPrintedCode)

    setDialogOpen(true);
  };

  const handleSaveClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    let currentRoom = AgiBridge.compile(roomCode);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const handleCompileClick = (event: React.MouseEvent<HTMLElement>) => {

    try {
      let compiledCode = AgiBridge.compile(roomCode)
      let codeAsLogic = AgiBridge.newLogicFromBuffer(compiledCode)
      let reDecompiledForCheck = AgiBridge.decompile(compiledCode, codeAsLogic)
      let prettyPrinted = AgiBridge.prettyPrintCode(reDecompiledForCheck)

      setCompiledCode(prettyPrinted)
    }
    catch(err) {
      setCompiledCode("Error compiling and re-decompiling for check failed :"+err)
      console.log(err)
    }
  }

  const handleCommandUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRoomCode(event.target.value);
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xl"
        sx={{ paddingLeft: '30px' }}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle>Logic Listing</DialogTitle>

        <IconButton onClick={handleSaveClick}>
          <DataObjectRoundedIcon />
        </IconButton>

        <IconButton onClick={handleCompileClick}>
          <DataObjectRoundedIcon />
        </IconButton>

        <DialogContent>
          <TextField
            id="outlined-textarea"
            sx={{ width: '100%' }}
            multiline
            rows={10}
            value={roomCode}
          />


          <TextField
            id="outlined-textarea"
            sx={{ width: '100%' }}
            multiline
            rows={1}
            onChange={handleCommandUpdate} />

          <TextField
            id="outlined-textarea"
            sx={{ width: '100%' }}
            multiline
            rows={10}
            defaultValue={compiledCode}
          />

        </DialogContent>
      </Dialog>

      <Tooltip title={'Show Code'}>
        <IconButton
          disabled={!AgiBridge.gameIsLoaded()}
          size="medium"
          style={{ padding: 4 }}
          id="go-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <DataObjectRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default ShowCode;
