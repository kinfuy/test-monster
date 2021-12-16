/**
 * url 是否存在于keys
 * @param url
 * @param keys
 * @returns
 */
export const IsurlExait = (url: string, keys: Array<string>) => {
  let isExist = false;
  keys.forEach((val) => {
    if (url.indexOf(val) >= 0) {
      isExist = true;
    }
  });
  return isExist;
};
// 生成uuid
export const UUID = (): string => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};

// 生成随机码
export const createRandomCode = (len = 6) => {
  const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
  const maxLen = charset.length;
  let ret = '';
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * maxLen);
    ret += charset[randomIndex];
  }
  return ret;
};

// 生成下载文件
export const loadFile = (fileName: string, content: string) => {
  let aLink = document.createElement('a');
  let blob = new Blob([content], {
    type: 'text/plain',
  });
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  URL.revokeObjectURL(blob.toString());
};

/**
 * 删除所有cookies
 */
export const clearAllCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
  }
};
/**
 * 获取元素Xpath
 * @param el
 * @returns
 */
export const getXPath = (el: Element) => {
  let nodeElem = el;
  if (nodeElem.id) {
    return `//*[@id="${nodeElem.id}"]`;
  }
  const parts = [];
  while (nodeElem && nodeElem.nodeType === Node.ELEMENT_NODE) {
    let nbOfPreviousSiblings = 0;
    let hasNextSiblings = false;
    let sibling = nodeElem.previousSibling;
    while (sibling) {
      if (sibling.nodeType !== Node.DOCUMENT_TYPE_NODE && sibling.nodeName === nodeElem.nodeName) {
        nbOfPreviousSiblings++;
      }
      sibling = sibling.previousSibling;
    }
    sibling = nodeElem.nextSibling;
    while (sibling) {
      if (sibling.nodeName === nodeElem.nodeName) {
        hasNextSiblings = true;
        break;
      }
      sibling = sibling.nextSibling;
    }
    const prefix = nodeElem.prefix ? nodeElem.prefix + ':' : '';
    const nth = nbOfPreviousSiblings || hasNextSiblings ? `[${nbOfPreviousSiblings + 1}]` : '';
    parts.push(prefix + nodeElem.localName + nth);
    if (nodeElem.parentNode) nodeElem = nodeElem.parentNode as Element;
  }
  return parts.length ? '/' + parts.reverse().join('/') : '';
};
/**
 * 根据xpath获取元素
 * @param xpath
 * @returns
 */
export const getELementXpath = (xpath: string) => {
  var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
  return result.iterateNext();
};
/**
 * img to base64
 * @param img
 * @returns
 */
export function image2Base64(img: any) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }
}
/**
 * 触发事件
 * @param eventName
 * @param el
 */
export const dispatchEventHandler = (eventName: string, el: Element) => {
  const event = new Event(eventName, { cancelable: true, bubbles: true });
  el.dispatchEvent(event);
};
/**
 * 事件监听
 * @param event
 * @param callback
 */
export const addEventListener = (event: string, callback: <T>(e: T | Event | MouseEvent) => void, source: Document | Window = document) => {
  source.addEventListener(event, callback);
};
/**
 * 移除事件监听
 * @param event
 * @param callback
 */
export const removeEventListener = (event: string, callback: (e: Event) => void, source: Document | Window = document) => {
  source.removeEventListener(event, callback);
};

/**
 * 等待几秒
 * @param time
 * @returns
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise((reslove, reject) => {
    try {
      let tirmer = setInterval(() => {
        reslove();
        clearInterval(tirmer);
      }, time);
    } catch (error) {
      reject();
    }
  });
};
