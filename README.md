# craftercms-sierra-agijs
Sierra AGI emulator running AGI.JS in CrafterCMS  -- Why? because it's cool. 

![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/950a604a-20ca-4e9c-8cfb-154355c6fc59)

# Is there a bigger picture?
Yeah, there is. CrafterCMS supports plugins so we can turn Crafter Studio into an AGI Studio and player with custom plugins.
This project already contains a few plugins for interacting with the game in the preview area.

# Uploading a game into the app
1. Click the add button in the toolbar
   ![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/b98b1ded-67de-41b5-894a-f34c89c9cbad)
2. Provide a game ID (a simple lowercase id like kq1, sq1, sp2, ll1 etc) and a game title as follows then click *Upload Game Files & Save*
  ![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/866c2898-d991-4888-9c1f-89bc8d49ca0c)
3. Drag and drop the game files into the application and allow them to upload. Once complete close the dialog and the game will be added
   ![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/0f53d387-1ed9-4ad7-9a9f-38eff62dff8c)

## Studio Customizations
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/44d8244f-bc9f-4a36-9626-a40ed1b5d786)

### Each tool is a plugin of its own
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/7b6226c8-0085-4abb-ada1-2162294fc013)

### Tell which room you are in and re-load it
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/03c84565-ddd1-4f64-a78a-106c3a946b6f)

### Ability to switch / teleport between rooms
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/97612b72-d00d-42d9-924b-f217cae7a825)

### Ability to see and play all the sound resources
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/0683691e-7873-44a5-a69a-8f2b60c09bb4)

### Ability to enable/disable user interaction
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/7b3fa1fd-7410-4441-9085-ce83ffe0b1a7)

## Set the Ego's X and Y coordinates
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/5688d522-38fe-4695-85b3-1412e700477f)

### Render the Priority buffer instead of the Visual buffer
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/a99e0feb-06f2-4868-bb67-2aaa5a9bc07e)

### Decompile active logic resources
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/6b78bf87-5874-4e6f-9eea-2a52374d4da3)

### Read WORDS.TOK files
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/476a3ebe-ea42-4639-b63f-dea3f520d747)

### Command-based Picture Editing 
Todo: Add save, improve UI and add painting tools (commands suck)
![image](https://github.com/russdanner/craftercms-sierra-agijs/assets/169432/92b70bc2-bc0f-43f1-ab9d-75ca0ec8dd02)


# Updates to AGI.js 
In support of this project, we've made the following contributions to AGI.js
* Implemented PC Speaker Sound
* Implemented a reading of Words.TOK
* Implemented a basic dialog box
* Implemented basic input value evaluation (test_said)
  
# Acknowlegements
- All the hard work done by the crew at CrafterCMS (http://craftercms.com.) The plugin system makes it so easy to build out this little IDE.
- https://github.com/r1sc for creating AGI JS
- To all the folks at ScumVM, without the AGI specs and documentation none of this would get done
- Barry Harmsen for his Python extraction examples https://twitter.com/meneerharmsen

# License
Licensed under the GPL version 3.
- This means that if you fork this project and you in any way distribute your fork you need to contribute your source back. Why? That's how it works.

This is in no way affiliated with or endorsed by Sierra Entertainment or any other company.

# CrafterCMS
This project wouldn't be here if it were not for CrafterCMS. 
It's the best Headless CMS out there! Spread the word. Git-based, headless, industrial strength, composable, open source, and "Oh the power"! No seriously. It's super easy to build awesome digital experiences and the tools to manage them in this platform. Try it. :) 
Help us make it even better!
- Website: https://craftercms.com/ 
- Git repo: http://github.com/craftercms
