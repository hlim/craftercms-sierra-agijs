export class AgiBridge {
  static gameIsLoaded() {
    let gameIsLoaded = false;

    let roomValue = AgiBridge.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    if (roomValue) {
      gameIsLoaded = true;
    }

    return gameIsLoaded;
  }

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
}

export default AgiBridge;
