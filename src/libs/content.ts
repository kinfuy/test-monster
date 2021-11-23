import { injectCustomJs, addEventListener, chromeAddListenerMessage, setStore } from './utils';
addEventListener('DOMContentLoaded', () => {
  injectCustomJs('libs/script/inject.js');
});
addEventListener(
  'message',
  (info: any) => {
    if (info.data.key === 'MONSTER_INJECT_SET_EVENT') {
      console.log(info.data.eventMonsterList);
    }
  },
  window
);
chromeAddListenerMessage((request, sendResponse) => {
  if (request.key === 'MONSTER_POPUP_RECORD') {
    window.postMessage({ key: 'MONSTER_CONTENT_RECORD' }, '*');
    sendResponse();
  }
});
