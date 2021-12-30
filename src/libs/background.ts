import 'babel-polyfill';
import { FolderStore, FileOrFolder } from '../source/store/script/module/folder';
import {
  chromeAddListenerMessage,
  sendMessageToContentScript,
  createContextMenus,
  getChromeUrl,
  commandAddListener,
  setStore,
  getStoreKey,
  IsurlExait,
  screenShot,
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
  if (request.key === Eventkey.MONSTER_SCREEN_SHOT) {
    // screenShot();
  }
  if (request.key === Eventkey.MONSTER_SCRIPT_SEARCH) {
    const { folderModule } = await getStoreKey<{ folderModule: FolderStore }>(['folderModule']);
    const checkScript = (item: FileOrFolder) => {
      if (item.type === 'file' && item.contentScript && IsurlExait(request.data.url, [item.contentScript.url])) {
        return true;
      }
      if (item.type === 'floder') {
        const childrenLength = folderModule.flieList.filter((x) => x.parentId === item.id).length;
        console.log(childrenLength);
        return childrenLength > 0 ? true : false;
      }
      return false;
    };
    const searchScript = folderModule.flieList.filter((x) => x.name.includes(request.data.inputValue) && checkScript(x));
    sendMessageToContentScript({
      key: Eventkey.MONSTER_SCRIPT_SEARCH_RESULT,
      data: searchScript,
    });
  }
});
