import * as React from 'react';
import { Button, ButtonGroup, DialogActions, Paper } from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import  AgiPicture  from "../agibridge/AgiPicture"
import  AgiResources  from "../agibridge/AgiResources"
import  AgiActiveGame  from "../agibridge/AgiActiveGame"

export function EditViewDialog(props) {
  const siteId = useActiveSiteId();

  const [viewData, setreviewData] = React.useState('');



  const handleViewDataUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let updatedCommands = event.target.value;
  };

  const handleSetColor = (color: number) => {
  };


  return (
    <>
      <DialogActions>

      </DialogActions>

      <DialogContent>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>

        </Paper>

        <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={3} value={viewData} />
        <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={1} onChange={handleViewDataUpdate} />

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
 
        </Paper>
      </DialogContent>
    </>
  );
}
export default EditViewDialog;
