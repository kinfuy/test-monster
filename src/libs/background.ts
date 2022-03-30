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
createContextMenus('脚本录制', (info, tab) => {
  sendMessageToContentScript({
    key: Eventkey.MONSTER_RECORD_INIT,
  });
});
commandAddListener((name: string) => {
  if (name === 'script-search') {
    sendMessageToContentScript({
      key: Eventkey.MONSTER_SCRIPT_TRAY,
    });
  }
  if (name === 'script-recording') {
    sendMessageToContentScript({
      key: Eventkey.MONSTER_RECORD_INIT,
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
    let searchScript = await getSearchScript(request.data.url, request.data.inputValue);
    sendMessageToContentScript({
      key: Eventkey.MONSTER_SCRIPT_SEARCH_RESULT,
      data: searchScript,
    });
  }
});

async function getSearchScript(url: string, inputValue?: string) {
  const { folderModule } = await getStoreKey<{ folderModule: FolderStore }>(['folderModule']);
  const checkScript = (item: FileOrFolder) => {
    if (item.type === 'file' && item.contentScript && IsurlExait(url, [item.contentScript.url])) {
      return true;
    }
    return false;
  };
  let searchScript;
  if (!inputValue) {
    searchScript = folderModule.flieList.filter((x) => checkScript(x));
  } else {
    searchScript = folderModule.flieList.filter((x) => x.name.includes(inputValue) && checkScript(x));
  }

  return searchScript.sort((a, b) => a.sort - b.sort);
}

// let time = setInterval(() => {
//   window.open('http://www.baidu.com', '_blank');
//   clearInterval(time);
// }, 5000);
