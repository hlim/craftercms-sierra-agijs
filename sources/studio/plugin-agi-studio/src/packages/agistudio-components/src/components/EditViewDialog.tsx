import * as React from 'react';
import {
  Button,
  ButtonGroup,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { get } from '@craftercms/studio-ui/utils/ajax';

export function EditViewDialog(props) {
  const siteId = useActiveSiteId();

  const [viewData, setViewData] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [currentLoop, setCurrentLoop] = React.useState(0);
  const [currentCell, setCurrentCell] = React.useState(0);
  const [cellCount, setCellCount] = React.useState(0);
  const [loops, setLoops] = React.useState([]);
  const [availableViews, setAvailableViews] = React.useState([])

  const getViewFilesForGame = () => {
    let serviceUrl =
      'http://localhost:8080/api/1/site/content_store/children.json?url=/static-assets/games/test/agi-studio-let-them-eat-cake/src/view';

    get(serviceUrl).subscribe({
      next: (response) => {
        //@ts-ignore
        var views: { url: string; name: string }[] = [];

        //@ts-ignore
        (response.response).forEach(function(item) {
          views.push( {name: item.name, url: item.url} )
        })

        setAvailableViews(views)
      },
      error(e) {
      }
    });
  };

  const getViewFileForGame = (url) => {
    let serviceUrl = url
    get(serviceUrl).subscribe({
      next: (response) => {
        setViewData(response.response);

        // populate loop descriptions
        var loops = Array(response.response.numLoops);
    
        for (var l = 0; l < response.response.numLoops; l++) {
          loops[l] = { id: l, description: 'Loop ' + l };
        }
    
        setLoops(loops);
        renderCell();
    
      },
      error(e) {
      }
    });
  };



  const handleViewDataUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let viewDataAsJson = event.target.value;
    setViewData(JSON.parse(viewDataAsJson));

    // populate loop descriptions
    var loops = Array(viewData.numLoops);

    for (var l = 0; l < viewData.numLoops; l++) {
      loops[l] = { id: l, description: 'Loop ' + l };
    }

    setLoops(loops);
    renderCell();
  };

  const renderCell = () => {
    if (
      viewData &&
      viewData.loops &&
      viewData.loops[currentLoop] &&
      viewData.loops[currentLoop].cels &&
      viewData.loops[currentLoop].cels[currentCell] &&
      viewData.loops[currentLoop].cels[currentCell].pixelData
    ) {
      // transform pixel data for cel into 16 color bitmap
      let cel = viewData.loops[currentLoop].cels[currentCell];
      let pixelData = cel.pixelData;

      var celMirrored = (cel.celMirrorTrans & 0x80) == 0x80;
      var celMirrorLoop = (cel.celMirrorTrans >>> 4) & 7;
      var celTransparentColor = cel.celMirrorTrans & 0x0f;

      // initialize the bitmap with trasparent color
      let bitmap = Array(cel.celHeight)
        //@ts-ignore
        .fill()
        .map(() => Array(cel.celWidth).fill(celTransparentColor));

      let row = 0;
      let col = 0;
      pixelData.forEach(function (chunkData) {
        if (chunkData == 0) {
          row++;
          col = 0;
        } else {
          var color = chunkData >>> 4;
          var numPixels = chunkData & 0x0f;

          for (var k = 0; k < numPixels; k++) {
            bitmap[row][col++] = color;
          }
        }

        setRows(bitmap);
      });
    }
  };

  const htmlColor = (colorNo): string => {
    let colors = [
      'black',
      'blue',
      'green',
      'teal',
      'red',
      'purple',
      'brown',
      'lightgray',
      'gray',
      'RoyalBlue',
      'lightgreen',
      'Aqua',
      'Salmon',
      'magenta',
      'yellow',
      'white'
    ];
    let colorName = colors[colorNo];
    return colorName;
  };

  const handleSetColor = (color: number) => {};

  function handleViewChange(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    getViewFileForGame(event.target.value);
  }

  function handleLoopChange(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    setCurrentLoop(Number(event.target.value));
    setCurrentCell(0);
    setCellCount(viewData.loops[currentLoop].cels.length);
  }

  const handleCelChange = (event: Event, newValue: number | number[]) => {
    let celNo = Number(newValue);
    setCurrentCell(celNo);
    renderCell();
  };


  useEffect(() => {
    getViewFilesForGame()
    renderCell();
  }, [cellCount, currentCell, currentLoop]);

  return (
    <>
      <DialogActions></DialogActions>

      <DialogContent>
        <Paper elevation={1} sx={{ width: '1000px', padding: '1px' }}>
          <Table>
            <TableRow>
              <TableCell>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select a View</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="View"
                      onChange={handleViewChange}
                    >
                      {availableViews?.map((view) => (
                        <MenuItem value={view.url}>{view.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>







                <p>Loops: {viewData ? viewData.numLoops : 0}</p>
                <TextField
                  id="outlined-textarea"
                  sx={{ width: '100%' }}
                  multiline
                  rows={3}
                  value={JSON.stringify(viewData)}
                />
                <TextField
                  id="outlined-textarea"
                  sx={{ width: '100%' }}
                  multiline
                  rows={1}
                  onChange={handleViewDataUpdate}
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Current Loop</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentLoop}
                    label="Loop"
                    onChange={handleLoopChange}
                  >
                    {loops?.map((loop) => (
                      <MenuItem value={loop.id}>{loop.description}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Slider
                  defaultValue={0}
                  step={1}
                  min={0}
                  marks
                  max={cellCount}
                  onChange={handleCelChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />

                <ButtonGroup sx={{ width: '355px' }} variant="contained" aria-label="outlined primary button group">
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
              </TableCell>

              <TableCell>
                <Table aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow>
                        {row.map((value) => (
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: '10px', height: '10px', backgroundColor: htmlColor(value) }}
                          ></TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </Table>
        </Paper>
      </DialogContent>
    </>
  );
}
export default EditViewDialog;
