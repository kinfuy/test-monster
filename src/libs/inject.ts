// import 'babel-polyfill';
// 该文件会注入到目标网站
import { NativeMask, NativeTool, NativeRecord, NativeTray } from './history/view';
import { EventMonsterList, EventMonster, runEventSleep, cancelEvent } from './history';
import { addEventListener, removeEventListener, getXPath, mutationObserver } from './utils';
import { Eventkey } from './utils/const';
import throttle from 'lodash.throttle';
import clonedeep from 'lodash.clonedeep';
import { FileOrFolder } from '../source/store/script';
import { PositioningElement, bindChildElenemt } from '../libs/utils/element';
let mask: NativeMask | undefined;
let tool: NativeTool | undefined;
let tray: NativeTray | undefined;
let eventMonsterList: EventMonsterList | undefined;
addEventListener(
  'message',
  (info: any) => {
    if (info.data.key === Eventkey.MONSTER_RECORD_INIT) {
      mask = new NativeMask();
      tool = new NativeTool(handleStop);
      maskInit();
    }
    if (info.data.key === Eventkey.MONSTER_SCRIPT_TRAY) {
      if (tray) {
        removeEventListener('click', checkTray, document);
        tray.destroy();
      }
      tray = new NativeTray({
        input: throttle(handleSearchInput, 500),
      });
      tray.updateOptions(info.data.data, handleRun);
      tray.show();
      addEventListener('click', checkTray, document);
    }
    if (info.data.key === Eventkey.MONSTER_SCRIPT_SEARCH_RESULT) {
      if (tray) tray.updateOptions(info.data.data, handleRun);
    }
  },
  window
);

/**
 * 开始录制mask
 */
function maskInit() {
  if (tray) {
    removeEventListener('click', checkTray, document);
    tray.destroy();
  }
  if (tool && mask) {
    if (tool.status === 1) tool.hidden();
    eventMonsterList = new EventMonsterList(window.location.href);
    mask.init(3).then(() => {
      tool && tool.show();
      initForm();
      mutationObserver(document.body, (mutationsList, observer) => {
        if (!tool) observer.disconnect();
        console.log('🔥log=>inject=>59:observer:%o', observer);
        if (tool) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((x) => {
                bindChildElenemt([x], initForm);
              });
            }
          }
        }
      });
      // addEventListener('click', startListener, document);
      addEventListener('mousedown', handleMouseDown, document);
      addEventListener('keydown', handleKeyDown, window);
      addEventListener('keyup', handleKeyUp, window);
      addEventListener('mouseup', handleMouseUp, document);
      // addEventListener('mousemove', startListener, document);
      // addEventListener('mouseover', startListener, document);
      // addEventListener('mouseleave', startListener, document);
      // addEventListener('mouseout', startListener, document);
      // addEventListener('mouseenter', startListener, document);
    });
  }
}

// 录制结束后清理
function initEvent() {
  lastRunTimeCache = undefined;
  mousedownTimeCache = undefined;
  mousdownEventeCacheElement = undefined;
  mapKeyCode = new Map();
  if (mask) mask.destroy();
  if (tool) tool.destroy();
  if (tray) tray.destroy();
  mask = undefined;
  tool = undefined;
  tray = undefined;
  clearEventListener();
}
// 缓存上次事件触发时间
let lastRunTimeCache: undefined | Date = undefined;

let mousedownTimeCache: undefined | Date = undefined;
let mousdownEventeCacheElement: undefined | Element = undefined;
// keycodemap
// 1：当前键按下后未抬起
// 0：当前建按下后抬起
let mapKeyCode = new Map();
// 开始监听
// function startListener(e: any) {
//   if (!checkNeedListener(e)) return;
//   if (!lastRunTimeCache) lastRunTimeCache = new Date();
//   const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
//   lastRunTimeCache = new Date();
//   const path = getXPath(e.target);
//   if (e.target.nodeName && e.target.nodeName === 'INPUT') return;
//   if (path) {
//     const event = new EventMonster({ xpath: path, eventType: 'CLICK', formValue: '', lastRunTime: lastRunTime });
//     eventMonsterList.push(event);
//     const record = new NativeRecord('元素触发了点击事件！', 'test-monster-record-warning');
//     record.autoClose(3000);
//   }
// }
// 鼠标按下
function handleMouseDown(e: any) {
  if (!checkNeedListener(e)) return;
  // if (e.target.nodeName && e.target.nodeName === 'INPUT') return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  mousedownTimeCache = new Date();
  lastRunTimeCache = new Date();
  const path = getXPath(e.target);
  if (path && eventMonsterList) {
    const event = new EventMonster({ xpath: path, eventType: 'MOUSE_DOWN', formValue: '', lastRunTime: lastRunTime });
    eventMonsterList.push(event);
    const record = new NativeRecord('鼠标触发了mousedown事件！', 'test-monster-record-warning');
    record.autoClose(3000);
  }
  mousdownEventeCacheElement = e.target;
}

// 鼠标抬起
function handleMouseUp(e: any) {
  if (!checkNeedListener(e)) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  if (mousedownTimeCache && mousdownEventeCacheElement) {
    const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
    const path = getXPath(e.target);
    if (path && eventMonsterList) {
      const event = new EventMonster({ xpath: path, eventType: 'MOUSE_UP', formValue: '', lastRunTime: lastRunTime });
      eventMonsterList.push(event);
      const record = new NativeRecord('鼠标触发了mouseup事件！', 'test-monster-record-warning');
      record.autoClose(3000);
    }
    if (new Date().getTime() - mousedownTimeCache.getTime() < 200) {
      // 13:enter 16:shift 18:alt 17:ctrl
      const eventConfig = {
        ctrlKey: !!mapKeyCode.get(17),
        altKey: !!mapKeyCode.get(18),
        shiftKey: !!mapKeyCode.get(16),
      };
      const clickPath = getXPath(mousdownEventeCacheElement);
      if (clickPath && eventMonsterList) {
        const mousdownEvent = new EventMonster({
          xpath: clickPath,
          eventType: 'CLICK',
          formValue: '',
          lastRunTime: lastRunTime,
          config: clonedeep(eventConfig),
        });
        // if (e.target.nodeName && e.target.nodeName === 'INPUT') return;
        eventMonsterList.push(mousdownEvent);
        const record = new NativeRecord('元素触发了CLICK事件！', 'test-monster-record-warning');
        record.autoClose(3000);
      }
    }
    lastRunTimeCache = new Date();
  }
  mousedownTimeCache = undefined;
  mousdownEventeCacheElement = undefined;
}

// 键盘按下 键盘仅监听回车键,shift，alt ctrl
function handleKeyDown(e: KeyboardEvent) {
  let keyCode = e.keyCode;
  // 13:enter 16:shift 18:alt 17:ctrl
  let keyCodeList = [13, 16, 18, 17];
  if (!keyCodeList.includes(keyCode)) return;
  if (mapKeyCode.get(keyCode) === 1) return;
  if (e.target && e.target instanceof HTMLElement && eventMonsterList) {
    const path = getXPath(e.target);
    if (!lastRunTimeCache) lastRunTimeCache = new Date();
    const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
    lastRunTimeCache = new Date();
    const event = new EventMonster({ xpath: path, eventType: 'KEY_DOWN', formValue: keyCode, lastRunTime: lastRunTime });
    eventMonsterList.push(event);
    const record = new NativeRecord('键盘触发了keydown事件！', 'test-monster-record-warning');
    record.autoClose(3000);
  }
  mapKeyCode.set(keyCode, 1);
}

// 键盘抬起 键盘仅监听回车键,shift，alt ctrl
function handleKeyUp(e: KeyboardEvent) {
  let keyCode = e.keyCode;
  // 13:enter 16:shift 18:alt 17:ctrl
  let keyCodeList = [13, 16, 18, 17];
  if (!keyCodeList.includes(keyCode)) return;
  if (mapKeyCode.get(keyCode) === 0) return;
  if (e.target && e.target instanceof HTMLElement && eventMonsterList) {
    const path = getXPath(e.target);
    if (!lastRunTimeCache) lastRunTimeCache = new Date();
    const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
    lastRunTimeCache = new Date();
    const event = new EventMonster({ xpath: path, eventType: 'KEY_UP', formValue: keyCode, lastRunTime: lastRunTime });
    eventMonsterList.push(event);
    const record = new NativeRecord('键盘触发了keyup事件！', 'test-monster-record-warning');
    record.autoClose(3000);
  }
  mapKeyCode.set(keyCode, 0);
}
// 停止记录
function handleStop() {
  console.log('🔥log=>inject=>223:handleStop:%o', 'handleStop');
  if (tool && eventMonsterList) {
    window.postMessage({ key: Eventkey.MONSTER_RECORD_STOP, eventMonsterList: eventMonsterList }, '*');
    if (eventMonsterList) eventMonsterList.clear();
    initEvent();
    eventMonsterList = undefined;
  }
}
// 初始化表单，给每个表单添加focus，change监听事件
function initForm(target?: Node | Element) {
  if (target) {
    if (target instanceof HTMLElement && !target.dataset.testMonster) {
      target.addEventListener('focus', handleFocus);
      target.addEventListener('change', handleChange);
      target.addEventListener('blur', handleBlur);
    }
  } else {
    const inputList = document.getElementsByTagName('input');
    const textareaList = document.getElementsByTagName('textarea');
    const formList = [...Array.from(inputList), ...Array.from(textareaList)];
    formList.forEach((val) => {
      if (!val.dataset.testMonster) {
        // 排除注入元素
        val.addEventListener('focus', handleFocus);
        val.addEventListener('change', handleChange);
        val.addEventListener('blur', handleBlur);
      }
    });
  }
}
// 删除表单事件监听
function uninstallForm() {
  const inputList = document.getElementsByTagName('input');
  const textareaList = document.getElementsByTagName('textarea');
  const formList = [...Array.from(inputList), ...Array.from(textareaList)];
  formList.forEach((val) => {
    val.removeEventListener('focus', handleFocus);
    val.removeEventListener('change', handleChange);
    val.removeEventListener('blur', handleBlur);
  });
}
function handleBlur(e: any) {
  const path = getXPath(e.target);
  if (!path) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  lastRunTimeCache = new Date();
  const formValue = '';
  const event = new EventMonster({ xpath: path, eventType: 'BLUR', formValue, lastRunTime: lastRunTime });
  if (eventMonsterList) eventMonsterList.push(event);
  const record = new NativeRecord(`表单触发blur事件`, 'test-monster-record-warning');
  record.autoClose(3000);
}
// 表单值修改事件
function handleChange(e: any) {
  const path = getXPath(e.target);
  let checked = undefined;
  if (!path) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  if ((e.target as HTMLInputElement).type === 'checkbox' || (e.target as HTMLInputElement).type === 'radio') {
    checked = (e.target as HTMLInputElement).checked;
  }
  const formValue = checked !== undefined ? checked : e.target.value || '';
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  lastRunTimeCache = new Date();
  const event = new EventMonster({ xpath: path, eventType: 'CHANGE', formValue, lastRunTime: lastRunTime });
  if (eventMonsterList) eventMonsterList.push(event);
  const record = new NativeRecord(`表单触发change事件（表单值：${e.target.value}）`, 'test-monster-record-warning');
  record.autoClose(3000);
}
function handleInput(e: any) {
  const path = getXPath(e.target);
  const formValue = e.target.value || '';
  if (!path) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  lastRunTimeCache = new Date();
  const event = new EventMonster({ xpath: path, eventType: 'INPUT', formValue, lastRunTime: lastRunTime });
  if (eventMonsterList) eventMonsterList.push(event);
  const record = new NativeRecord(`表单触发change事件（表单值：${e.target.value}）`, 'test-monster-record-warning');
  record.autoClose(3000);
}
// 表单聚焦事件
function handleFocus(e: any) {
  const path = getXPath(e.target);
  if (!path) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  lastRunTimeCache = new Date();
  const event = new EventMonster({ xpath: path, eventType: 'FOCUS', formValue: '', lastRunTime: lastRunTime });
  if (eventMonsterList) eventMonsterList.push(event);
  const record = new NativeRecord(`表单触发Focus事件（表单值：${e.target.value}）`, 'test-monster-record-warning');
  record.autoClose(3000);
}
//清理事件监听器
function clearEventListener() {
  removeEventListener('mousedown', handleMouseDown, document);
  removeEventListener('mouseup', handleMouseUp, window);
  removeEventListener('keydown', handleKeyDown, window);
  removeEventListener('keyup', handleKeyUp, document);
  uninstallForm();
}
//脚本检索input事件
function handleSearchInput(Event: any) {
  if (Event === 'init') {
    window.postMessage({ key: Eventkey.MONSTER_SCRIPT_SEARCH, url: window.location.href, inputValue: '' }, '*');
  } else {
    window.postMessage({ key: Eventkey.MONSTER_SCRIPT_SEARCH, url: window.location.href, inputValue: Event.target.value }, '*');
  }
}

// 脚本执行
function handleRun(item: FileOrFolder) {
  if (item.scriptType === 'SCRIPT') {
    const eventList = item.contentScript?.eventList.map((x) => {
      return {
        xpath: x.xpath,
        eventType: x.eventType,
        formValue: x.formValue,
        lastRunTime: x.lastRunTime,
        config: {
          mouseEventConfig: x.config,
        },
      };
    });
    if (eventList) {
      if (tray) {
        removeEventListener('click', checkTray, document);
        tray.destroy();
      }
      const runTool = new NativeTool(() => {
        const record = new NativeRecord('脚本执行结束！', 'test-monster-record-success');
        record.autoClose(3000);
        cancelEvent();
        runTool.destroy();
      }, '脚本执行中');
      runTool.show();
      runEventSleep(eventList, 1000, () => {
        const record = new NativeRecord('脚本执行结束！', 'test-monster-record-success');
        record.autoClose(3000);
        runTool.destroy();
      })
        .then(() => {
          window.postMessage({ key: Eventkey.MONSTER_SCREEN_SHOT }, '*');
        })
        .catch((err) => {
          const record = new NativeRecord(err, 'test-monster-record-error');
          record.autoClose(3000);
          runTool.destroy();
        });
    }
  }
}

// 检查是否需要监听
function checkNeedListener(e: any) {
  if (!tool) return false;
  if (e.target.dataset.testMonster) return false; // 排除注入元素
  if (tool.status === 0) return false; // 不需要监控
  return true;
}
// 检查托盘是否需要销毁
function checkTray(e: any) {
  if (tray && !e.target.dataset.testMonster)
    // 点击非注入元素脚本检索remove
    tray.destroy();
  removeEventListener('click', checkTray, document);
}
