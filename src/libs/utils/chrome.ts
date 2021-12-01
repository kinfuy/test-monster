// 获取当前选项卡ID
export const getCurrentTabId = () => {
  return new Promise((reslove, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          getCurrentTabId().then((id) => {
            reslove(id);
          });
        } else {
          reslove(tabs.length ? tabs[0].id : null);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 动态注入js
 * @param jsPath 该地址需要打包后的地址
 * @returns
 */
export const injectCustomJs = (jsPath?: string) => {
  try {
    jsPath = jsPath || 'libs/script/inject.js';
    let temp = document.createElement('script');
    if (!temp) return new Error('发生了错误');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
      if (temp.parentNode) {
        temp.parentNode.removeChild(temp);
      } else {
        document.removeChild(temp);
      }
    };
    document.head.appendChild(temp);
  } catch (error) {
    return new Error('script注入错误');
  }
};
/**
 * 获取store
 */
export const getStoreKey = <T>(keys: Array<string>): Promise<T> => {
  return new Promise((resolve, reject) => {
    let store: Record<string, any> = {};
    keys.forEach((x) => {
      store[x] = null;
    });
    try {
      chrome.storage.local.get(store, (rst) => {
        resolve(rst as T);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 设置store
 */
export const setStore = (store: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(store, () => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 清理所有插件store
 */
export const clearStore = (): void => {
  chrome.storage.local.clear();
};
/**
 * 插件消息传递
 * @param message
 * @param callback
 */
export const sendMessageToContentScript = function (message: object, callback?: Function) {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(Number(tabs[0].id), message, function (response) {
        if (callback) callback(response);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * 谷歌监听消息
 * @param callback
 */
export const chromeAddListenerMessage = (callback: (request: any, sendResponse: (response?: any) => void) => void) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    callback(request, sendResponse);
  });
};
// 发送消息给插件
export const sendMessageToExtension = (key: string, data: any) => {
  chrome.runtime.sendMessage({
    key: 'pageLoad',
    info: data,
  });
};
