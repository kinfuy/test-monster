import { injectCustomJs, addEventListener, chromeAddListenerMessage, sendMessageToExtension } from './utils';
import { Eventkey } from './utils/const';
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
chromeAddListenerMessage((request, sendResponse) => {
  if (request.key === Eventkey.MONSTER_RECORD_INIT) {
    window.postMessage({ key: Eventkey.MONSTER_RECORD_INIT }, '*');
    sendResponse();
  }
});
