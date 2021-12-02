import 'babel-polyfill';
import { chromeAddListenerMessage, createContextMenus, getChromeUrl } from './utils';
import { Eventkey } from './utils/const';
createContextMenus('脚本托盘', (info, tab) => {
  console.log(info);
  console.log(tab);
});
chromeAddListenerMessage((request, sendResponse) => {
  console.log(request);
  if (request.key === Eventkey.MONSTER_RECORD_STOP) {
    window.open(getChromeUrl(`/libs/views/script.html`));
    console.log(request);
  }
});
