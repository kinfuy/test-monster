import 'babel-polyfill';
import { FolderStore } from '../source/store/script/module/folder';
import {
  chromeAddListenerMessage,
  sendMessageToContentScript,
  createContextMenus,
  getChromeUrl,
  commandAddListener,
  setStore,
  getStoreKey,
} from './utils';
import { Eventkey } from './utils/const';
createContextMenus('脚本检索', (info, tab) => {
  sendMessageToContentScript({
    key: Eventkey.MONSTER_SCRIPT_TRAY,
  });
});
commandAddListener((name: string) => {
  if (name === 'script-search') {
    sendMessageToContentScript({
      key: Eventkey.MONSTER_SCRIPT_TRAY,
    });
  }
});
chromeAddListenerMessage(async (request, sendResponse) => {
  sendResponse();
  if (request.key === Eventkey.MONSTER_RECORD_STOP) {
    window.open(getChromeUrl(`/libs/views/script.html`));
    setStore({ currectEventList: request.data });
  }
  if (request.key === Eventkey.MONSTER_SCRIPT_SEARCH) {
    const { folderModule } = await getStoreKey<{ folderModule: FolderStore }>(['folderModule']);
    const searchScript = folderModule.flieList.filter(
      (x) => x.type === 'file' && x.name.includes(request.data.inputValue) && x.contentScript
    );
    sendMessageToContentScript({
      key: Eventkey.MONSTER_SCRIPT_SEARCH_RESULT,
      data: searchScript,
    });
  }
});
