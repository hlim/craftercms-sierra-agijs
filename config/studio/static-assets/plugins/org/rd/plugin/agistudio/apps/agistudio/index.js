const React = craftercms.libs.React;
const { useState, useEffect } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, Badge, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, Paper, ButtonGroup, SwipeableDrawer, Table, TableRow, TableCell, InputLabel, Select, MenuItem: MenuItem$1, Slider, TableBody } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const DirectionsRunRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded');
const AccountTreeRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded');
const MenuList = craftercms.libs.MaterialUI.MenuList && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuList, 'default') ? craftercms.libs.MaterialUI.MenuList['default'] : craftercms.libs.MaterialUI.MenuList;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const AudiotrackRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded');
const ControlCameraRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded');
const CopyAllRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded');
const SpeakerNotesRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded');
const RoomRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded');
const DataObjectRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded');
const AddRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AddRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AddRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AddRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AddRounded');
const { createAction } = craftercms.libs.ReduxToolkit;
const { createCustomDocumentEventListener } = craftercms.utils.dom;
const { post, get } = craftercms.utils.ajax;
const ImageAspectRatioRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded');
const TheatersRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded');

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function usePreviewNavigation() {
  return useSelector((state) => state.previewNavigation);
}

var AgiActiveGame = /** @class */ (function () {
    function AgiActiveGame() {
    }
    AgiActiveGame.reload = function () {
        //@ts-ignore
        document.getElementById('crafterCMSPreviewIframe').contentWindow.location.reload();
    };
    AgiActiveGame.getActiveGameId = function () {
        //@ts-ignore
        var game = document
            .getElementById('crafterCMSPreviewIframe')
            //@ts-ignore
            .contentWindow.location.pathname.replace('/games/', '');
        return game;
    };
    AgiActiveGame.gameIsLoaded = function () {
        var gameIsLoaded = false;
        var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
        if (roomValue) {
            gameIsLoaded = true;
        }
        return gameIsLoaded;
    };
    AgiActiveGame.agiExecute = function (intent, command) {
        var frameElPath = "document.getElementById('crafterCMSPreviewIframe')";
        var previewFrameEl = eval(frameElPath);
        if (previewFrameEl) {
            var agiPath = frameElPath + '.contentWindow.Agi';
            var resourcesPath = frameElPath + '.contentWindow.Resources';
            var fsPath = frameElPath + '.contentWindow.Fs';
            var agiBooted = eval(agiPath);
            if (agiBooted) {
                try {
                    var commandToSend = command;
                    if (command.startsWith('Agi')) {
                        commandToSend = command.replaceAll('Agi', agiPath);
                    }
                    else if (command.startsWith('Resources')) {
                        commandToSend = commandToSend.replaceAll('Resources', resourcesPath);
                    }
                    else if (command.startsWith('Fs')) {
                        commandToSend = commandToSend.replaceAll('Fs', fsPath);
                    }
                    //          console.log('Sending Command :' + intent);
                    //          console.log('Command :' + command);
                    //          console.log('Sending Command :' + commandToSend);
                    // Can the rollup message be disabled?
                    var result = eval(commandToSend);
                    return result;
                }
                catch (err) {
                    console.log('Failed to send command with intent: ' + intent);
                    console.log('Command: ' + command);
                    console.log('Error: ' + err);
                }
            }
            else {
                console.log('Bridge: AGI not available');
            }
        }
    };
    AgiActiveGame.currentRoom = function () {
        var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
        return roomValue;
    };
    AgiActiveGame.switchPictureBuffer = function () {
        AgiActiveGame.agiExecute('Get buffer mode', 'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1');
        AgiActiveGame.agiExecute('Keep Orig Visual Buffer', 'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Set Visual Buffer', 'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
    };
    return AgiActiveGame;
}());

function AllowInput(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; var setInternalUrl = _c[1];
    useEffect(function () {
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiActiveGame.agiExecute('Enable Input', 'Agi.interpreter.agi_accept_input()');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Allow Input' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(DirectionsRunRoundedIcon, null)))));
}

function RoomSelector(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(0), roomCount = _e[0], setRoomCount = _e[1];
    var _f = useState(), rooms = _f[0], setRooms = _f[1];
    var loadRoomData = function () {
        var rooms = [];
        var Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');
        for (var i = 0; i < 10000; i++) {
            try {
                // @ts-ignore
                var pic = Resources.readAgiResource(Resources.AgiResource.Pic, i);
                if (pic) {
                    rooms.push(i);
                }
            }
            catch (err) { }
        }
        setRooms(rooms);
        setRoomCount(rooms.length);
        setIsFetching(false);
    };
    useEffect(function () {
        setInterval(function () {
            loadRoomData();
        }, 3 * 1000);
    }, []);
    useEffect(function () {
        loadRoomData();
    }, [currentUrlPath, AgiActiveGame.currentRoom()]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClickNewRoom = function (room) {
        AgiActiveGame.agiExecute('New Room', 'Agi.interpreter.newroom = ' + room);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Room Selector' },
            React.createElement(Badge, { badgeContent: roomCount > 0 ? roomCount : null, color: "primary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(AccountTreeRoundedIcon, null)),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } })))),
        React.createElement(Menu, { id: "demo-positioned-menu", "aria-labelledby": "demo-positioned-button", anchorEl: anchorEl, open: open, onClose: handleClose, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            } },
            React.createElement(MenuList, { dense: true, sx: { width: 320 } }, rooms === null || rooms === void 0 ? void 0 : rooms.map(function (room, idx) { return (React.createElement(React.Fragment, null,
                React.createElement(MenuItem, { onClick: function (event) { return handleClickNewRoom(room); } },
                    React.createElement("strong", null,
                        "Room ",
                        room)))); })))));
}

function SoundSelector(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; var setInternalUrl = _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(0), soundCount = _e[0], setSoundCount = _e[1];
    var _f = useState(), sounds = _f[0], setSounds = _f[1];
    var loadSoundData = function () {
        var sounds = [];
        var Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');
        for (var i = 0; i < 1000; i++) {
            try {
                // @ts-ignore
                var sound = Resources.readAgiResource(Resources.AgiResource.Sound, i);
                // @ts-ignore
                if (sound) {
                    sounds.push(i);
                }
            }
            catch (err) { }
        }
        setSounds(sounds);
        setSoundCount(sounds.length);
        setIsFetching(false);
    };
    useEffect(function () {
        loadSoundData();
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        loadSoundData();
    }, [currentUrlPath, AgiActiveGame.currentRoom()]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClickPlaySound = function (sound) {
        AgiActiveGame.agiExecute('Play Sound', 'Agi.interpreter.agi_sound(' + sound + ',1)');
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Sound Selector' },
            React.createElement(Badge, { badgeContent: soundCount > 0 ? soundCount : null, color: "secondary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(AudiotrackRoundedIcon, null)),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } })))),
        React.createElement(Menu, { id: "demo-positioned-menu", "aria-labelledby": "demo-positioned-button", anchorEl: anchorEl, open: open, onClose: handleClose, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            } },
            React.createElement(MenuList, { dense: true, sx: { width: 320 } }, sounds === null || sounds === void 0 ? void 0 : sounds.map(function (sound, idx) { return (React.createElement(React.Fragment, null,
                React.createElement(MenuItem, { onClick: function (event) { return handleClickPlaySound(sound); } },
                    React.createElement("strong", null,
                        "Sound: ",
                        sound)))); })))));
}

function SetEgoPosition(props) {
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var x = prompt('X coordinate');
        var y = prompt('Y coordinate');
        if (x && y && x != '' && y != '') {
            AgiActiveGame.agiExecute('Set Ego X Coordinate', 'Agi.interpreter.gameObjects[0].x=' + x);
            AgiActiveGame.agiExecute('Set Ego Y Coordinate', 'Agi.interpreter.gameObjects[0].y=' + y);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Set Ego Position' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(ControlCameraRoundedIcon, null)))));
}

function ShowPriorityBuffer(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiActiveGame.agiExecute('Get buffer mode', 'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1');
        AgiActiveGame.agiExecute('Keep Orig Visual Buffer', 'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Set Visual Buffer', 'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Show Priority Buffer' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(CopyAllRoundedIcon, null)))));
}

function ShowWords(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState([]), words = _c[0], setWords = _c[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var words = AgiActiveGame.agiExecute('Get Words', 'Resources.words');
        setWords(words);
        setDialogOpen(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Words"),
            React.createElement(DialogContent, null,
                React.createElement("table", { style: { width: '100%' } },
                    React.createElement("th", null, "Word Group"),
                    React.createElement("th", null, "Words"),
                    words
                        .map(function (words, i) { return (React.createElement(React.Fragment, null,
                        React.createElement("tr", { style: { width: '100%' } },
                            React.createElement("td", null,
                                React.createElement("h1", null, i)),
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, defaultValue: words.join("\n") }))))); })))),
        React.createElement(Tooltip, { title: 'Show Words' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(SpeakerNotesRoundedIcon, null)))));
}

function CurrentRoom(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; var setInternalUrl = _c[1];
    var _d = useState(-1), currentRoom = _d[0], setCurrentRoom = _d[1];
    var loadRoomData = function () {
        var roomValue = AgiActiveGame.currentRoom();
        var roomInt = (parseInt(roomValue)) ? roomValue : -1;
        setCurrentRoom(roomInt);
    };
    useEffect(function () {
        setInterval(function () {
            loadRoomData();
        }, 3 * 1000);
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        loadRoomData();
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiActiveGame.agiExecute('Reload Current Room', 'Agi.interpreter.newroom = currentRoom');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Reload Current Room' },
            React.createElement(Badge, { badgeContent: currentRoom != -1 ? currentRoom : null, color: "success", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(RoomRoundedIcon, null))))));
}

var AgiLogic = /** @class */ (function () {
    function AgiLogic() {
    }
    AgiLogic.testFunctions = [
        'equaln',
        'equalv',
        'lessn',
        'lessv',
        'greatern',
        'greaterv',
        'isset',
        'issetv',
        'has',
        'obj_in_room',
        'posn',
        'controller',
        'have_key',
        'said',
        'compare_strings',
        'obj_in_box',
        'center_posn',
        'right_posn'
    ];
    AgiLogic.statementFunctions = [
        'return',
        'increment',
        'decrement',
        'assignn',
        'assignv',
        'addn',
        'addv',
        'subn',
        'subv',
        'lindirectv',
        'rindirect',
        'lindirectn',
        'set',
        'reset',
        'toggle',
        'set_v',
        'reset_v',
        'toggle_v',
        'new_room',
        'new_room_v',
        'load_logic',
        'load_logic_v',
        'call',
        'call_v',
        'load_pic',
        'draw_pic',
        'show_pic',
        'discard_pic',
        'overlay_pic',
        'show_pri_screen',
        'load_view',
        'load_view_v',
        'discard_view',
        'animate_obj',
        'unanimate_all',
        'draw',
        'erase',
        'position',
        'position_v',
        'get_posn',
        'reposition',
        'set_view',
        'set_view_v',
        'set_loop',
        'set_loop_v',
        'fix_loop',
        'release_loop',
        'set_cel',
        'set_cel_v',
        'last_cel',
        'current_cel',
        'current_loop',
        'current_view',
        'number_of_loops',
        'set_priority',
        'set_priority_v',
        'release_priority',
        'get_priority',
        'stop_update',
        'start_update',
        'force_update',
        'ignore_horizon',
        'observe_horizon',
        'set_horizon',
        'object_on_water',
        'object_on_land',
        'object_on_anything',
        'ignore_objs',
        'observe_objs',
        'distance',
        'stop_cycling',
        'start_cycling',
        'normal_cycle',
        'end_of_loop',
        'reverse_cycle',
        'reverse_loop',
        'cycle_time',
        'stop_motion',
        'start_motion',
        'step_size',
        'step_time',
        'move_obj',
        'move_obj_v',
        'follow_ego',
        'wander',
        'normal_motion',
        'set_dir',
        'get_dir',
        'ignore_blocks',
        'observe_blocks',
        'block',
        'unblock',
        'get',
        'get_v',
        'drop',
        'put',
        'put_v',
        'get_room_v',
        'load_sound',
        'sound',
        'stop_sound',
        'print',
        'print_v',
        'display',
        'display_s',
        'set_cursor_char',
        'set_text_attribute',
        'shake_screen',
        'configure_screen',
        'status_line_on',
        'status_line_off',
        'set_string',
        'get_string',
        'word_to_string',
        'parse',
        'get_num',
        'prevent_input',
        'accept_input',
        'set_key',
        'add_to_pic',
        'add_to_pic_v',
        'status',
        'save_game',
        'restore_game',
        'init_disk',
        'restart_game',
        'show_obj',
        'random',
        'program_control',
        'player_control',
        'obj_status_v',
        'quit',
        'show_mem',
        'pause',
        'echo_line',
        'cancel_line',
        'init_joy',
        'toggle_monitor',
        'version',
        'script_size',
        'set_game_id',
        'log',
        'set_scan_start',
        'reset_scan_start',
        'reposition_to',
        'reposition_to_v',
        'trace_on',
        'trace_info',
        'print_at',
        'print_at_v',
        'discard_view_v',
        'clear_text_rect',
        'set_upper_left',
        'set_menu',
        'set_menu_member',
        'submit_menu',
        'enable_member',
        'disable_member',
        'menu_input',
        'show_obj_v',
        'open_dialogue',
        'close_dialogue',
        'mul_n',
        'mul_v',
        'div_n',
        'div_v',
        'close_window',
        'set_simple',
        'push_script',
        'pop_script',
        'hold_key',
        'set_pri_base',
        'discard_sound',
        'hide_mouse',
        'allow_menu',
        'show_mouse',
        'fence_mouse',
        'mouse_posn',
        'release_key',
        'adj_ego_move_to_xy'
    ];
    AgiLogic.prettyPrintCode = function (lines) {
        var code = '';
        lines.forEach(function (line) {
            if (line == '{') {
                code += ' ';
            }
            else {
                code += '\n';
            }
            code += line;
        });
        return code;
    };
    AgiLogic.newLogicFromBuffer = function (buffer) {
        var Agi = AgiActiveGame.agiExecute('Get Agi', 'Agi');
        // load room 1 logic and manipulate it into a "new" logic
        var logic = new Agi.LogicParser(Agi.interpreter, 1);
        var Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
        new Fs.ByteStream(buffer, 0);
        logic.logic.data = buffer; //bStreamBuffer
        logic.messages = [];
        logic.logic.messages = [];
        logic.messagesStartOffset = buffer.buffer[1];
        logic.logic.data.position = 0;
        // create the message array
        var numMessages = buffer.buffer[logic.messagesStartOffset];
        buffer.buffer[logic.messagesStartOffset + 1];
        for (var i = 0; i < numMessages; i++) {
            var msgPtr = buffer.buffer[logic.messagesStartOffset + 2 + i];
            var msgByte = -1;
            var msg = '';
            var msgByteIdx = 0;
            while (msgByte != 0) {
                msgByte = buffer.buffer[msgPtr + msgByteIdx++];
                if (msgByte != 0)
                    msg += String.fromCharCode(msgByte);
            }
            logic.logic.messages[logic.logic.messages.length] = msg;
            logic.messages[logic.messages.length] = msg;
        }
        logic.decompile();
        return logic;
    };
    AgiLogic.decompile = function (binary, logic) {
        var lines = [];
        if (logic) {
            var program = logic.decompile();
            AgiLogic.decompileScope(binary, logic.logic.messages, program, lines, 0);
            var m = 1;
            logic.logic.messages.forEach(function (msg) {
                lines.push('#message ' + m + ' "' + msg + '"');
                m++;
            });
        }
        return lines;
    };
    AgiLogic.decompileScope = function (binary, messages, scope, lines, depth) {
        scope.body.forEach(function (node) {
            lines.push('\t'.repeat(depth) + AgiLogic.decompileNode(binary, messages, node));
            if (node.then) {
                lines.push('{');
                AgiLogic.decompileScope(binary, messages, node.then, lines, depth + 1);
                lines.push('\t'.repeat(depth) + '}');
            }
            if (node.else) {
                lines.push('\t'.repeat(depth) + 'else {');
                AgiLogic.decompileScope(binary, messages, node.else, lines, depth + 1);
                lines.push('\t'.repeat(depth) + '}');
            }
        });
        return lines;
    };
    AgiLogic.decompileExpression = function (expression) {
        var line = '';
        var opCode = expression.opcode;
        var args = expression.args;
        var negate = expression.negate;
        var right = expression.right;
        var left = expression.left;
        //} else if (opCode == 0xfd) { //line += '!';
        if (left && right) {
            line += AgiLogic.decompileExpression(left);
            line += left.constructor.name == 'AndNode' ? ' && ' : ' || ';
            line += AgiLogic.decompileExpression(right);
        }
        else {
            var funcName = AgiLogic.testFunctions[opCode - 1];
            line = (negate ? '!' : '') + funcName + '(';
            if (opCode === 13) {
                line += expression.byteOffset;
            }
            else {
                if (args) {
                    var testVars = AgiLogic.processArgNames(funcName, true, args, []);
                    for (var a = 0; a < testVars.length; a++) {
                        var arg = testVars[a];
                        if (a > 0)
                            line += ', ';
                        line += arg;
                    }
                }
            }
            line += ')';
        }
        return line;
    };
    AgiLogic.processArgNames = function (funcName, isTest, args, messages) {
        var values = [];
        for (var i = 0; i < args.length; i++) {
            var value = args[i];
            if (i == 0) {
                if (isTest == true) {
                    if (funcName.startsWith('isset'))
                        value = 'f' + value;
                    else
                        value = 'v' + value;
                }
                else {
                    if (funcName === 'print')
                        value = '"' + messages[parseInt(value) - 1] + '"';
                    else if (funcName.startsWith('set_menu'))
                        value = '"' + messages[parseInt(value) - 1] + '"';
                    else if (funcName.startsWith('set'))
                        value = 'f' + value;
                    else if (funcName.startsWith('assign'))
                        value = 'v' + value;
                }
            }
            else {
                if (!isTest) {
                    if (!funcName.startsWith('assign')) {
                        if (funcName.endsWith('v'))
                            value = 'v' + value;
                        else if (funcName == 'set_menu_member')
                            value = 'c' + value;
                    }
                }
            }
            values.push(value);
        }
        return values;
    };
    AgiLogic.decompileNode = function (binary, messages, node) {
        var line = '';
        var opCode = node.opcode;
        var byteOffset = node.byteOffset; // ast node
        var statement = node.statement; // statement
        var args = node.args; // test and statement
        var expression = node.expression; // if
        if (opCode == 0x00) {
            line = 'return;';
        }
        else if (opCode == 0xff) {
            line = 'if(';
            line += AgiLogic.decompileExpression(expression);
            line += ')';
        }
        else if (opCode == 0xfe) {
            if (node.expression) {
                line = 'else (';
                line += AgiLogic.decompileExpression(expression);
                line += ')';
            }
            else {
                line += 'goto';
            }
        }
        else if (opCode == 0x0e) {
            line = 'said';
            // this does not seem to get called because
            // it's getting addressed in the if logic
        }
        else {
            var funcName = AgiLogic.statementFunctions[opCode];
            line += funcName;
            line += '(';
            if (args) {
                line += args;
            }
            else {
                var statementArgs = [];
                for (var i = 0; i < statement.length; i++) {
                    statementArgs.push(AgiLogic.getValueAtOffset(binary, byteOffset - statement.length + i));
                }
                var statementArgsx = AgiLogic.processArgNames(funcName, false, statementArgs, messages);
                for (var a = 0; a < statementArgsx.length; a++) {
                    var arg = statementArgsx[a];
                    if (a > 0)
                        line += ', ';
                    line += arg;
                }
            }
            line += ');';
        }
        return line;
    };
    AgiLogic.getValueAtOffset = function (binary, offset) {
        binary.position = offset;
        return binary.readUint8();
    };
    AgiLogic.compile = function (logicCode) {
        // this code needs to be re-built as a true parser
        var messages = [];
        var buffer = new Uint8Array(8000);
        var position = 2;
        var messageOffset = -1;
        logicCode = logicCode.replaceAll('}', '};');
        logicCode = logicCode.replaceAll('{', '{;');
        logicCode = logicCode.replaceAll('\n', '');
        logicCode = logicCode.replaceAll('\t', '');
        var messageTableStr = logicCode.substring(logicCode.indexOf('#'));
        var messageTable = messageTableStr.split('#');
        var msgIdx = 0;
        messageTable.forEach(function (msg) {
            msg = msg
                .substring(msg.indexOf('"'), msg.lastIndexOf('"') + 1)
                .replaceAll('"', '');
            messageTable[msgIdx] = msg;
            msgIdx++;
        });
        var lines = [];
        lines = logicCode.split(';');
        var openScopePosition = 0; // doing this does not allow nesting of scopes :(
        lines.forEach(function (line) {
            var lineToParse = line; //.replaceAll(" ", "")
            //lineToParse = lineToParse.toLowerCase(); // don't do this. it creates ambiguity
            var command = '';
            try {
                if (lineToParse.indexOf('(') != -1) {
                    // function or if statement
                    command = lineToParse.substring(0, lineToParse.indexOf('('));
                }
                else {
                    // other
                    command = lineToParse;
                }
                var opCode = -1;
                var args_1 = [];
                if (command === 'return') {
                    opCode = 0x00;
                }
                else if (command === 'if') {
                    opCode = 0xff;
                    var testStr = lineToParse.replace('if(', '').replace(') {', '');
                    var testStrArray = testStr.split(/\|\||\&\&/);
                    testStrArray.forEach(function (testStr) {
                        // 0xFC OR
                        // 0xFD AND
                        // NEGATED?
                        var compareCommand = testStr.substring(0, testStr.indexOf('('));
                        var compOpCode = AgiLogic.testFunctions.indexOf(compareCommand) + 1;
                        var compareArgsStr = testStr.substring(testStr.indexOf('(') + 1, testStr.indexOf(')'));
                        compareArgsStr = compareArgsStr.replaceAll('f', '');
                        compareArgsStr = compareArgsStr.replaceAll('v', '');
                        var compareArgs = compareArgsStr.split(',');
                        args_1[args_1.length] = compOpCode;
                        if (compOpCode === 0x0e) {
                            // said
                            args_1[args_1.length] = 1; //hack
                        }
                        compareArgs.forEach(function (arg) {
                            var argAsNum = parseInt(arg);
                            arg = isNaN(argAsNum) ? arg : argAsNum;
                            args_1[args_1.length] = arg;
                        });
                    });
                    args_1[args_1.length] = 0xff; // close the if clause if(....)
                    args_1[args_1.length] = 0x00; // length of scope
                    args_1[args_1.length] = 0x00; // length of scope
                    openScopePosition = position + 1 /* op code */ + args_1.length;
                }
                else if (command === 'else') {
                    opCode = 0xfe;
                }
                else if (command === 'said') {
                    opCode = 0x0e;
                }
                else if (command === '}') {
                    // close of scope, nothng to do
                    var byteCount = position - openScopePosition;
                    buffer[openScopePosition - 2] = byteCount;
                }
                else if (command.indexOf('#') != -1) {
                    // message table item
                    if (messageOffset === -1) {
                        messageOffset = position;
                    }
                    var msg = line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""));
                    messages.push(msg);
                }
                else {
                    opCode = AgiLogic.statementFunctions.indexOf(command);
                    var argsStr = lineToParse.replaceAll(command, '');
                    argsStr = argsStr.replace('(', '').replace(')', '');
                    argsStr = argsStr.replaceAll('f', '');
                    argsStr = argsStr.replaceAll('v', '');
                    args_1 = argsStr != '' ? argsStr.split(',') : [];
                    // convert argments that are strings to ID in message tabel
                    var argIdx_1 = 0;
                    args_1.forEach(function (arg) {
                        if (arg.indexOf('"') != -1) {
                            var msg_1 = arg.replaceAll('"', '');
                            var msgId = messageTable.indexOf(msg_1);
                            if (msgId != -1) {
                                args_1[argIdx_1++] = msgId;
                            }
                        }
                        else {
                            var argAsNum = parseInt(arg);
                            args_1[argIdx_1++] = isNaN(argAsNum) ? arg : argAsNum;
                        }
                    });
                }
                if (opCode != -1) {
                    buffer[position] = opCode;
                    position++;
                    args_1.forEach(function (arg) {
                        buffer[position] = arg;
                        position++;
                    });
                    console.log('opcode :' + command + ' => ' + opCode + ' | ' + args_1);
                }
            }
            catch (err) {
                console.log('err parsing command :' + line + ' => ' + command);
            }
        });
        // encode messages
        if (messageOffset === -1) {
            messageOffset = position;
        }
        buffer[position++] = messages.length;
        var ptrMsgsEndPos = position;
        // create a space for message pointers
        position = position + messages.length;
        // now add the messages to the buffer
        for (var k = 0; k < messages.length; k++) {
            buffer[position++] = k; // message index
            buffer[ptrMsgsEndPos + 1 + k] = position; // message position
            var message = messages[k];
            for (var j = 0; j < message.length; j++) {
                buffer[position++] = message.charCodeAt(j);
            }
            buffer[position++] = 0;
        }
        // note where message structure ends
        buffer[ptrMsgsEndPos] = position;
        // create a final buffer of the correct size and populate it
        var rightSizedBuffer = new Uint8Array(position);
        for (var i = 0; i < position; i++) {
            rightSizedBuffer[i] = buffer[i];
        }
        // set the message offset
        messageOffset = messageOffset != -1 ? messageOffset : position;
        rightSizedBuffer[1] = messageOffset;
        //    rightSizedBuffer[1] = messageOffset << 16
        var Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
        var bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
        return bStreamBuffer;
    };
    return AgiLogic;
}());

function ShowCode(props) {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState(null), roomCode = _c[0], setRoomCode = _c[1];
    var _d = React.useState(""), compiledCode = _d[0], setCompiledCode = _d[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var currentRoom = AgiActiveGame.currentRoom();
        var Agi = AgiActiveGame.agiExecute('Get Logic Array', 'Agi');
        var code = new Agi.LogicParser(Agi.interpreter, currentRoom);
        var codeData = AgiActiveGame.agiExecute('Get Binary', 'Resources.readAgiResource(Resources.AgiResource.Logic, ' + currentRoom + ')');
        var decompiledCode = AgiLogic.decompile(codeData, code);
        var prettyPrintedCode = AgiLogic.prettyPrintCode(decompiledCode);
        setRoomCode(prettyPrintedCode);
        setDialogOpen(true);
    };
    var handleSaveClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiLogic.compile(roomCode);
    };
    var handleCompileClick = function (event) {
        try {
            var compiledCode_1 = AgiLogic.compile(roomCode);
            var codeAsLogic = AgiLogic.newLogicFromBuffer(compiledCode_1);
            var reDecompiledForCheck = AgiLogic.decompile(compiledCode_1, codeAsLogic);
            var prettyPrinted = AgiLogic.prettyPrintCode(reDecompiledForCheck);
            setCompiledCode(prettyPrinted);
        }
        catch (err) {
            setCompiledCode("Error compiling and re-decompiling for check failed :" + err);
            console.log(err);
        }
    };
    var handleCommandUpdate = function (event) {
        setRoomCode(event.target.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Logic Listing"),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleSaveClick }, "Compile and Save"),
                React.createElement(Button, { onClick: handleCompileClick }, "Compile and then Decompile")),
            React.createElement(DialogContent, null,
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, value: roomCode }),
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 1, onChange: handleCommandUpdate }),
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, defaultValue: compiledCode }))),
        React.createElement(Tooltip, { title: 'Show Code' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(DataObjectRoundedIcon, null)))));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// region Batch Actions
const batchActions = /*#__PURE__*/ createAction('BATCH_ACTIONS');
// endregion
// region dispatch DOM Event
const dispatchDOMEvent = /*#__PURE__*/ createAction('DISPATCH_DOM_EVENT');
// endregion

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// endregion
// region Upload Dialog
const showUploadDialog = /*#__PURE__*/ createAction('SHOW_UPLOAD_DIALOG');
const closeUploadDialog = /*#__PURE__*/ createAction('CLOSE_UPLOAD_DIALOG');
// endregion

function AddGame(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState(""), gameId = _c[0], setGameId = _c[1];
    var _d = React.useState(""), gameTitle = _d[0], setGameTitle = _d[1];
    var API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        setDialogOpen(true);
    };
    var handleIdChange = function (event) {
        setGameId(event.target.value);
    };
    var handleTitleChange = function (event) {
        setGameTitle(event.target.value);
    };
    var handleAdd = function () {
        handleUploadAsset();
    };
    var cancelClick = function (event) {
        setAnchorEl(event.currentTarget);
        setDialogOpen(false);
    };
    var handleUploadAsset = function () {
        createCustomDocumentEventListener('AGISTUDIO_UPLOAD_GAME', function (response) {
            console.log('Game files uploaded. Add the game page to the library');
            console.log(response);
            var NowDate = new Date().toISOString();
            var objectId = generateUUID();
            var objectGroupId = objectId.substring(0, 4);
            var gameContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<page>\n" +
                "\t<content-type>/page/gametitle</content-type>\n" +
                "\t<display-template>/templates/web/Game.ftl</display-template>\n" +
                "\t<no-template-required>true</no-template-required>\n" +
                "\t<merge-strategy>inherit-levels</merge-strategy>\n" +
                "\t<file-name>index.xml</file-name>\n" +
                "\t<orderDefault_f>4000</orderDefault_f>\n" +
                "\t<placeInNav>true</placeInNav>\n" +
                "\t<game_s>" + gameId + "</game_s>\n" +
                "\t<folder-name>" + gameId + "</folder-name>\n" +
                "\t<navLabel>" + gameTitle + "</navLabel>\n" +
                "\t<internal-name>" + gameTitle + "</internal-name>\n" +
                "\t<objectGroupId>" + objectGroupId + "</objectGroupId>\n" +
                "\t<objectId>" + objectId + "</objectId>\n" +
                "\t<createdDate>" + NowDate + "</createdDate>\n" +
                "\t<createdDate_dt>" + NowDate + "</createdDate_dt>\n" +
                "\t<lastModifiedDate>" + NowDate + "</lastModifiedDate>\n" +
                "\t<lastModifiedDate_dt>" + NowDate + "</lastModifiedDate_dt>\n" +
                "</page>";
            var gameContentPath = "/site/website/games/" + gameId;
            var serviceUrl = API_WRITE_CONTENT + "?site=".concat(siteId, "&path=").concat(gameContentPath, "&fileName=index.xml&contentType=gametitle&createFolders=true&draft=false&duplicate=false&unlock=true");
            post(serviceUrl, gameContent).subscribe({
                next: function (response) {
                    console.log("content created");
                    setDialogOpen(false);
                },
                error: function (e) { }
            });
        });
        var gamePath = "/static-assets/games/" + gameId + "/";
        dispatch(showUploadDialog({
            path: gamePath,
            site: siteId,
            onClose: batchActions([
                closeUploadDialog(),
                dispatchDOMEvent({
                    id: 'AGISTUDIO_UPLOAD_GAME'
                })
            ])
        }));
    };
    var generateUUID = function () {
        var d = new Date().getTime(); //Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) { //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else { //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Add Game"),
            React.createElement(DialogContent, null,
                React.createElement(FormControl, { margin: "normal", fullWidth: true },
                    React.createElement(TextField, { defaultValue: "", id: "gameId", label: "Game ID", variant: "outlined", onChange: handleIdChange })),
                React.createElement(FormControl, { margin: "normal", fullWidth: true },
                    React.createElement(TextField, { defaultValue: "", id: "gameTitle", label: "Game Title", variant: "outlined", onChange: handleTitleChange }))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: cancelClick, variant: "outlined", sx: { mr: 1 } }, "Cancel"),
                React.createElement(Button, { onClick: handleAdd, variant: "outlined", sx: { mr: 1 } }, "Upload Game Files & Save"))),
        React.createElement(Tooltip, { title: 'Add Game' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(AddRoundedIcon, null)))));
}

var AgiPicture = /** @class */ (function () {
    function AgiPicture() {
    }
    AgiPicture.prettyPrintPictureCommands = function (commands) {
        var code = '';
        commands.forEach(function (command) {
            code += command + '\n';
        });
        return code;
    };
    AgiPicture.encodePictureCommands = function (commandsToEncode) {
        var encodedBuffer = new Uint8Array(100000);
        var parsedCommands = commandsToEncode.replaceAll('\n', '').split(';');
        var i = 0;
        var skip = false;
        parsedCommands.forEach(function (command) {
            var commandName = command.substring(0, command.indexOf('('));
            var args = command.replace(commandName, '').replaceAll(' ', '').replace('(', '').replace(')', '').split(',');
            var opCode = 0; // End
            if (commandName.startsWith('/*'))
                skip = true;
            else if (commandName.startsWith('//'))
                skip = true;
            else if ((skip = commandName.startsWith('*/')))
                skip = false;
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
        var rightsizedBuffer = new Uint8Array(i);
        for (var l = 0; l < i; l++) {
            rightsizedBuffer[l] = encodedBuffer[l];
        }
        return rightsizedBuffer;
    };
    AgiPicture.getFunctionArgsFromPictureStream = function (stream) {
        var args = [];
        while (true) {
            var arg = stream.readUint8();
            if (arg >= 0xf0)
                break;
            args.push(arg);
        }
        stream.position--;
        return args;
    };
    AgiPicture.decodePictureStream = function (stream) {
        var decodedCommands = [];
        stream.position = 0;
        var processing = true;
        while (processing) {
            var opCode = stream.readUint8();
            if (opCode >= 0xf0) {
                switch (opCode) {
                    case 240: // PicSetColor
                        var picColor = stream.readUint8();
                        decodedCommands.push('PicSetColor(' + picColor + ');');
                        break;
                    case 241: // PicDisable
                        decodedCommands.push('PicDisable();');
                        break;
                    case 242: // PriSetcolor
                        var priColor = stream.readUint8();
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
    AgiPicture.renderPictureCommands = function (commandsToRender) {
        var encodedBuffer = AgiPicture.encodePictureCommands(commandsToRender);
        var agiInterpreter = AgiActiveGame.agiExecute('Get interpreter', 'Agi.interpreter');
        var AgiPic = AgiActiveGame.agiExecute('Get Agi.Pic', 'Agi.Pic');
        var FsByteStream = AgiActiveGame.agiExecute('Get Fs', 'Fs.ByteStream');
        var picNo = agiInterpreter.variables[0];
        agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
        agiInterpreter.agi_draw_pic(0);
        agiInterpreter.agi_show_pic(0);
    };
    AgiPicture.createPictureDrawModeCommand = function (mode) {
        var value = 1 & 0x10 & 0x07;
        return "PicSetPen(".concat(value, ");");
    };
    AgiPicture.createPictureDrawCommand = function (mode, x, y, scale) {
        var newCommand = '';
        if (mode == 'Abs') {
            newCommand = "DrawAbs(".concat(x, ",").concat(y, ",").concat(x + 1, ",").concat(y, ");");
        }
        else if (mode == 'Pen') {
            newCommand = "DrawPen(".concat(x, ",").concat(y, ",").concat(x + scale, ",").concat(y, ",").concat(x, ",").concat(y + scale, ",").concat(x + scale, ",").concat(y + scale, ");");
        }
        else if (mode == 'Fill') {
            newCommand = "DrawFill(".concat(x, ",").concat(y, ");");
        }
        else {
            console.log('unknown tool -> ' + mode);
        }
        return newCommand;
    };
    AgiPicture.createPictureSetColorCommand = function (color) {
        return "PicSetColor(".concat(color, ");");
    };
    AgiPicture.getCurrentPictureCommands = function () {
        try {
            var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
            var currentPictureStream = AgiActiveGame.agiExecute('Get Pic Stream', 'Resources.readAgiResource(Resources.AgiResource.Pic, ' + roomValue + ')');
            var decodedPictureCommands = AgiPicture.decodePictureStream(currentPictureStream);
            return AgiPicture.prettyPrintPictureCommands(decodedPictureCommands);
        }
        catch (err) { }
    };
    AgiPicture.undoPictureCommand = function (commands) {
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
    AgiPicture.appendPictureCommandToTail = function (commands, command) {
        var newCommands = commands.replace('End();', '');
        newCommands = newCommands + "".concat(command, "\nEnd();");
        return newCommands;
    };
    return AgiPicture;
}());

var AgiResource;
(function (AgiResource) {
    AgiResource[AgiResource["Logic"] = 0] = "Logic";
    AgiResource[AgiResource["Pic"] = 1] = "Pic";
    AgiResource[AgiResource["View"] = 2] = "View";
    AgiResource[AgiResource["Sound"] = 3] = "Sound";
})(AgiResource || (AgiResource = {}));
var ByteStream = /** @class */ (function () {
    function ByteStream(buffer, startPosition, end) {
        if (startPosition === void 0) { startPosition = 0; }
        if (end === void 0) { end = 0; }
        this.buffer = buffer;
        this.startPosition = startPosition;
        this.end = end;
        this.position = 0;
        this.length = 0;
        if (end == 0)
            this.end = this.buffer.byteLength;
        this.length = this.end - this.startPosition;
    }
    ByteStream.prototype.readUint8 = function () {
        return this.buffer[this.startPosition + this.position++];
    };
    ByteStream.prototype.readUint16 = function (littleEndian) {
        if (littleEndian === void 0) { littleEndian = true; }
        var b1 = this.buffer[this.startPosition + this.position++];
        var b2 = this.buffer[this.startPosition + this.position++];
        if (littleEndian) {
            return (b2 << 8) + b1;
        }
        return (b1 << 8) + b2;
    };
    ByteStream.prototype.readInt16 = function (littleEndian) {
        if (littleEndian === void 0) { littleEndian = true; }
        var b1 = this.buffer[this.startPosition + this.position++];
        var b2 = this.buffer[this.startPosition + this.position++];
        if (littleEndian) {
            return (((b2 << 8) | b1) << 16) >> 16;
        }
        return (((b1 << 8) | b2) << 16) >> 16;
    };
    return ByteStream;
}());
var AgiResources = /** @class */ (function () {
    function AgiResources() {
        var _this = this;
        this.logdirRecords = [];
        this.picdirRecords = [];
        this.viewdirRecords = [];
        this.snddirRecords = [];
        this.volBuffers = [];
        this.availableVols = [];
        this.AgiResources = function () { };
        this.readAgiResource = function (type, num) {
            var record = null;
            switch (type) {
                case AgiResource.Logic:
                    record = _this.logdirRecords[num];
                    break;
                case AgiResource.Pic:
                    record = _this.picdirRecords[num];
                    break;
                case AgiResource.View:
                    record = _this.viewdirRecords[num];
                    break;
                case AgiResource.Sound:
                    record = _this.snddirRecords[num];
                    break;
                default:
                    throw 'Undefined resource type: ' + type;
            }
            var volstream = new ByteStream(_this.volBuffers[record.volNo].buffer, record.volOffset);
            volstream.readUint16();
            volstream.readUint8();
            var resLength = volstream.readUint16();
            var volPart = new ByteStream(volstream.buffer, record.volOffset + 5, record.volOffset + 5 + resLength);
            return volPart;
        };
        this.downloadAllFiles = function (path, files, done) {
            var buffers = {};
            var leftToDownload = files.length;
            for (var i = 0; i < files.length; i++) {
                handleFile(i);
            }
            function getBinary(url, success) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url + '?crafterSite=agi-crafter', true);
                xhr.responseType = 'arraybuffer';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.response === null) {
                            throw "Fatal error downloading '" + url + "'";
                        }
                        else {
                            console.log("Successfully downloaded '" + url + "'");
                            success(xhr.response);
                        }
                    }
                };
                xhr.send();
            }
            function handleFile(num) {
                getBinary(path + files[num], function (buffer) {
                    buffers[files[num]] = new ByteStream(new Uint8Array(buffer));
                    leftToDownload--;
                    if (leftToDownload === 0) {
                        done(buffers);
                    }
                });
            }
        };
        this.saveLogic = function (siteId, game, roomValue, buffer) {
            //   this.downloadAllFiles(
            //     '/static-assets/games/' + game + '/',
            //     ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
            //     (buffers: IByteStreamDict) => {
            //       console.log('Directory files downloaded.');
            //       this.parseDirfile(buffers['LOGDIR'], this.logdirRecords);
            //       this.parseDirfile(buffers['PICDIR'], this.picdirRecords);
            //       this.parseDirfile(buffers['VIEWDIR'], this.viewdirRecords);
            //       this.parseDirfile(buffers['SNDDIR'], this.snddirRecords);
            //       var volNames: string[] = [];
            //       for (var i = 0; i < this.availableVols.length; i++) {
            //         if (this.availableVols[i] === true) {
            //           volNames.push('VOL.' + i);
            //         }
            //       }
            //       this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
            //         console.log('Resource volumes downloaded.');
            //         for (var j: number = 0; j < volNames.length; j++) {
            //           this.volBuffers[j] = buffers[volNames[j]];
            //         }
            //         let newLogicData = buffer;
            //         newLogicData = AgiResources.addVolumeHeader(newLogicData, 0);
            //         let logicRecord = this.logdirRecords[roomValue];
            //         let nextPicRecord = this.logdirRecords[roomValue + 1]; // assuption: not the room
            //         let logicsStream = this.volBuffers[logicRecord.volNo].buffer;
            //         let lengthOfOldPic = 0;
            //         if (nextPicRecord) {
            //           lengthOfOldPic = nextPicRecord.volOffset - picRecord.volOffset;
            //         }
            //         let newPicSizeDiff = newPicData.length - lengthOfOldPic; //+ 2; // last command + 255 end marker
            //         // now that we know how the new picture relates to the old one we can re-size the stream
            //         // up or down accordingly.
            //         let newStreamLength = picsStream.length + newPicSizeDiff;
            //         let newStream = new Uint8Array(newStreamLength);
            //         for (var n = 0; n < newStream.length; n++) {
            //           if (n < picRecord.volOffset || n > picRecord.volOffset + (newPicData.length - 1)) {
            //             // copy the original buffer to the new buffer
            //             if (n < picRecord.volOffset) {
            //               // before the new resource
            //               newStream[n] = picsStream[n];
            //             } else {
            //               // after our resource, we have to account for 'overlap'
            //               newStream[n] = picsStream[n - newPicSizeDiff];
            //             }
            //           } else {
            //             // copy the new picture into the new stream
            //             newStream[n] = newPicData[n - picRecord.volOffset];
            //           }
            //         }
            //         let newPicDirEncoded = AgiResources.updateDirectoryOffsets(
            //           'P',
            //           this.picdirRecords,
            //           picRecord.volOffset,
            //           newPicSizeDiff
            //         );
            //         let newLogDirEncoded = AgiResources.updateDirectoryOffsets(
            //           'L',
            //           this.logdirRecords,
            //           picRecord.volOffset,
            //           newPicSizeDiff
            //         );
            //         let newViewDirEncoded = AgiResources.updateDirectoryOffsets(
            //           'V',
            //           this.viewdirRecords,
            //           picRecord.volOffset,
            //           newPicSizeDiff
            //         );
            //         let newSndDirEncoded = AgiResources.updateDirectoryOffsets(
            //           'S',
            //           this.snddirRecords,
            //           picRecord.volOffset,
            //           newPicSizeDiff
            //         );
            //         let gamePath = '/static-assets/games/' + game + '/';
            //         AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
            //         AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
            //         AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
            //         AgiResources.saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);
            //         // save updated volume file
            //         AgiResources.saveFile(siteId, gamePath, 'VOL.0', newStream);
            //       });
            //     }
            //   );
        };
        this.savePicture = function (siteId, game, commands) {
            _this.downloadAllFiles('/static-assets/games/' + game + '/', ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'], function (buffers) {
                console.log('Directory files downloaded.');
                _this.parseDirfile(buffers['LOGDIR'], _this.logdirRecords);
                _this.parseDirfile(buffers['PICDIR'], _this.picdirRecords);
                _this.parseDirfile(buffers['VIEWDIR'], _this.viewdirRecords);
                _this.parseDirfile(buffers['SNDDIR'], _this.snddirRecords);
                var volNames = [];
                for (var i = 0; i < _this.availableVols.length; i++) {
                    if (_this.availableVols[i] === true) {
                        volNames.push('VOL.' + i);
                    }
                }
                _this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, function (buffers) {
                    console.log('Resource volumes downloaded.');
                    for (var j = 0; j < volNames.length; j++) {
                        _this.volBuffers[j] = buffers[volNames[j]];
                    }
                    var newPicData = AgiPicture.encodePictureCommands(commands);
                    newPicData = AgiResources.addVolumeHeader(newPicData, 0);
                    var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
                    var picRecord = _this.picdirRecords[roomValue];
                    var nextPicRecord = _this.picdirRecords[roomValue + 1]; // assuption: not the last picture
                    var picsStream = _this.volBuffers[picRecord.volNo].buffer;
                    var lengthOfOldPic = 0;
                    if (nextPicRecord) {
                        lengthOfOldPic = nextPicRecord.volOffset - picRecord.volOffset;
                    }
                    var newPicSizeDiff = newPicData.length - lengthOfOldPic; //+ 2; // last command + 255 end marker
                    // now that we know how the new picture relates to the old one we can re-size the stream
                    // up or down accordingly.
                    var newStreamLength = picsStream.length + newPicSizeDiff;
                    var newStream = new Uint8Array(newStreamLength);
                    for (var n = 0; n < newStream.length; n++) {
                        if (n < picRecord.volOffset || n > picRecord.volOffset + (newPicData.length - 1)) {
                            // copy the original buffer to the new buffer
                            if (n < picRecord.volOffset) {
                                // before the new resource
                                newStream[n] = picsStream[n];
                            }
                            else {
                                // after our resource, we have to account for 'overlap'
                                newStream[n] = picsStream[n - newPicSizeDiff];
                            }
                        }
                        else {
                            // copy the new picture into the new stream
                            newStream[n] = newPicData[n - picRecord.volOffset];
                        }
                    }
                    var newPicDirEncoded = AgiResources.updateDirectoryOffsets('P', _this.picdirRecords, picRecord.volOffset, newPicSizeDiff);
                    var newLogDirEncoded = AgiResources.updateDirectoryOffsets('L', _this.logdirRecords, picRecord.volOffset, newPicSizeDiff);
                    var newViewDirEncoded = AgiResources.updateDirectoryOffsets('V', _this.viewdirRecords, picRecord.volOffset, newPicSizeDiff);
                    var newSndDirEncoded = AgiResources.updateDirectoryOffsets('S', _this.snddirRecords, picRecord.volOffset, newPicSizeDiff);
                    var gamePath = '/static-assets/games/' + game + '/';
                    AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);
                    // save updated volume file
                    AgiResources.saveFile(siteId, gamePath, 'VOL.0', newStream);
                });
            });
        };
        this.saveAsNewPicture = function (siteId, game) {
            _this.downloadAllFiles('/static-assets/games/' + game + '/', ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'], function (buffers) {
                console.log('Directory files downloaded.');
                _this.parseDirfile(buffers['LOGDIR'], _this.logdirRecords);
                _this.parseDirfile(buffers['PICDIR'], _this.picdirRecords);
                _this.parseDirfile(buffers['VIEWDIR'], _this.viewdirRecords);
                _this.parseDirfile(buffers['SNDDIR'], _this.snddirRecords);
                var volNames = [];
                for (var i = 0; i < _this.availableVols.length; i++) {
                    if (_this.availableVols[i] === true) {
                        volNames.push('VOL.' + i);
                    }
                }
                _this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, function (buffers) {
                    console.log('Resource volumes downloaded.');
                    for (var j = 0; j < volNames.length; j++) {
                        _this.volBuffers[j] = buffers[volNames[j]];
                    }
                    var newPicData = new Uint8Array(6);
                    newPicData[0] = 240; // set pic color
                    newPicData[1] = 0; // ard: black
                    newPicData[2] = 0; // draw fill
                    newPicData[3] = 10; // arg: x
                    newPicData[4] = 0; // arg: y
                    newPicData[5] = 255; // end
                    newPicData = AgiResources.addVolumeHeader(newPicData, 0);
                    var volNum = 0;
                    var picsStream = _this.volBuffers[0].buffer;
                    var offset = picsStream.length;
                    var roomValue = _this.picdirRecords.length;
                    var picRecord = (_this.picdirRecords[roomValue] = { volNo: volNum, volOffset: offset });
                    var newStreamLength = picsStream.length + newPicData.length;
                    var newStream = new Uint8Array(newStreamLength);
                    for (var n = 0; n < newStreamLength; n++) {
                        if (n < picsStream.length) {
                            // copy in the existing resources
                            newStream[n] = picsStream[n];
                        }
                        else {
                            // copy in new resource
                            newStream[n] = newPicData[n - picsStream.length];
                        }
                    }
                    var newPicDirEncoded = AgiResources.updateDirectoryOffsets('P', _this.picdirRecords, picRecord.volOffset, 0);
                    // Every room has a logic file. Add logic file
                    var roomLogic = [
                        12,
                        34,
                        0,
                        112,
                        84,
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
                    var volStream = new Uint8Array(newStreamLength + 117);
                    for (var n = 0; n < volStream.length; n++) {
                        if (n < newStream.length) {
                            // copy in the existing resources
                            volStream[n] = newStream[n];
                        }
                        else {
                            // copy in new resource
                            volStream[n] = roomLogic[n - newStream.length];
                        }
                    }
                    var logRecord = (_this.logdirRecords[roomValue] = { volNo: volNum, volOffset: newStream.length });
                    var newLogDirEncoded = AgiResources.updateDirectoryOffsets('L', _this.logdirRecords, logRecord.volOffset, 0);
                    //@ts-ignore
                    var gamePath = '/static-assets/games/' + game + '/';
                    AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
                    // save updated volume file
                    AgiResources.saveFile(siteId, gamePath, 'VOL.0', volStream);
                });
            });
        };
    }
    AgiResources.prototype.parseDirfile = function (buffer, records) {
        var length = buffer.length / 3;
        for (var i = 0; i < length; i++) {
            var val = (buffer.readUint8() << 16) + (buffer.readUint8() << 8) + buffer.readUint8();
            var volNo = val >>> 20;
            var volOffset = val & 0xfffff;
            if (val >>> 16 == 0xff)
                continue;
            records[i] = { volNo: volNo, volOffset: volOffset };
            if (this.availableVols[volNo] === undefined)
                this.availableVols[volNo] = true;
        }
    };
    AgiResources.addVolumeHeader = function (picData, volume) {
        var endMarkerPosition = picData.length; //indexOf(255) + 1
        var sizeOfNewData = endMarkerPosition + 5;
        var dataWithHeader = new Uint8Array(sizeOfNewData);
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
    AgiResources.updateDirectoryOffsets = function (dirname, dirRecords, startOffset, adjustBy) {
        // now modify the directory
        var position = 0;
        var recordCount = dirRecords.length;
        var newDirEncoded = new Uint8Array(recordCount * 3);
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
    AgiResources.saveFile = function (siteId, path, filename, data) {
        var API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';
        var serviceUrl = API_WRITE_CONTENT +
            "?site=".concat(siteId, "&path=").concat(path, "&contentType=folder&createFolders=true&draft=false&duplicate=false&unlock=true");
        var body = new FormData();
        body.append('site', siteId);
        body.append('relativePath', 'null');
        body.append('validating', 'false');
        body.append('path', path);
        body.append('name', filename);
        body.append('type', 'application/octet-stream');
        body.append('allowed', 'true');
        body.append('file', new Blob([data]), filename);
        post(serviceUrl, body).subscribe({
            next: function (response) {
                // alert('File Saved: ' + filename);
            },
            error: function (e) {
                alert('File Failed :' + filename);
            }
        });
    };
    return AgiResources;
}());

function EditPictureDialog(props) {
    var siteId = useActiveSiteId();
    var _a = React.useState(''), commands = _a[0], setCommands = _a[1];
    var _b = useState(false), mouseTrapped = _b[0], setMouseTrapped = _b[1];
    var _c = useState(10), scaleFactor = _c[0]; _c[1];
    var _d = useState('Abs'), drawMode = _d[0], setDrawMode = _d[1];
    useEffect(function () {
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
            var previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
            var canvas = previewDocument.getElementById('canvas');
            canvas.addEventListener('click', handleMouseClick);
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mouseup', handleMouseUp);
            canvas.addEventListener('mousemove', handleMouseMove);
            setMouseTrapped(true);
        }
        var currentPictureCommands = AgiPicture.getCurrentPictureCommands();
        setCommands(currentPictureCommands);
        //@ts-ignore
        window.agistudioPicCommands = currentPictureCommands;
    }, []);
    var appendCommandAndRender = function (command) {
        //@ts-ignore
        if (command != window.agistudioLastCommand) {
            //@ts-ignore
            window.agistudioLastCommand = command;
            //@ts-ignore
            var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
            var newCommands = AgiPicture.appendPictureCommandToTail(existingCommands, command);
            var newCommands = existingCommands.replace('End();', '');
            newCommands = newCommands + "".concat(command, "\nEnd();");
            setCommands(newCommands);
            //@ts-ignore
            window.agistudioPicCommands = newCommands;
            AgiPicture.renderPictureCommands(newCommands);
        }
    };
    var mouseDraw = function (clientX, clientY) {
        // something is wrong with getting commands from inside this event :-/
        //@ts-ignore
        var previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
        var canvas = previewDocument.getElementById('canvas');
        var rect = canvas.getBoundingClientRect();
        // the bit map is 160 x 200 so we need to scale the mouse input
        var ratioOfX = clientX / rect.width;
        var ratioOfY = clientY / rect.height;
        var x = Math.round(160 * ratioOfX);
        var y = Math.round(200 * ratioOfY);
        var scale = scaleFactor;
        //@ts-ignore
        var existingDrawMode = window.agistudioDrawMode ? window.agistudioDrawMode : drawMode;
        var newCommand = AgiPicture.createPictureDrawCommand(existingDrawMode, x, y, scale);
        appendCommandAndRender(newCommand);
    };
    var handleUndoCommand = function () {
        //@ts-ignore
        var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
        var newCommands = AgiPicture.undoPictureCommand(existingCommands);
        //@ts-ignore
        window.agistudioPicCommands = newCommands;
        setCommands(newCommands);
        AgiPicture.renderPictureCommands(newCommands);
    };
    var handleSwitchBuffer = function () {
        AgiActiveGame.switchPictureBuffer();
    };
    var handleDrawModeUpdate = function (mode) {
        setDrawMode(mode);
        //@ts-ignore
        window.agistudioDrawMode = mode;
        var newCommand = AgiPicture.createPictureDrawModeCommand(mode);
        appendCommandAndRender(newCommand);
    };
    var handleCommandUpdate = function (event) {
        var updatedCommands = event.target.value;
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
    var handleSetColor = function (color) {
        var newCommand = AgiPicture.createPictureSetColorCommand(color);
        appendCommandAndRender(newCommand);
    };
    var handleSaveAsNewPicture = function () {
        var game = AgiActiveGame.getActiveGameId();
        var agiResources = new AgiResources();
        agiResources.saveAsNewPicture(siteId, game);
        alert('New Picture Add Complete'); // do better
        // AgiActiveGame.reload(); need to add a promise so this waits until the save is done
    };
    var handleSavePicture = function () {
        var game = AgiActiveGame.getActiveGameId();
        var agiResources = new AgiResources();
        agiResources.savePicture(siteId, game, commands);
        alert('Save Complete'); // do better
        // AgiActiveGame.reload(); need to add a promise so this waits until the save is done
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: handleSaveAsNewPicture, variant: "outlined", sx: { mr: 1 } }, "Add New Picture"),
            React.createElement(Button, { onClick: handleSwitchBuffer, variant: "outlined", sx: { mr: 1 } }, "Switch Buffer")),
        React.createElement(DialogContent, null,
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(Button, { onClick: function () {
                        handleUndoCommand();
                    } }, "Undo")),
            React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 3, value: commands }),
            React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 1, onChange: handleCommandUpdate }),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(TextField, { id: "outlined-textarea", value: scaleFactor }),
                React.createElement(TextField, { id: "outlined-textarea", value: drawMode })),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, null, "Picture Mode"),
                    React.createElement(Button, null, "Priorty Mode"))),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Rel');
                        } }, "Draw Relative"),
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Abs');
                        } }, "Draw Absolute"),
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Pen');
                        } }, "Draw Pen"),
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Fill');
                        } }, "Draw Fill"))),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(0);
                        }, sx: { height: '35px', 'background-color': 'black' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(1);
                        }, sx: { height: '35px', 'background-color': 'blue' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(2);
                        }, sx: { height: '35px', 'background-color': 'green' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(3);
                        }, sx: { height: '35px', 'background-color': 'Teal' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(4);
                        }, sx: { height: '35px', 'background-color': 'red' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(5);
                        }, sx: { height: '35px', 'background-color': 'purple' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(6);
                        }, sx: { height: '35px', 'background-color': 'brown' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(7);
                        }, sx: { height: '35px', 'background-color': 'lightgray' } })),
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(8);
                        }, sx: { height: '35px', 'background-color': 'gray' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(9);
                        }, sx: { height: '35px', 'background-color': 'RoyalBlue' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(10);
                        }, sx: { height: '35px', 'background-color': 'lightgreen' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(11);
                        }, sx: { height: '35px', 'background-color': 'Aqua' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(12);
                        }, sx: { height: '35px', 'background-color': 'Salmon' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(13);
                        }, sx: { height: '35px', 'background-color': 'magenta' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(14);
                        }, sx: { height: '35px', 'background-color': 'yellow', color: 'black' } }),
                    React.createElement(Button, { onClick: function () {
                            handleSetColor(15);
                        }, sx: { height: '35px', 'background-color': 'white', color: 'black' } }))),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(Button, { onClick: handleSavePicture, variant: "outlined", sx: { mr: 1 } }, "Save Picture")))));
}

function OpenPicDialogButton(props) {
    useDispatch();
    var _a = React.useState(false), drawerOpen = _a[0], setDrawerOpen = _a[1];
    var handleClick = function () {
        var drawerState = drawerOpen ? false : true;
        setDrawerOpen(drawerState);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(SwipeableDrawer, { anchor: 'left', variant: "persistent", ModalProps: {
                keepMounted: false
            }, open: drawerOpen, onClose: function (event) { }, onOpen: function (event) { } }, drawerOpen ? (React.createElement(EditPictureDialog, { props: true })) : ""),
        React.createElement(Tooltip, { title: 'Edit Current Room Picture' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": drawerOpen ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": drawerOpen ? 'true' : undefined, onClick: handleClick },
                React.createElement(ImageAspectRatioRoundedIcon, null)))));
}

function EditViewDialog(props) {
    useActiveSiteId();
    var _a = React.useState(null), viewData = _a[0], setViewData = _a[1];
    var _b = React.useState([]), rows = _b[0], setRows = _b[1];
    var _c = React.useState(0), currentLoop = _c[0], setCurrentLoop = _c[1];
    var _d = React.useState(0), currentCell = _d[0], setCurrentCell = _d[1];
    var _e = React.useState(0), cellCount = _e[0], setCellCount = _e[1];
    var _f = React.useState([]), loops = _f[0], setLoops = _f[1];
    var _g = React.useState([]), availableViews = _g[0], setAvailableViews = _g[1];
    var getViewFilesForGame = function () {
        var serviceUrl = 'http://localhost:8080/api/1/site/content_store/children.json?url=/static-assets/games/test/agi-studio-let-them-eat-cake/src/view';
        get(serviceUrl).subscribe({
            next: function (response) {
                //@ts-ignore
                var views = [];
                //@ts-ignore
                (response.response).forEach(function (item) {
                    views.push({ name: item.name, url: item.url });
                });
                setAvailableViews(views);
            },
            error: function (e) {
            }
        });
    };
    var getViewFileForGame = function (url) {
        var serviceUrl = url;
        get(serviceUrl).subscribe({
            next: function (response) {
                setViewData(response.response);
                // populate loop descriptions
                var loops = Array(response.response.numLoops);
                for (var l = 0; l < response.response.numLoops; l++) {
                    loops[l] = { id: l, description: 'Loop ' + l };
                }
                setLoops(loops);
                renderCell();
            },
            error: function (e) {
            }
        });
    };
    var handleViewDataUpdate = function (event) {
        var viewDataAsJson = event.target.value;
        setViewData(JSON.parse(viewDataAsJson));
        // populate loop descriptions
        var loops = Array(viewData.numLoops);
        for (var l = 0; l < viewData.numLoops; l++) {
            loops[l] = { id: l, description: 'Loop ' + l };
        }
        setLoops(loops);
        renderCell();
    };
    var renderCell = function () {
        if (viewData &&
            viewData.loops &&
            viewData.loops[currentLoop] &&
            viewData.loops[currentLoop].cels &&
            viewData.loops[currentLoop].cels[currentCell] &&
            viewData.loops[currentLoop].cels[currentCell].pixelData) {
            // transform pixel data for cel into 16 color bitmap
            var cel_1 = viewData.loops[currentLoop].cels[currentCell];
            var pixelData = cel_1.pixelData;
            (cel_1.celMirrorTrans & 0x80) == 0x80;
            (cel_1.celMirrorTrans >>> 4) & 7;
            var celTransparentColor = cel_1.celMirrorTrans & 0x0f;
            // initialize the bitmap with trasparent color
            var bitmap_1 = Array(cel_1.celHeight)
                //@ts-ignore
                .fill()
                .map(function () { return Array(cel_1.celWidth).fill(celTransparentColor); });
            var row_1 = 0;
            var col_1 = 0;
            pixelData.forEach(function (chunkData) {
                if (chunkData == 0) {
                    row_1++;
                    col_1 = 0;
                }
                else {
                    var color = chunkData >>> 4;
                    var numPixels = chunkData & 0x0f;
                    for (var k = 0; k < numPixels; k++) {
                        bitmap_1[row_1][col_1++] = color;
                    }
                }
                setRows(bitmap_1);
            });
        }
    };
    var htmlColor = function (colorNo) {
        var colors = [
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
        var colorName = colors[colorNo];
        return colorName;
    };
    function handleViewChange(event, child) {
        getViewFileForGame(event.target.value);
    }
    function handleLoopChange(event, child) {
        setCurrentLoop(Number(event.target.value));
        setCurrentCell(0);
        setCellCount(viewData.loops[currentLoop].cels.length);
    }
    var handleCelChange = function (event, newValue) {
        var celNo = Number(newValue);
        setCurrentCell(celNo);
        renderCell();
    };
    useEffect(function () {
        getViewFilesForGame();
        renderCell();
    }, [cellCount, currentCell, currentLoop]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogActions, null),
        React.createElement(DialogContent, null,
            React.createElement(Paper, { elevation: 1, sx: { width: '1000px', padding: '1px' } },
                React.createElement(Table, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, null,
                            React.createElement(FormControl, { fullWidth: true },
                                React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Select a View"),
                                React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", label: "View", onChange: handleViewChange }, availableViews === null || availableViews === void 0 ? void 0 : availableViews.map(function (view) { return (React.createElement(MenuItem$1, { value: view.url }, view.name)); }))),
                            React.createElement("p", null,
                                "Loops: ",
                                viewData ? viewData.numLoops : 0),
                            React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 3, value: JSON.stringify(viewData) }),
                            React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 1, onChange: handleViewDataUpdate }),
                            React.createElement(FormControl, { fullWidth: true },
                                React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Current Loop"),
                                React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: currentLoop, label: "Loop", onChange: handleLoopChange }, loops === null || loops === void 0 ? void 0 : loops.map(function (loop) { return (React.createElement(MenuItem$1, { value: loop.id }, loop.description)); }))),
                            React.createElement(Slider, { defaultValue: 0, step: 1, min: 0, marks: true, max: cellCount, onChange: handleCelChange, "aria-label": "Default", valueLabelDisplay: "auto" }),
                            React.createElement(ButtonGroup, { sx: { width: '355px' }, variant: "contained", "aria-label": "outlined primary button group" },
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'black' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'blue' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'green' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'Teal' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'red' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'purple' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'brown' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'lightgray' } })),
                            React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'gray' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'RoyalBlue' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'lightgreen' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'Aqua' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'Salmon' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'magenta' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'yellow', color: 'black' } }),
                                React.createElement(Button, { onClick: function () {
                                    }, sx: { height: '35px', 'background-color': 'white', color: 'black' } }))),
                        React.createElement(TableCell, null,
                            React.createElement(Table, { "aria-label": "simple table" },
                                React.createElement(TableBody, null, rows.map(function (row) { return (React.createElement(TableRow, null, row.map(function (value) { return (React.createElement(TableCell, { component: "th", scope: "row", style: { width: '10px', height: '10px', backgroundColor: htmlColor(value) } })); }))); }))))))))));
}

function OpenViewDialogButton(props) {
    useDispatch();
    var _a = React.useState(false), drawerOpen = _a[0], setDrawerOpen = _a[1];
    var handleClick = function () {
        var drawerState = drawerOpen ? false : true;
        setDrawerOpen(drawerState);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(SwipeableDrawer, { anchor: 'left', variant: "persistent", ModalProps: {
                keepMounted: false
            }, open: drawerOpen, onClose: function (event) { }, onOpen: function (event) { } }, drawerOpen ? (React.createElement(EditViewDialog, { props: true })) : ""),
        React.createElement(Tooltip, { title: 'Open View Editor' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": drawerOpen ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": drawerOpen ? 'true' : undefined, onClick: handleClick },
                React.createElement(TheatersRoundedIcon, null)))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.agistudio',
    widgets: {
        'org.rd.plugin.agistudio.RoomSelector': RoomSelector,
        'org.rd.plugin.agistudio.AllowInput': AllowInput,
        'org.rd.plugin.agistudio.SoundSelector': SoundSelector,
        'org.rd.plugin.agistudio.SetEgoPosition': SetEgoPosition,
        'org.rd.plugin.agistudio.ShowPriorityBuffer': ShowPriorityBuffer,
        'org.rd.plugin.agistudio.ShowWords': ShowWords,
        'org.rd.plugin.agistudio.ShowCode': ShowCode,
        'org.rd.plugin.agistudio.CurrentRoom': CurrentRoom,
        'org.rd.plugin.agistudio.AddGame': AddGame,
        'org.rd.plugin.agistudio.EditPictureDialog': EditPictureDialog,
        'org.rd.plugin.agistudio.EditViewDialog': EditViewDialog,
        'org.rd.plugin.agistudio.OpenPicDialogButton': OpenPicDialogButton,
        'org.rd.plugin.agistudio.OpenViewDialogButton': OpenViewDialogButton
    }
};

export { AddGame, AllowInput, CurrentRoom, EditPictureDialog, EditViewDialog, OpenPicDialogButton, OpenViewDialogButton, RoomSelector, SetEgoPosition, ShowCode, ShowWords, SoundSelector, plugin as default };
