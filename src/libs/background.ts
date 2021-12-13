import 'babel-polyfill';
import { chromeAddListenerMessage, createContextMenus, getChromeUrl, setStore } from './utils';
import { Eventkey } from './utils/const';
createContextMenus('脚本托盘', (info, tab) => {
  console.log(info);
  console.log(tab);
});
chromeAddListenerMessage((request, sendResponse) => {
  sendResponse();
  if (request.key === Eventkey.MONSTER_RECORD_STOP) {
    window.open(getChromeUrl(`/libs/views/script.html`));
    setStore({ currectEventList: request.data });
  }
});
