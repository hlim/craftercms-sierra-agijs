import { PluginDescriptor } from '@craftercms/studio-ui';
import AllowInput from './components/AllowInput';
import RoomSelector from './components/RoomSelector';
import SoundSelector from './components/SoundSelector';
import SetEgoPosition from './components/SetEgoPosition';
import ShowPriorityBuffer from './components/ShowPriorityBuffer';
import ShowCode from './components/ShowCode';

const plugin: PluginDescriptor = {
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
    'org.rd.plugin.agistudio.ShowCode': ShowCode
  }
};

export { RoomSelector, SoundSelector, AllowInput, SetEgoPosition };

export default plugin;
