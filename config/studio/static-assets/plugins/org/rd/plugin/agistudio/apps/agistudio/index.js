const React = craftercms.libs.React;
const { useState, useEffect } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, Badge, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const DirectionsRunRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded');
const AccountTreeRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded');
const MenuList = craftercms.libs.MaterialUI.MenuList && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuList, 'default') ? craftercms.libs.MaterialUI.MenuList['default'] : craftercms.libs.MaterialUI.MenuList;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const AudiotrackRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded');
const ControlCameraRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded');
const CopyAllRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded');
const DataObjectRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded');
const SpeakerNotesRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded');
const ImageAspectRatioRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded');
const RoomRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded');
const AddRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AddRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AddRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AddRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AddRounded');
const { createAction } = craftercms.libs.ReduxToolkit;
const { createCustomDocumentEventListener } = craftercms.utils.dom;
const { post } = craftercms.utils.ajax;

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

var AgiBridge = /** @class */ (function () {
    function AgiBridge() {
    }
    AgiBridge.agiExecute = function (intent, command) {
        var frameElPath = "document.getElementById('crafterCMSPreviewIframe')";
        var previewFrameEl = eval(frameElPath);
        if (previewFrameEl) {
            var agiPath = frameElPath + '.contentWindow.Agi';
            var resourcesPath = frameElPath + '.contentWindow.Resources';
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
    return AgiBridge;
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
        AgiBridge.agiExecute('Enable Input', 'Agi.interpreter.agi_accept_input()');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Allow Input' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(DirectionsRunRoundedIcon, null)))));
}

function RoomSelector(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; var setInternalUrl = _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(0), roomCount = _e[0], setRoomCount = _e[1];
    var _f = useState(), rooms = _f[0], setRooms = _f[1];
    var loadRoomData = function () {
        var rooms = [];
        var Resources = AgiBridge.agiExecute('Get Resources', 'Resources');
        for (var i = 0; i < 1000; i++) {
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
        loadRoomData();
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        console.log('Game changed, reload rooms');
        loadRoomData();
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClickNewRoom = function (room) {
        AgiBridge.agiExecute('New Room', 'Agi.interpreter.newroom = ' + room);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Room Selector' },
            React.createElement(Badge, { badgeContent: roomCount > 0 ? roomCount : null, color: "primary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
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
        var Resources = AgiBridge.agiExecute('Get Resources', 'Resources');
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
        console.log('Game changed, reload sound');
        currentUrlPath && setInternalUrl(currentUrlPath);
        loadSoundData();
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClickPlaySound = function (sound) {
        AgiBridge.agiExecute('Play Sound', 'Agi.interpreter.agi_sound(' + sound + ',1)');
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Sound Selector' },
            React.createElement(Badge, { badgeContent: soundCount > 0 ? soundCount : null, color: "secondary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
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
            AgiBridge.agiExecute('Set Ego X Coordinate', 'Agi.interpreter.gameObjects[0].x=' + x);
            AgiBridge.agiExecute('Set Ego Y Coordinate', 'Agi.interpreter.gameObjects[0].y=' + y);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Set Ego Position' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(ControlCameraRoundedIcon, null)))));
}

function ShowPriorityBuffer(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiBridge.agiExecute('Get buffer mode', 'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1');
        AgiBridge.agiExecute('Keep Orig Visual Buffer', 'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb');
        AgiBridge.agiExecute('Set Visual Buffer', 'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb');
        AgiBridge.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Show Priority Buffer' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(CopyAllRoundedIcon, null)))));
}

function ShowCode(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState([]), logics = _c[0], setLogics = _c[1];
    var _d = React.useState([]); _d[0]; _d[1];
    var testFunctions = [
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
    var statementFunctions = [
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
        'display_v',
        'clear_lines',
        'text_screen',
        'graphics',
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
    var prettyPrintCode = function (lines) {
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
    var decompile = function (logic) {
        var lines = [];
        if (logic) {
            var codeData = AgiBridge.agiExecute('Get Binary', 'Resources.readAgiResource(Resources.AgiResource.Logic, ' + logic.no + ')');
            var program = logic.decompile();
            decompileScope(codeData, logic.logic.messages, program, lines, 0);
            var m = 1;
            logic.logic.messages.forEach(function (msg) {
                lines.push('#message ' + m + ' "' + msg + '"');
                m++;
            });
        }
        return lines;
    };
    var decompileScope = function (binary, messages, scope, lines, depth) {
        scope.body.forEach(function (node) {
            lines.push('\t'.repeat(depth) + decompileNode(binary, messages, node));
            if (node.then) {
                lines.push('{');
                decompileScope(binary, messages, node.then, lines, depth + 1);
                lines.push('\t'.repeat(depth) + '}');
            }
            if (node.else) {
                lines.push('\t'.repeat(depth) + 'else {');
                decompileScope(binary, messages, node.else, lines, depth + 1);
                lines.push('\t'.repeat(depth) + '}');
            }
        });
        return lines;
    };
    var decompileExpression = function (expression) {
        var line = '';
        var opCode = expression.opcode;
        var args = expression.args;
        var negate = expression.negate;
        var right = expression.right;
        var left = expression.left;
        //} else if (opCode == 0xfd) { //line += '!';
        if (left && right) {
            line += decompileExpression(left);
            line += left.constructor.name == 'AndNode' ? ' && ' : ' || ';
            line += decompileExpression(right);
        }
        else {
            var funcName = testFunctions[opCode];
            line = (negate ? '!' : '') + funcName + '(';
            if (args) {
                var testVars = processArgNames(funcName, true, args, []);
                for (var a = 0; a < testVars.length; a++) {
                    var arg = testVars[a];
                    if (a > 0)
                        line += ', ';
                    line += arg;
                }
            }
            line += ')';
        }
        return line;
    };
    var processArgNames = function (funcName, isTest, args, messages) {
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
                        value = '"' + messages[parseInt(value)] + '"';
                    else if (funcName.startsWith('set_menu'))
                        value = '"' + messages[parseInt(value)] + '"';
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
    var decompileNode = function (binary, messages, node) {
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
            line += decompileExpression(expression);
            line += ')';
        }
        else if (opCode == 0xfe) {
            if (node.expression) {
                line = 'else (';
                line += decompileExpression(expression);
                line += ')';
            }
            else {
                line += 'goto';
            }
        }
        else if (opCode == 0x0e) {
            line = 'said';
        }
        else {
            var funcName = statementFunctions[opCode];
            line += funcName;
            line += '(';
            if (args) {
                line += args;
            }
            else {
                var statementArgs = [];
                for (var i = 0; i < statement.length; i++) {
                    statementArgs.push(getValueAtOffset(binary, byteOffset - statement.length + i));
                }
                var statementArgsx = processArgNames(funcName, false, statementArgs, messages);
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
    var getValueAtOffset = function (binary, offset) {
        binary.position = offset;
        return binary.readUint8();
    };
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var code = AgiBridge.agiExecute('Get Logic Array', 'Agi.interpreter.loadedLogics');
        setLogics(code);
        setDialogOpen(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Logic Listing"),
            React.createElement(DialogContent, null, logics === null || logics === void 0 ? void 0 : logics.filter(function (v) { return v !== null; }).map(function (logic, i) { return (React.createElement(React.Fragment, null,
                React.createElement("h1", null,
                    "Logic Resource #", logic === null || logic === void 0 ? void 0 :
                    logic.no),
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 20, defaultValue: prettyPrintCode(decompile(logic)) }))); }))),
        React.createElement(Tooltip, { title: 'Show Code' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(DataObjectRoundedIcon, null)))));
}

function ShowWords(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState([]), words = _c[0], setWords = _c[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var words = AgiBridge.agiExecute('Get Words', 'Resources.words');
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
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(SpeakerNotesRoundedIcon, null)))));
}

function ShowPicture(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState(''), commands = _c[0], setCommands = _c[1];
    var prettyPrintCommands = function (commands) {
        var code = '';
        commands.forEach(function (command) {
            code += command + '\n';
        });
        return code;
    };
    var encodeCommands = function () {
        var encodedBuffer = new Uint8Array(1000);
        var parsedCommands = commands.replaceAll('\n', '').split(';');
        var i = 0;
        parsedCommands.forEach(function (command) {
            var commandName = command.substring(0, command.indexOf('('));
            var args = command.replace(commandName, '').replace('(', '').replace(')', '').split(',');
            var opCode = 0; // End
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
            //      console.log('decoding ' + i + ' :' + commandName + ' => ' + opCode);
            encodedBuffer[i] = opCode;
            i++;
            for (var a = 0; a < args.length; a++) {
                var value = args[a];
                encodedBuffer[i] = parseInt(value);
                i++;
            }
        });
        var rightsizedBuffer = new Uint8Array(i);
        for (var l = 0; l < i; l++) {
            rightsizedBuffer[l] = encodedBuffer[l];
        }
        return rightsizedBuffer;
    };
    var decodePictureStream = function (stream) {
        var decodedCommands = [];
        stream.position = 0;
        //this.visible = visualBuffer;
        //this.priority = priorityBuffer;
        var processing = true;
        while (processing) {
            var opCode = stream.readUint8();
            if (opCode >= 0xf0) {
                switch (opCode) {
                    case 240: // PicSetColor
                        var picColor = stream.readUint8();
                        decodedCommands.push('PicSetColor(' + picColor + ');');
                        break;
                    case 241: // PicOpcode.PicDisable
                        decodedCommands.push('PicDisable();');
                        break;
                    case 242: // PriSetcolor
                        var priColor = stream.readUint8();
                        decodedCommands.push('PriSetColor(' + priColor + ');');
                        break;
                    case 243: // PriDisable
                        decodedCommands.push('PriDisable();');
                        break;
                    case 244: // DrawYCorner
                        var x1 = stream.readUint8();
                        var y1 = stream.readUint8();
                        var x2 = -1;
                        var y2 = -1;
                        // while (true) {
                        //   y2 = stream.readUint8();
                        //   if (y2 >= 0xf0) break;
                        //   y1 = y2;
                        //   x2 = stream.readUint8();
                        //   if (x2 >= 0xf0) break;
                        //   x1 = x2;
                        // }
                        //stream.position--;
                        decodedCommands.push('DrawYCorner(' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ');');
                        break;
                    case 245: // DrawXCorner
                        var x1 = stream.readUint8();
                        var y1 = stream.readUint8();
                        var x2 = -1;
                        var y2 = -1;
                        // while (true) {
                        //   x2 = stream.readUint8();
                        //   if (x2 >= 0xf0) break;
                        //   x1 = x2;
                        //   y2 = stream.readUint8();
                        //   if (y2 >= 0xf0) break;
                        //   y1 = y2;
                        // }
                        //stream.position--;
                        decodedCommands.push('DrawXCorner(' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ');');
                        break;
                    case 246: // DrawAbs
                        var x1 = stream.readUint8();
                        var y1 = stream.readUint8();
                        // while (true) {
                        //   var nextX = stream.readUint8();
                        //   if (nextX >= 0xf0) break;
                        //   var nextY = stream.readUint8();
                        //   x1 = nextX;
                        //   y1 = nextY;
                        // }
                        //this.stream.position--;
                        decodedCommands.push('DrawAbs(' + x1 + ',' + y1 + ');');
                        break;
                    case 247: // DrawRel
                        var x1 = stream.readUint8();
                        var y1 = stream.readUint8();
                        // while (true) {
                        //   var val = stream.readUint8();
                        //   if (val >= 0xf0) break;
                        //   var xDisp = (val >>> 4) & 0x07;
                        //   if ((val & 0x80) === 0x80) xDisp = -xDisp;
                        //   var yDisp = val & 0x07;
                        //   if ((val & 8) == 8) yDisp = -yDisp;
                        //   var nextX = x1 + xDisp;
                        //   var nextY = y1 + yDisp;
                        //   x1 = nextX;
                        //   y1 = nextY;
                        // }
                        //this.stream.position--;
                        decodedCommands.push('DrawRel(' + x1 + ',' + y1 + ');');
                        break;
                    case 248: // DrawFill
                        var x1, y1;
                        // while (true) {
                        //   x1 = stream.readUint8();
                        //   if (x1 >= 0xf0) break;
                        //   var y1 = stream.readUint8();
                        // }
                        //this.stream.position--;
                        decodedCommands.push('DrawFill(' + x1 + ',' + y1 + ');');
                        break;
                    case 249: // SetPen
                        var value = stream.readUint8();
                        decodedCommands.push('SetPen(' + value + ');');
                        break;
                    case 250: // DrawPen
                        var firstArg;
                        firstArg = stream.readUint8();
                        // while (true) {
                        //   firstArg = stream.readUint8();
                        //   if (firstArg >= 0xf0) break;
                        //   // if (false) {
                        //   //   //this.penSplatter) {
                        //   //   var x = stream.readUint8();
                        //   //   var y = stream.readUint8();
                        //   // } else {
                        //   //   var x = firstArg;
                        //   //   var y = stream.readUint8();
                        //   //   // if (this.penSize == 0) {
                        //   //   //     this.setPixel(x, y);
                        //   //   // }
                        //   //   // else if (this.penRectangle) {
                        //   //   //     this.drawPenRect(x, y);
                        //   //   // }
                        //   //   // else {
                        //   //   //     this.drawPenCircle(x, y);
                        //   //   // }
                        //   // }
                        // }
                        // this.stream.position--;
                        decodedCommands.push('DrawPen(' + firstArg + ');');
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
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
        var currentPictureStream = AgiBridge.agiExecute('Get Pic Stream', 'Resources.readAgiResource(Resources.AgiResource.Pic, ' + roomValue + ')');
        var decodedPictureCommands = decodePictureStream(currentPictureStream);
        setCommands(prettyPrintCommands(decodedPictureCommands));
        setDialogOpen(true);
    };
    var renderClick = function (event) {
        var encodedBuffer = encodeCommands();
        var agiInterpreter = AgiBridge.agiExecute('Get interpreter', 'Agi.interpreter');
        var Resources = AgiBridge.agiExecute('Get Resources.Pic', 'Resources');
        var picNo = agiInterpreter.variables[0];
        agiInterpreter.loadedPics[picNo] = new Resources.Pic(encodedBuffer);
    };
    var handleCommandUpdate = function (event) {
        var updatedCommands = event.target.value;
        console.log('Updated :' + updatedCommands);
        setCommands(updatedCommands);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Show Picture"),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: renderClick, variant: "outlined", sx: { mr: 1 } }, "Render")),
            React.createElement(DialogContent, null,
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 20, defaultValue: commands, onChange: handleCommandUpdate }))),
        React.createElement(Tooltip, { title: 'Show Picture' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(ImageAspectRatioRoundedIcon, null)))));
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
        var roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
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
        AgiBridge.agiExecute('Reload Current Room', 'Agi.interpreter.newroom = currentRoom');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Reload Current Room' },
            React.createElement(Badge, { badgeContent: currentRoom != -1 ? currentRoom : null, color: "success", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(RoomRoundedIcon, null))))));
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
        'org.rd.plugin.agistudio.ShowPicture': ShowPicture,
        'org.rd.plugin.agistudio.CurrentRoom': CurrentRoom,
        'org.rd.plugin.agistudio.AddGame': AddGame
    }
};

export { AddGame, AllowInput, CurrentRoom, RoomSelector, SetEgoPosition, ShowCode, ShowPicture, ShowWords, SoundSelector, plugin as default };
