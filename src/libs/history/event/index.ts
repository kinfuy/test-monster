import { dispatchEventHandler, getELementXpath, UUID, sleep } from './../../utils/util';
import { IEventType } from './../../types';
import { NativeRecord } from './../view';
export class EventMonster {
  id = UUID();
  xpath = '';
  formValue = '';
  eventType: IEventType = 'CLICK';
  lastRunTime = 1000;
  config = {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
  };
  constructor({
    xpath,
    eventType,
    formValue,
    lastRunTime,
    config,
  }: {
    xpath: string;
    eventType: IEventType;
    formValue: any;
    lastRunTime: number;
    config?: { ctrlKey: boolean; altKey: boolean; shiftKey: boolean };
  }) {
    this.xpath = xpath;
    this.eventType = eventType;
    this.formValue = formValue;
    this.lastRunTime = lastRunTime;
    if (config) this.config = config;
  }
}
export class EventMonsterList {
  id = UUID();
  url = '';
  constructor(url: string) {
    this.url = url;
  }
  eventList: Array<EventMonster> = [];
  push(node: EventMonster) {
    return this.eventList.push(node);
  }
  pop() {
    return this.eventList.shift();
  }
  peck() {
    return this.eventList[0];
  }
  size() {
    return this.eventList.length;
  }
  isEmpty() {
    return this.eventList.length === 0 ? true : false;
  }
  clear() {
    this.eventList = [];
  }
}
export const runEvent = (
  xpath: string,
  eventType: IEventType,
  formValue: any,
  config?: {
    mouseEventConfig: {
      ctrlKey: boolean;
      altKey: boolean;
      shiftKey: boolean;
    };
  }
): Promise<boolean | string> => {
  return new Promise((resolve, reject) => {
    try {
      const el = getELementXpath(xpath);
      if (!el) throw new Error(`${xpath}的元素没有找到`);
      if (eventType === 'CLICK') {
        dispatchEventHandler('click', el as Element, { mouseEventConfig: config?.mouseEventConfig });
      }
      if (eventType === 'MOUSE_DOWN') {
        dispatchEventHandler('mousedown', el as Element);
      }
      if (eventType === 'MOUSE_UP') {
        dispatchEventHandler('mouseup', el as Element);
      }
      if (eventType === 'INPUT') {
        if ((el as HTMLInputElement).type === 'checkbox' || (el as HTMLInputElement).type === 'radio') {
          (el as HTMLInputElement).checked = formValue;
          (el as HTMLInputElement).value = formValue ? 'on' : '';
        } else {
          (el as HTMLInputElement).value = formValue;
        }
        dispatchEventHandler('input', el as HTMLInputElement);
      }
      if (eventType === 'CHANGE') {
        if ((el as HTMLInputElement).type === 'checkbox' || (el as HTMLInputElement).type === 'radio') {
          (el as HTMLInputElement).checked = formValue;
          (el as HTMLInputElement).value = formValue ? 'on' : '';
        } else {
          (el as HTMLInputElement).value = formValue;
        }
        dispatchEventHandler('input', el as HTMLInputElement);
        dispatchEventHandler('change', el as HTMLInputElement);
      }
      if (eventType === 'FOCUS') {
        dispatchEventHandler('focus', el as Element);
      }
      if (eventType === 'BLUR') {
        dispatchEventHandler('blur', el as HTMLInputElement);
      }
      if (eventType === 'KEY_DOWN') {
        const { key, code } = getKeyCode(Number(formValue));
        const config = { keyboardConfig: { key, code, keyCode: formValue } };
        dispatchEventHandler('keydown', el as Element, config);
      }
      if (eventType === 'KEY_UP') {
        const { key, code } = getKeyCode(Number(formValue));
        const config = { keyboardConfig: { key, code, keyCode: formValue } };
        dispatchEventHandler('keyup', el as Element, config);
      }
      resolve(true);
    } catch (error) {
      if (eventType === 'BLUR' || 'MOUSE_UP') {
        // 元素失焦,鼠标抬起不影响整体流程，某些元素可以会因为鼠标点击，元素remove，导致失去焦点找不到元素
        resolve(true);
      } else {
        const record = new NativeRecord(`${eventType}事件触发失败`, 'test-monster-record-error');
        record.autoClose(5000);
        reject('事件触发失败！');
      }
    }
  });
};

// 事件取消钩子
let cancelKey = false;
/**
 *  事件执行
 * @param list
 * @param sleepTime 事件延迟时间
 * @param callback
 * @returns
 */
export const runEventSleep = async (
  list: Array<{
    xpath: string;
    eventType: IEventType;
    formValue: any;
    lastRunTime: number;
    config: {
      mouseEventConfig: {
        ctrlKey: boolean;
        altKey: boolean;
        shiftKey: boolean;
      };
    };
  }>,
  sleepTime: number,
  callback: Function
) => {
  cancelKey = false;
  for (let i = 0; i < list.length; i++) {
    if (cancelKey) return;
    try {
      await sleep(list[i].lastRunTime || sleepTime);
      await runEvent(list[i].xpath, list[i].eventType, list[i].formValue, { mouseEventConfig: list[i].config.mouseEventConfig });
    } catch (error) {
      throw error;
    }
  }
  callback();
};
/**
 * 取消执行事件
 */
export const cancelEvent = () => {
  cancelKey = true;
};
/**
 * 获取keycode code key
 * @param formValue keycode
 * @returns
 */
function getKeyCode(formValue: number) {
  let key = '';
  let code = '';
  if (formValue === 13) {
    key = 'Enter';
    code = 'Enter';
  }
  if (formValue === 16) {
    key = 'Shift';
    code = 'ShiftLeft';
  }
  if (formValue === 18) {
    key = 'Alt';
    code = 'AltLeft';
  }
  if (formValue === 17) {
    key = 'Control';
    code = 'ControlLeft';
  }
  return { key, code };
}
