/**
 * 获取当前选项卡ID
 * @returns
 */
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
 * 清理插件所有store
 */
export const clearStore = (): void => {
  chrome.storage.local.clear();
};
/**
 * 插件消息传递
 * @param message
 * @param callback
 */
export const sendMessageToContentScript = (message: object) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        try {
          chrome.tabs.sendMessage(Number(tabs[0].id), message, (response) => {
            resolve(response);
          });
        } catch (error) {
          reject('当前没有活跃的tabs');
        }
      } else {
        reject('当前没有活跃的tabs');
      }
    });
  });
};
/**
 * 谷歌监听消息
 * @param callback
 */
export const chromeAddListenerMessage = (
  callback: (request: { key: string; data: any }, sendResponse: (response?: any) => void) => void
) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    callback(request, sendResponse);
  });
};
/**
 * 发送消息给插件
 * @param key
 * @param data
 */
export const sendMessageToExtension = (key: string, data: any) => {
  chrome.runtime.sendMessage({
    key,
    data,
  });
};
/**
 * 创建鼠标右键
 * @param title
 * @param handler
 */
export const createContextMenus = (title: string, handler: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void) => {
  chrome.contextMenus.create({
    title: title,
    onclick: handler,
  });
};
/**
 * 创建通知
 * @param notificationId
 * @param options "basic", "image", "list", or "progress"
 * @returns
 */
export const createNotifications = (notificationId: string, options: chrome.notifications.NotificationOptions): Promise<void> => {
  return new Promise((reslove, reject) => {
    try {
      chrome.notifications.create(notificationId, options, () => {
        reslove();
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 获取插件相对地址
 * @param path
 * @returns
 */
export const getChromeUrl = (path: string) => {
  return chrome.extension.getURL(path);
};

/**
 * 监听快捷键
 */
export const commandAddListener = (callback: Function) => {
  chrome.commands.onCommand.addListener((command) => {
    callback(command);
  });
};

/**
 * 截取当前窗口
 */
export const screenShot = () => {
  // chrome.tabs.captureVisibleTab(null, {}, function (dataUrl) {
  //   sendResponse({ imgSrc: dataUrl });
  // });
};
