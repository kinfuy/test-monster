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
    if (info.data.key === Eventkey.MONSTER_SCRIPT_SEARCH) {
      sendMessageToExtension(Eventkey.MONSTER_SCRIPT_SEARCH, { url: info.data.url, inputValue: info.data.inputValue });
    }
    if (info.data.key === Eventkey.MONSTER_SCREEN_SHOT) {
      sendMessageToExtension(Eventkey.MONSTER_SCREEN_SHOT, {});
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
  if (request.key === Eventkey.MONSTER_SCRIPT_SEARCH_RESULT) {
    window.postMessage({ key: Eventkey.MONSTER_SCRIPT_SEARCH_RESULT, data: request.data }, '*');
  }
  if (request.key === Eventkey.MONSTER_EVENTS_RUN) {
    const { EventList } = await getStoreKey<{ EventList: EventMonsterList }>(['EventList']);
    EventList.eventList.forEach(async (x) => {
      await runEvent(x.xpath, x.eventType, x.formValue, { mouseEventConfig: x.config });
    });
  }
});
