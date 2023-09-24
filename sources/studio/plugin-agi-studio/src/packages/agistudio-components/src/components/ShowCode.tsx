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
  const [logics, setLogics] = React.useState([]);

  const testFunctions = [
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
  const statementFunctions = [
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

  const prettyPrintCode = (lines: any) => {
    var code = '';
    lines.forEach(function (line) {
      if (line == '{') {
        code += ' ';
      } else {
        code += '\n';
      }

      code += line;
    });

    return code;
  };

  const decompile = (logic: any) => {
    var lines = [];
    if (logic) {
      let codeData = AgiBridge.agiExecute(
        'Get Binary',
        'Resources.readAgiResource(Resources.AgiResource.Logic, ' + logic.no + ')'
      );

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

  const decompileScope = (binary: any, messages: any, scope: any, lines: any, depth: number) => {
    scope.body.forEach(function (node: any) {
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

  const decompileExpression = (expression: any) => {
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
    } else {
      var funcName = testFunctions[opCode];
      line = (negate ? '!' : '') + funcName + '(';

      if (args) {
        var testVars = processArgNames(funcName, true, args, []);

        for (var a = 0; a < testVars.length; a++) {
          var arg = testVars[a];
          if (a > 0) line += ', ';
          line += arg;
        }
      }
      line += ')';
    }

    return line;
  };

  const processArgNames = (funcName, isTest, args, messages) => {
    var values = [];

    for (var i = 0; i < args.length; i++) {
      var value = args[i];

      if (i == 0) {
        if (isTest == true) {
          if (funcName.startsWith('isset')) value = 'f' + value;
          else value = 'v' + value;
        } else {
          if (funcName === 'print') value = '"' + messages[parseInt(value)] + '"';
          else if (funcName.startsWith('set_menu')) value = '"' + messages[parseInt(value)] + '"';
          else if (funcName.startsWith('set')) value = 'f' + value;
          else if (funcName.startsWith('assign')) value = 'v' + value;
        }
      } else {
        if (!isTest) {
          if (!funcName.startsWith('assign')) {
            if (funcName.endsWith('v')) value = 'v' + value;
            else if (funcName == 'set_menu_member') value = 'c' + value;
          }
        }
      }

      values.push(value);
    }

    return values;
  };

  const decompileNode = (binary: any, messages: any, node: any) => {
    var line = '';
    var opCode = node.opcode;

    var byteOffset = node.byteOffset; // ast node
    var statement = node.statement; // statement
    var args = node.args; // test and statement
    var expression = node.expression; // if

    if (opCode == 0x00) {
      line = 'return;';
    } else if (opCode == 0xff) {
      line = 'if(';
      line += decompileExpression(expression);
      line += ')';
    } else if (opCode == 0xfe) {
      if (node.expression) {
        line = 'else (';
        line += decompileExpression(expression);
        line += ')';
      } else {
        line += 'goto';
      }
    } else if (opCode == 0x0e) {
      line = 'said';
    } else {
      var funcName = statementFunctions[opCode];
      line += funcName;

      line += '(';
      if (args) {
        line += args;
      } else {
        var statementArgs = [];
        for (var i = 0; i < statement.length; i++) {
          statementArgs.push(getValueAtOffset(binary, byteOffset - statement.length + i));
        }

        var statementArgsx = processArgNames(funcName, false, statementArgs, messages);

        for (var a = 0; a < statementArgsx.length; a++) {
          var arg = statementArgsx[a];
          if (a > 0) line += ', ';
          line += arg;
        }
      }

      line += ');';
    }

    return line;
  };

  const getValueAtOffset = (binary: any, offset: number) => {
    binary.position = offset;
    return binary.readUint8();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    let code = AgiBridge.agiExecute('Get Logic Array', 'Agi.interpreter.loadedLogics');
    setLogics(code);
    setDialogOpen(true);
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
        <DialogContent>
          {logics
            ?.filter((v) => v !== null)
            .map((logic, i) => (
              <>
                <h1>Logic Resource #{logic?.no}</h1>
                <TextField
                  id="outlined-textarea"
                  sx={{ width: '100%' }}
                  multiline
                  rows={20}
                  defaultValue={prettyPrintCode(decompile(logic))}
                />
              </>
            ))}
        </DialogContent>
      </Dialog>

      <Tooltip title={'Show Code'}>
        <IconButton
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
