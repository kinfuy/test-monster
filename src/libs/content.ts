import { injectCustomJs, addEventListener, chromeAddListenerMessage } from './utils';
addEventListener('DOMContentLoaded', () => {
  injectCustomJs('libs/script/inject.js');
});
chromeAddListenerMessage((request, sendResponse) => {
  if (request.key === 'MONSTER_POPUP_RECORD') {
    window.postMessage({ key: 'MONSTER_CONTENT_RECORD' }, '*');
    sendResponse();
  }
});
