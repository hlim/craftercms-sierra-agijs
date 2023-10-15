import AgiActiveGame from './AgiActiveGame';

export class AgiLogic {
  static testFunctions = [
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

  static statementFunctions = [
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

  static prettyPrintCode = (lines: any) => {
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

  static newLogicFromBuffer = (buffer: any) => {
    let Agi = AgiActiveGame.agiExecute('Get Agi', 'Agi');

    // load room 1 logic and manipulate it into a "new" logic
    let logic = new Agi.LogicParser(Agi.interpreter, 1);

    let Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
    let bStreamBuffer = new Fs.ByteStream(buffer, 0);
    logic.logic.data = buffer; //bStreamBuffer

    logic.messages = [];
    logic.logic.messages = [];
    logic.messagesStartOffset = buffer.buffer[1];
    logic.logic.data.position = 0;

    // create the message array
    var numMessages = buffer.buffer[logic.messagesStartOffset];
    var ptrMessagesEnd = buffer.buffer[logic.messagesStartOffset + 1];
    var decryptionIndex = 0;
    for (var i = 0; i < numMessages; i++) {
      var msgPtr = buffer.buffer[logic.messagesStartOffset + 2 + i];
      var msgByte = -1;
      var msg = '';
      var msgByteIdx = 0;
      while (msgByte != 0) {
        msgByte = buffer.buffer[msgPtr + msgByteIdx++];
        if (msgByte != 0) msg += String.fromCharCode(msgByte);
      }
      logic.logic.messages[logic.logic.messages.length] = msg;
      logic.messages[logic.messages.length] = msg;
    }

    logic.decompile();

    return logic;
  };

  static decompile = (binary: any, logic: any) => {
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

  static decompileScope = (binary: any, messages: any, scope: any, lines: any, depth: number) => {
    scope.body.forEach(function (node: any) {
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

  static decompileExpression = (expression: any) => {
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
    } else {
      var funcName = AgiLogic.testFunctions[opCode];
      line = (negate ? '!' : '') + funcName + '(';

      if (args) {
        var testVars = AgiLogic.processArgNames(funcName, true, args, []);

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

  static processArgNames = (funcName, isTest, args, messages) => {
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

  static decompileNode = (binary: any, messages: any, node: any) => {
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
      line += AgiLogic.decompileExpression(expression);
      line += ')';
    } else if (opCode == 0xfe) {
      if (node.expression) {
        line = 'else (';
        line += AgiLogic.decompileExpression(expression);
        line += ')';
      } else {
        line += 'goto';
      }
    } else if (opCode == 0x0e) {
      line = 'said';
    } else {
      var funcName = AgiLogic.statementFunctions[opCode];
      line += funcName;

      line += '(';
      if (args) {
        line += args;
      } else {
        var statementArgs = [];
        for (var i = 0; i < statement.length; i++) {
          statementArgs.push(AgiLogic.getValueAtOffset(binary, byteOffset - statement.length + i));
        }

        var statementArgsx = AgiLogic.processArgNames(funcName, false, statementArgs, messages);

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

  static getValueAtOffset = (binary: any, offset: number) => {
    binary.position = offset;
    return binary.readUint8();
  };

  static compile = (logicCode) => {
    // this code needs to be re-built as a true parser

    let buffer = new Uint8Array(8000);
    let position = 2;
    let messageOffset = -1;
    logicCode = logicCode.replaceAll('}', '};');
    logicCode = logicCode.replaceAll('{', '{;');

    logicCode = logicCode.replaceAll('\n', '');
    logicCode = logicCode.replaceAll('\t', '');

    let messageTableStr = logicCode.substring(logicCode.indexOf('#'));
    let messageTable = messageTableStr.split('#');
    let msgIdx = 0;
    messageTable.forEach(function (msg) {
      msg = msg
        .substring(msg.indexOf('"'), msg.lastIndexOf('"') + 1)
        .replaceAll('"', '')
        .toLowerCase();
      messageTable[msgIdx] = msg;
      msgIdx++;
    });

    let lines = [];
    lines = logicCode.split(';');
    let openScopePosition = 0; // doing this does not allow nesting of scopes :(

    lines.forEach(function (line) {
      var lineToParse = line; //.replaceAll(" ", "")
      lineToParse = lineToParse.toLowerCase();
      var command = '';

      try {
        if (lineToParse.indexOf('(') != -1) {
          // function or if statement
          command = lineToParse.substring(0, lineToParse.indexOf('('));
        } else {
          // other
          command = lineToParse;
        }

        let opCode = -1;
        let args = [];

        if (command === 'return') {
          opCode = 0x00;
        } else if (command === 'if') {
          opCode = 0xff;
          let testStr = lineToParse.replace('if(', '').replace(') {', '');
          let testStrArray = testStr.split(/\|\||\&\&/);

          testStrArray.forEach(function (testStr) {
            // 0xFC OR
            // 0xFD AND
            // NEGATED?
            let compareCommand = testStr.substring(0, testStr.indexOf('('));
            var compOpCode = AgiLogic.testFunctions.indexOf(compareCommand);
            let compareArgsStr = testStr.substring(testStr.indexOf('(') + 1, testStr.indexOf(')'));

            compareArgsStr = compareArgsStr.replaceAll('f', '');
            compareArgsStr = compareArgsStr.replaceAll('v', '');
            let compareArgs = compareArgsStr.split(',');
            args[args.length] = compOpCode;

            compareArgs.forEach(function (arg) {
              let argAsNum = parseInt(arg);
              arg = isNaN(argAsNum) ? arg : argAsNum;
              args[args.length] = arg;
            });
          });
          args[args.length] = 0xff; // close the if clause if(....)
          args[args.length] = 0x00; // length of scope
          args[args.length] = 0x00; // length of scope
          openScopePosition = position + 1 /* op code */ + args.length;
        } else if (command === 'else') {
          opCode = 0xfe;
        } else if (command === 'said') {
          opCode = 0x0e;
        } else if (command === '}') {
          // close of scope, nothng to do
          let byteCount = position - openScopePosition;
          buffer[openScopePosition - 2] = byteCount;
        } else if (command.indexOf('#') != -1) {
          // message table item
          if (messageOffset === -1) {
            messageOffset = position;
          }
        } else {
          opCode = AgiLogic.statementFunctions.indexOf(command);
          let argsStr = lineToParse.replaceAll(command, '');
          argsStr = argsStr.replace('(', '').replace(')', '');
          argsStr = argsStr.replaceAll('f', '');
          argsStr = argsStr.replaceAll('v', '');
          args = argsStr != '' ? argsStr.split(',') : [];

          // convert argments that are strings to ID in message tabel
          let argIdx = 0;
          args.forEach(function (arg) {
            if (arg.indexOf('"') != -1) {
              let msg = arg.replaceAll('"', '');
              let msgId = messageTable.indexOf(msg);

              if (msgId != -1) {
                args[argIdx++] = msgId;
              }
            } else {
              let argAsNum = parseInt(arg);
              args[argIdx++] = isNaN(argAsNum) ? arg : argAsNum;
            }
          });
        }

        if (opCode != -1) {
          buffer[position] = opCode;
          position++;
          args.forEach(function (arg) {
            buffer[position] = arg;
            position++;
          });
          console.log('opcode :' + command + ' => ' + opCode + ' | ' + args);
        }
      } catch (err) {
        console.log('err parsing command :' + line + ' => ' + command);
      }
    });

    // encode messages

    if (messageOffset === -1) {
      messageOffset = position;
    }

    let messages = ['         Intro/Opening screen', 'ABC'];

    buffer[position++] = messages.length;
    let ptrMsgsEndPos = position;

    // create a space for message pointers
    position = position + messages.length;

    // now add the messages to the buffer
    for (var k = 0; k < messages.length; k++) {
      buffer[position++] = k; // message index
      buffer[ptrMsgsEndPos + 1 + k] = position; // message position

      let message = messages[k];
      for (let j = 0; j < message.length; j++) {
        buffer[position++] = message.charCodeAt(j);
      }
      buffer[position++] = 0;
    }

    // note where message structure ends
    buffer[ptrMsgsEndPos] = position;

    // create a final buffer of the correct size and populate it
    let rightSizedBuffer = new Uint8Array(position);
    for (let i = 0; i < position; i++) {
      rightSizedBuffer[i] = buffer[i];
    }

    // set the message offset
    messageOffset = messageOffset != -1 ? messageOffset : position;
    rightSizedBuffer[1] = messageOffset;
    //    rightSizedBuffer[1] = messageOffset << 16

    let Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
    let bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
    return bStreamBuffer;
  };
}

export default AgiLogic;
