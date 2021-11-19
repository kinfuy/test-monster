export const IsurlExait = (url: string, keys: Array<string>) => {
  let isExist = false;
  keys.forEach((val) => {
    if (url.indexOf(val) >= 0) {
      isExist = true;
    }
  });
  return isExist;
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

export const createTips = function (message: string, type = 'success') {
  const tips = document.createElement('div');
  tips.className = `esayswitch-globl-tips esayswitch-${type}`;
  tips.innerText = message;
  document.body.appendChild(tips);
  setTimeout(() => {
    tips.style.top = '-50px';
    setTimeout(() => {
      document.body.removeChild(tips);
    }, 1000);
  }, 3000);
};

export const clearAllCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
  }
};
/**
 * 获取元素
 * @param key
 * @param elementConfig
 * @returns
 */
import { SettingRule } from './../../source/type/storeType';
import { elementConfig } from '../../config/index';
export const getELement = (key: string, config: SettingRule): HTMLInputElement | undefined => {
  let el = undefined;
  if (config) {
    // 加入预设字段
    config.placeholderValue = config.placeholderValue + ',' + elementConfig[key].placeholderValue;
    config.elementValue = config.elementValue + ',' + elementConfig[key].elementValue;
  } else {
    config = elementConfig[key];
  }
  if (config.ruleType === 'placeholder' && config.placeholderValue) {
    const ruleList = Array.from(new Set(config.placeholderValue.split(',')));
    for (let i = 0; i < ruleList.length; i++) {
      el = document.querySelector(`input[placeholder*="${ruleList[i]}"]`);
      if (el) break;
    }
  }
  if (config.ruleType === 'element' && config.elementValue) {
    const ruleList = Array.from(new Set(config.elementValue.split(',')));
    try {
      for (let i = 0; i < ruleList.length; i++) {
        el = document.querySelector(config.elementValue);
        if (el) break;
      }
    } catch (error) {
      el = undefined;
    }
  }
  if (el) {
    return el as HTMLInputElement;
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
 * 触发事件
 * @param eventName
 * @param el
 */
export const dispatchEventHandler = (eventName: string, el: Element) => {
  const event = new Event(eventName, { cancelable: true, bubbles: false });
  el.dispatchEvent(event);
};
