import 'babel-polyfill';
import { injectCustomJs, addEventListener, chromeAddListenerMessage, sendMessageToExtension, getStoreKey } from './utils';
import { Eventkey } from './utils/const';
import { EventMonsterList, runEvent } from './history';
addEventListener('DOMContentLoaded', () => {
  injectCustomJs('libs/script/inject.js');
});
addEventListener(
  'message',
  (info: any) => {
    if (info.data.key === Eventkey.MONSTER_RECORD_STOP) {
      sendMessageToExtension(Eventkey.MONSTER_RECORD_STOP, info.data.eventMonsterList);
    }
  },
  window
);
chromeAddListenerMessage(async (request, sendResponse) => {
  sendResponse();
  if (request.key === Eventkey.MONSTER_RECORD_INIT) {
    window.postMessage({ key: Eventkey.MONSTER_RECORD_INIT }, '*');
  }
  if (request.key === Eventkey.MONSTER_SCRIPT_TRAY) {
    window.postMessage({ key: Eventkey.MONSTER_SCRIPT_TRAY }, '*');
  }
  if (request.key === Eventkey.MONSTER_EVENTS_RUN) {
    const { EventList } = await getStoreKey<{ EventList: EventMonsterList }>(['EventList']);
    EventList.eventList.forEach(async (x) => {
      await runEvent(x.xpath, x.eventType, x.formValue);
      console.log(x);
    });
  }
});
