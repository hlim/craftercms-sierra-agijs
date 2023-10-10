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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    let currentRoom = AgiBridge.currentRoom();
    let Agi = AgiBridge.agiExecute('Get Logic Array', 'Agi');
    let code = new Agi.LogicParser(Agi.interpreter, currentRoom);
    setRoomCode(AgiBridge.prettyPrintCode(AgiBridge.decompile(code)))

    setDialogOpen(true);
  };

  const handleSaveClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    let currentRoom = AgiBridge.compile(roomCode);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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

        <DialogContent>
          <TextField
            id="outlined-textarea"
            sx={{ width: '100%' }}
            multiline
            rows={20}
            defaultValue={roomCode}
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
