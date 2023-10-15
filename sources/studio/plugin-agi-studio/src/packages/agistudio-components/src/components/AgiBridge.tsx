import { post } from '@craftercms/studio-ui/utils/ajax';

export class AgiBridge {
  static reload() {
    //@ts-ignore
    var game = document.getElementById('crafterCMSPreviewIframe').contentWindow.location.reload();
  }

  static getActiveGameId() {
    //@ts-ignore
    var game = document.getElementById('crafterCMSPreviewIframe').contentWindow.location.pathname.replace('/games/', '');
    return game;
  }

  static gameIsLoaded() {
    let gameIsLoaded = false;

    let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    if (roomValue) {
      gameIsLoaded = true;
    }

    return gameIsLoaded;
  }
  static currentRoom = () => {
    let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    let roomInt = parseInt(roomValue) ? roomValue : -1;
    return roomValue;
  };

  static agiExecute(intent: string, command: string) {
    let frameElPath = "document.getElementById('crafterCMSPreviewIframe')";
    let previewFrameEl = eval(frameElPath);

    if (previewFrameEl) {
      const agiPath = frameElPath + '.contentWindow.Agi';
      const resourcesPath = frameElPath + '.contentWindow.Resources';
      const fsPath = frameElPath + '.contentWindow.Fs';

      let agiBooted = eval(agiPath);

      if (agiBooted) {
        try {
          var commandToSend = command;

          if (command.startsWith('Agi')) {
            commandToSend = command.replaceAll('Agi', agiPath);
          } else if (command.startsWith('Resources')) {
            commandToSend = commandToSend.replaceAll('Resources', resourcesPath);
          } else if (command.startsWith('Fs')) {
            commandToSend = commandToSend.replaceAll('Fs', fsPath);
          }

          //          console.log('Sending Command :' + intent);
          //          console.log('Command :' + command);
          //          console.log('Sending Command :' + commandToSend);

          // Can the rollup message be disabled?
          let result = eval(commandToSend);

          return result;
        } catch (err) {
          console.log('Failed to send command with intent: ' + intent);
          console.log('Command: ' + command);
          console.log('Error: ' + err);
        }
      } else {
        console.log('Bridge: AGI not available');
      }
    }
  }

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
    let Agi = AgiBridge.agiExecute('Get Agi', 'Agi');

    // load room 1 logic and manipulate it into a "new" logic
    let logic = new Agi.LogicParser(Agi.interpreter, 1);

    let Fs = AgiBridge.agiExecute('Get Fs', 'Fs');
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
      AgiBridge.decompileScope(binary, logic.logic.messages, program, lines, 0);

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
      lines.push('\t'.repeat(depth) + AgiBridge.decompileNode(binary, messages, node));

      if (node.then) {
        lines.push('{');
        AgiBridge.decompileScope(binary, messages, node.then, lines, depth + 1);
        lines.push('\t'.repeat(depth) + '}');
      }
      if (node.else) {
        lines.push('\t'.repeat(depth) + 'else {');
        AgiBridge.decompileScope(binary, messages, node.else, lines, depth + 1);
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
      line += AgiBridge.decompileExpression(left);
      line += left.constructor.name == 'AndNode' ? ' && ' : ' || ';
      line += AgiBridge.decompileExpression(right);
    } else {
      var funcName = AgiBridge.testFunctions[opCode];
      line = (negate ? '!' : '') + funcName + '(';

      if (args) {
        var testVars = AgiBridge.processArgNames(funcName, true, args, []);

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
      line += AgiBridge.decompileExpression(expression);
      line += ')';
    } else if (opCode == 0xfe) {
      if (node.expression) {
        line = 'else (';
        line += AgiBridge.decompileExpression(expression);
        line += ')';
      } else {
        line += 'goto';
      }
    } else if (opCode == 0x0e) {
      line = 'said';
    } else {
      var funcName = AgiBridge.statementFunctions[opCode];
      line += funcName;

      line += '(';
      if (args) {
        line += args;
      } else {
        var statementArgs = [];
        for (var i = 0; i < statement.length; i++) {
          statementArgs.push(AgiBridge.getValueAtOffset(binary, byteOffset - statement.length + i));
        }

        var statementArgsx = AgiBridge.processArgNames(funcName, false, statementArgs, messages);

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
            var compOpCode = AgiBridge.testFunctions.indexOf(compareCommand);
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
          opCode = AgiBridge.statementFunctions.indexOf(command);
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

    let Fs = AgiBridge.agiExecute('Get Fs', 'Fs');
    let bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
    return bStreamBuffer;
  };

  /* Pic Drawing */
  /* ============================================================================================================= */
  static prettyPrintPictureCommands = (commands: any) => {
    let code = '';
    commands.forEach(function (command) {
      code += command + '\n';
    });

    return code;
  };

  static encodePictureCommands = (commandsToEncode) => {
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

    let rightsizedBuffer = new Uint8Array(i);
    for (var l = 0; l < i; l++) {
      rightsizedBuffer[l] = encodedBuffer[l];
    }

    return rightsizedBuffer;
  };

  static getFunctionArgsFromPictureStream = (stream: any) => {
    var args = [];

    while (true) {
      var arg = stream.readUint8();
      if (arg >= 0xf0) break;
      args.push(arg);
    }

    stream.position--;

    return args;
  };

  static decodePictureStream = (stream: any) => {
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
            var args = AgiBridge.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawYCorner(' + args.join(',') + ');');
            break;
          case 245: // DrawXCorner
            var args = AgiBridge.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawXCorner(' + args.join(',') + ');');
            break;
          case 246: // DrawAbs
            var args = AgiBridge.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawAbs(' + args.join(',') + ');');
            break;
          case 247: // DrawRel
            var args = AgiBridge.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawRel(' + args.join(',') + ');');
            break;
          case 248: // DrawFill
            var args = AgiBridge.getFunctionArgsFromPictureStream(stream);
            decodedCommands.push('DrawFill(' + args.join(',') + ');');
            break;
          case 249: // SetPen
            var value = stream.readUint8();
            decodedCommands.push('SetPen(' + value + ');');
            break;
          case 250: // DrawPen
            var args = AgiBridge.getFunctionArgsFromPictureStream(stream);
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

  static renderCommands = (commandsToRender) => {
    let encodedBuffer = AgiBridge.encodePictureCommands(commandsToRender);

    let agiInterpreter = AgiBridge.agiExecute('Get interpreter', 'Agi.interpreter');
    let AgiPic = AgiBridge.agiExecute('Get Agi.Pic', 'Agi.Pic');
    let FsByteStream = AgiBridge.agiExecute('Get Fs', 'Fs.ByteStream');

    let picNo = agiInterpreter.variables[0];
    agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
    agiInterpreter.agi_draw_pic(0);
    agiInterpreter.agi_show_pic(0);
  };

  static createPictureDrawModeCommand = (mode) => {
    var value = 1 & 0x10 & 0x07;
    return `PicSetPen(${value});`;
  };

  static createPictureDrawCommand = (mode, x, y, scale) => {
    var newCommand = '';

    if (mode == 'Abs') {
      newCommand = `DrawAbs(${x},${y},${x + 1},${y});`;
    } else if (mode == 'Pen') {
      newCommand = `DrawPen(${x},${y},${x + scale},${y},${x},${y + scale},${x + scale},${y + scale});`;
    } else if (mode == 'Fill') {
      newCommand = `DrawFill(${x},${y});`;
    } else {
      console.log('unknown tool -> ' + mode);
    }

    return newCommand;
  };

  static createPictureSetColorCommand = (color: number) => {
    return `PicSetColor(${color});`;
  };

  static getCurrentPictureCommands = () => {
    try {
      let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
      let currentPictureStream = AgiBridge.agiExecute(
        'Get Pic Stream',
        'Resources.readAgiResource(Resources.AgiResource.Pic, ' + roomValue + ')'
      );

      let decodedPictureCommands = AgiBridge.decodePictureStream(currentPictureStream);

      return AgiBridge.prettyPrintPictureCommands(decodedPictureCommands);
    } catch (err) {}
  };

  static switchPictureBuffer = () => {
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

  static undoPictureCommand = (commands) => {
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

  static appendPictureCommandToTail = (commands, command) => {
    var newCommands = commands.replace('End();', '');
    newCommands = newCommands + `${command}\nEnd();`;

    return newCommands;
  };

  static addVolumeHeader = (picData, volume) => {
    let endMarkerPosition = picData.length; //indexOf(255) + 1
    let sizeOfNewData = endMarkerPosition + 5;
    let dataWithHeader = new Uint8Array(sizeOfNewData);

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

  static updateDirectoryOffsets = (dirname, dirRecords, startOffset, adjustBy) => {
    // now modify the directory
    let position = 0;
    let recordCount = dirRecords.length;
    let newDirEncoded = new Uint8Array(recordCount * 3);

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
      } else {
        newDirEncoded[position] = 255;
        newDirEncoded[position + 1] = 255;
        newDirEncoded[position + 2] = 255;
      }

      position = position + 3;
    }

    return newDirEncoded;
  };

  static saveFile = (siteId, path, filename, data) => {
    const API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';

    // write the volume file
    let gameContentPath = path;
    let uploadFilename = filename;
    let serviceUrl =
      API_WRITE_CONTENT +
      `?site=${siteId}&path=${path}&contentType=folder&createFolders=true&draft=false&duplicate=false&unlock=true`;

    let body = new FormData();
    body.append('site', siteId);
    body.append('relativePath', 'null');
    body.append('validating', 'false');
    body.append('path', path);
    body.append('name', filename);

    body.append('type', 'application/octet-stream');
    body.append('allowed', 'true');
    body.append('file', new Blob([data]), filename);

    post(serviceUrl, body).subscribe({
      next: (response) => {
        // alert('File Saved: ' + filename);
      },
      error(e) {
        alert('File Failed :' + filename);
      }
    });
  };

  static handleSaveAsNewPicture = (siteId, game) => {
    downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        parseDirfile(buffers['LOGDIR'], logdirRecords);
        parseDirfile(buffers['PICDIR'], picdirRecords);
        parseDirfile(buffers['VIEWDIR'], viewdirRecords);
        parseDirfile(buffers['SNDDIR'], snddirRecords);
        var volNames: string[] = [];
        for (var i = 0; i < availableVols.length; i++) {
          if (availableVols[i] === true) {
            volNames.push('VOL.' + i);
          }
        }

        downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
          console.log('Resource volumes downloaded.');
          for (var j: number = 0; j < volNames.length; j++) {
            volBuffers[j] = buffers[volNames[j]];
          }

          let newPicData = new Uint8Array(6);
          newPicData[0] = 240; // set pic color
          newPicData[1] = 0; // ard: black
          newPicData[2] = 0; // draw fill
          newPicData[3] = 10; // arg: x
          newPicData[4] = 0; // arg: y
          newPicData[5] = 255; // end

          newPicData = AgiBridge.addVolumeHeader(newPicData, 0);

          let volNum = 0;
          let picsStream = volBuffers[0].buffer;
          let offset = picsStream.length;
          let roomValue = picdirRecords.length;
          let picRecord = (picdirRecords[roomValue] = { volNo: volNum, volOffset: offset });
          let newStreamLength = picsStream.length + newPicData.length;

          let newStream = new Uint8Array(newStreamLength);

          for (var n = 0; n < newStreamLength; n++) {
            if (n < picsStream.length) {
              // copy in the existing resources
              newStream[n] = picsStream[n];
            } else {
              // copy in new resource
              newStream[n] = newPicData[n - picsStream.length];
            }
          }

          let newPicDirEncoded = AgiBridge.updateDirectoryOffsets('P', picdirRecords, picRecord.volOffset, 0);

          // Every room has a logic file. Add logic file
          let roomLogic = [
            12,
            34, // signature
            0, // volume
            112, // length
            84, // message start offset

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

          let volStream = new Uint8Array(newStreamLength + 117);

          for (var n = 0; n < volStream.length; n++) {
            if (n < newStream.length) {
              // copy in the existing resources
              volStream[n] = newStream[n];
            } else {
              // copy in new resource
              volStream[n] = roomLogic[n - newStream.length];
            }
          }

          let logRecord = (logdirRecords[roomValue] = { volNo: volNum, volOffset: newStream.length });
          let newLogDirEncoded = AgiBridge.updateDirectoryOffsets('L', logdirRecords, logRecord.volOffset, 0);

          //@ts-ignore
          let gamePath = '/static-assets/games/' + game + '/';
          AgiBridge.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          AgiBridge.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);

          // save updated volume file
          AgiBridge.saveFile(siteId, gamePath, 'VOL.0', volStream);

          AgiBridge.reload();
        });
      }
    );
  };

  static savePicture = (siteId, game, commands) => {
    downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        parseDirfile(buffers['LOGDIR'], logdirRecords);
        parseDirfile(buffers['PICDIR'], picdirRecords);
        parseDirfile(buffers['VIEWDIR'], viewdirRecords);
        parseDirfile(buffers['SNDDIR'], snddirRecords);
        var volNames: string[] = [];
        for (var i = 0; i < availableVols.length; i++) {
          if (availableVols[i] === true) {
            volNames.push('VOL.' + i);
          }
        }

        downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
          console.log('Resource volumes downloaded.');
          for (var j: number = 0; j < volNames.length; j++) {
            volBuffers[j] = buffers[volNames[j]];
          }

          let newPicData = AgiBridge.encodePictureCommands(commands);
          newPicData = AgiBridge.addVolumeHeader(newPicData, 0);

          let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
          let picRecord = picdirRecords[roomValue];
          let nextPicRecord = picdirRecords[roomValue + 1]; // assuption: not the last picture

          let picsStream = volBuffers[picRecord.volNo].buffer;

          let lengthOfOldPic = 0;
          if (nextPicRecord) {
            lengthOfOldPic = nextPicRecord.volOffset - picRecord.volOffset;
          }

          let newPicSizeDiff = newPicData.length - lengthOfOldPic; //+ 2; // last command + 255 end marker

          // now that we know how the new picture relates to the old one we can re-size the stream
          // up or down accordingly.
          let newStreamLength = picsStream.length + newPicSizeDiff;

          let newStream = new Uint8Array(newStreamLength);
          for (var n = 0; n < newStream.length; n++) {
            if (n < picRecord.volOffset || n > picRecord.volOffset + (newPicData.length - 1)) {
              // copy the original buffer to the new buffer
              if (n < picRecord.volOffset) {
                // before the new resource
                newStream[n] = picsStream[n];
              } else {
                // after our resource, we have to account for 'overlap'
                newStream[n] = picsStream[n - newPicSizeDiff];
              }
            } else {
              // copy the new picture into the new stream
              newStream[n] = newPicData[n - picRecord.volOffset];
            }
          }

          let newPicDirEncoded = AgiBridge.updateDirectoryOffsets('P', picdirRecords, picRecord.volOffset, newPicSizeDiff);
          let newLogDirEncoded = AgiBridge.updateDirectoryOffsets('L', logdirRecords, picRecord.volOffset, newPicSizeDiff);
          let newViewDirEncoded = AgiBridge.updateDirectoryOffsets('V', viewdirRecords, picRecord.volOffset, newPicSizeDiff);
          let newSndDirEncoded = AgiBridge.updateDirectoryOffsets('S', snddirRecords, picRecord.volOffset, newPicSizeDiff);

          let gamePath = '/static-assets/games/' + game + '/';
          AgiBridge.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          AgiBridge.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
          AgiBridge.saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
          AgiBridge.saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);

          // save updated volume file
          AgiBridge.saveFile(siteId, gamePath, 'VOL.0', newStream);
          AgiBridge.reload();
        });
      }
    );
  };
}

interface IDirectoryEntry {
  volNo: number;
  volOffset: number;
}

var logdirRecords: IDirectoryEntry[] = [],
  picdirRecords: IDirectoryEntry[] = [],
  viewdirRecords: IDirectoryEntry[] = [],
  snddirRecords: IDirectoryEntry[] = [];
var volBuffers: ByteStream[] = [];
var availableVols: boolean[] = [];

function parseDirfile(buffer: ByteStream, records: IDirectoryEntry[]): void {
  var length: number = buffer.length / 3;
  for (var i: number = 0; i < length; i++) {
    var val: number = (buffer.readUint8() << 16) + (buffer.readUint8() << 8) + buffer.readUint8();
    var volNo: number = val >>> 20;
    var volOffset: number = val & 0xfffff;
    if (val >>> 16 == 0xff) continue;
    records[i] = { volNo: volNo, volOffset: volOffset };
    if (availableVols[volNo] === undefined) availableVols[volNo] = true;
  }
}

enum AgiResource {
  Logic,
  Pic,
  View,
  Sound
}

function readAgiResource(type: AgiResource, num: number): ByteStream {
  var record = null;
  switch (type) {
    case AgiResource.Logic:
      record = logdirRecords[num];
      break;
    case AgiResource.Pic:
      record = picdirRecords[num];
      break;
    case AgiResource.View:
      record = viewdirRecords[num];
      break;
    case AgiResource.Sound:
      record = snddirRecords[num];
      break;
    default:
      throw 'Undefined resource type: ' + type;
  }

  var volstream = new ByteStream(volBuffers[record.volNo].buffer, record.volOffset);

  var sig: number = volstream.readUint16();
  var volNo: number = volstream.readUint8();
  var resLength = volstream.readUint16();

  var volPart = new ByteStream(volstream.buffer, record.volOffset + 5, record.volOffset + 5 + resLength);

  return volPart;
}

class ByteStream {
  position: number = 0;
  length: number = 0;
  constructor(public buffer: Uint8Array, private startPosition: number = 0, private end: number = 0) {
    if (end == 0) this.end = this.buffer.byteLength;
    this.length = this.end - this.startPosition;
  }

  readUint8(): number {
    return this.buffer[this.startPosition + this.position++];
  }

  readUint16(littleEndian: boolean = true): number {
    var b1: number = this.buffer[this.startPosition + this.position++];
    var b2: number = this.buffer[this.startPosition + this.position++];
    if (littleEndian) {
      return (b2 << 8) + b1;
    }
    return (b1 << 8) + b2;
  }

  readInt16(littleEndian: boolean = true): number {
    var b1: number = this.buffer[this.startPosition + this.position++];
    var b2: number = this.buffer[this.startPosition + this.position++];
    if (littleEndian) {
      return (((b2 << 8) | b1) << 16) >> 16;
    }
    return (((b1 << 8) | b2) << 16) >> 16;
  }
}

interface IByteStreamDict {
  [index: string]: ByteStream;
}

function downloadAllFiles(path: string, files: string[], done: (buffers: IByteStreamDict) => void) {
  var buffers: IByteStreamDict = {};
  var leftToDownload: number = files.length;

  function getBinary(url: string, success: (data: ArrayBuffer) => void): void {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url + '?crafterSite=agi-crafter', true);

    xhr.responseType = 'arraybuffer';

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.response === null) {
          throw "Fatal error downloading '" + url + "'";
        } else {
          console.log("Successfully downloaded '" + url + "'");
          success(xhr.response);
        }
      }
    };
    xhr.send();
  }

  function handleFile(num: number) {
    getBinary(path + files[num], (buffer: ArrayBuffer) => {
      buffers[files[num]] = new ByteStream(new Uint8Array(buffer));
      leftToDownload--;

      if (leftToDownload === 0) {
        done(buffers);
      }
    });
  }

  for (var i = 0; i < files.length; i++) {
    handleFile(i);
  }
}

export default AgiBridge;
