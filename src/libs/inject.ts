// 该文件会注入到目标网站
import { NativeMask, NativeTool, NativeRecord, NativeTray } from './history/view';
import { EventMonsterList, EventMonster, runEventSleep, cancelEvent } from './history';
import { addEventListener, removeEventListener, getXPath, mutationObserver } from './utils';
import { Eventkey } from './utils/const';
import throttle from 'lodash.throttle';
import { FileOrFolder } from '../source/store/script';
import { PositioningElement, bindChildElenemt } from '../libs/utils/element';
let mask: NativeMask;
let tool: NativeTool;
let tray: NativeTray;
let eventMonsterList: EventMonsterList;
let Observer: MutationObserver | undefined;
addEventListener(
  'message',
  (info: any) => {
    if (info.data.key === Eventkey.MONSTER_RECORD_INIT) {
      mask = new NativeMask();
      tool = new NativeTool(handleStop);
      maskInit();
    }
    if (info.data.key === Eventkey.MONSTER_SCRIPT_TRAY) {
      tray = new NativeTray({
        input: throttle(handleInput, 500),
      });
      tray.show();
    }
    if (info.data.key === Eventkey.MONSTER_SCRIPT_SEARCH_RESULT) {
      tray.updateOptions(info.data.data, handleRun, handleVerify);
    }
  },
  window
);

/**
 * 开始录制mask
 */
function maskInit() {
  if (tool && mask) {
    if (tool.status === 1) tool.hidden();
    eventMonsterList = new EventMonsterList(window.location.href);
    mask.init(3).then(() => {
      tool && tool.show();
      initForm();
      mutationObserver(document.body, (mutationsList, observer) => {
        Observer = observer;
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((x) => {
              bindChildElenemt([x], initForm);
            });
          }
        }
      });
      addEventListener('click', startListener, document);
    });
  }
}

// 缓存上次事件触发时间
let lastRunTimeCache: undefined | Date = undefined;
// 开始监听
function startListener(e: any) {
  if (tool) {
    if (e.target.dataset.testMonster) return; // 排除注入元素
    if (tool.status === 0) return; // 不需要监控
    if (!lastRunTimeCache) lastRunTimeCache = new Date();
    const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
    lastRunTimeCache = new Date();
    const path = getXPath(e.target);
    if (e.target.nodeName && e.target.nodeName === 'INPUT') return;
    if (path) {
      const event = new EventMonster({ xpath: path, eventType: 'CLICK', formValue: '', lastRunTime: lastRunTime });
      eventMonsterList.push(event);
      const record = new NativeRecord('元素触发了点击事件！', 'test-monster-record-warning');
      record.autoClose(5000);
    }
  }
}
// 停止记录
function handleStop() {
  if (tool) {
    window.postMessage({ key: Eventkey.MONSTER_RECORD_STOP, eventMonsterList: eventMonsterList }, '*');
    clearEventListener();
    tool.hidden();
    eventMonsterList.clear();
    if (Observer) {
      Observer.disconnect();
      Observer = undefined;
    }
  }
}
// 初始化表单，给每个表单添加focus，change监听事件
function initForm(target?: Node | Element) {
  if (target) {
    target.addEventListener('focus', handleFocus);
    target.addEventListener('change', handleChange);
  } else {
    const inputList = document.getElementsByTagName('input');
    const textareaList = document.getElementsByTagName('textarea');
    const formList = [...Array.from(inputList), ...Array.from(textareaList)];
    formList.forEach((val) => {
      val.addEventListener('focus', handleFocus);
      val.addEventListener('change', handleChange);
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
  });
}
// 表单值修改事件
function handleChange(e: any) {
  const path = getXPath(e.target);
  const formValue = e.target.value || '';
  if (!path) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  lastRunTimeCache = new Date();
  const event = new EventMonster({ xpath: path, eventType: 'INPUT', formValue, lastRunTime: lastRunTime });
  eventMonsterList.push(event);
  const record = new NativeRecord(`表单触发change事件（表单值：${e.target.value}）`, 'test-monster-record-warning');
  record.autoClose(5000);
}
// 表单聚焦事件
function handleFocus(e: any) {
  const path = getXPath(e.target);
  if (!path) return;
  if (!lastRunTimeCache) lastRunTimeCache = new Date();
  const lastRunTime = new Date().getTime() - lastRunTimeCache.getTime();
  lastRunTimeCache = new Date();
  const event = new EventMonster({ xpath: path, eventType: 'FOCUS', formValue: '', lastRunTime: lastRunTime });
  eventMonsterList.push(event);
  const record = new NativeRecord(`表单触发Focus事件（表单值：${e.target.value}）`, 'test-monster-record-warning');
  record.autoClose(5000);
}
//清理事件监听器
function clearEventListener() {
  removeEventListener('click', startListener);
  uninstallForm();
}
//脚本检索input事件
function handleInput(Event: any) {
  window.postMessage({ key: Eventkey.MONSTER_SCRIPT_SEARCH, url: window.location.href, inputValue: Event.target.value }, '*');
}

// 脚本执行
function handleRun(item: FileOrFolder) {
  const eventList = item.contentScript?.eventList.map((x) => {
    return {
      xpath: x.xpath,
      eventType: x.eventType,
      formValue: x.formValue,
      lastRunTime: x.lastRunTime,
    };
  });
  if (eventList) {
    tray.destroy();
    const tool = new NativeTool(() => {
      const record = new NativeRecord('脚本执行结束！', 'test-monster-record-success');
      record.autoClose(3000);
      cancelEvent();
      tool.destroy();
    }, '脚本执行中');
    tool.show();
    runEventSleep(
      eventList,
      1000,
      () => {
        const record = new NativeRecord('脚本执行结束！', 'test-monster-record-success');
        record.autoClose(3000);
        tool.destroy();
      },
      item.contentScript?.loop
    )
      .then(() => {
        window.postMessage({ key: Eventkey.MONSTER_SCREEN_SHOT }, '*');
      })
      .catch((err) => {
        const record = new NativeRecord(err, 'test-monster-record-error');
        record.autoClose(3000);
        tool.destroy();
      });
  }
}
// 脚本验证
function handleVerify(item: FileOrFolder) {}
