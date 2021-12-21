import { dispatchEventHandler, getELementXpath, UUID, sleep } from './../../utils/util';
import { IEventType } from './../../types';
import { NativeRecord } from './../view';
export class EventMonster {
  id = UUID();
  xpath = '';
  formValue = '';
  eventType: IEventType = 'CLICK';
  lastRunTime = 1000;
  constructor({ xpath, eventType, formValue, lastRunTime }: { xpath: string; eventType: IEventType; formValue: any; lastRunTime: number }) {
    this.xpath = xpath;
    this.eventType = eventType;
    this.formValue = formValue;
    this.lastRunTime = lastRunTime;
  }
}
export class EventMonsterList {
  id = UUID();
  url = '';
  loop = 1;
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
export const runEvent = (xpath: string, eventType: IEventType, formValue: any): Promise<boolean | string> => {
  return new Promise((resolve, reject) => {
    try {
      const el = getELementXpath(xpath);
      if (!el) throw new Error(`${xpath}的元素没有找到`);
      if (eventType === 'CLICK') {
        dispatchEventHandler('click', el as Element);
      }
      if (eventType === 'INPUT') {
        (el as HTMLInputElement).value = formValue;
        dispatchEventHandler('input', el as HTMLInputElement);
        // dispatchEventHandler('blur', el as HTMLInputElement);
      }
      if (eventType === 'FOCUS') {
        dispatchEventHandler('click', el as Element);
        dispatchEventHandler('focus', el as Element);
      }
      resolve(true);
    } catch (error) {
      const record = new NativeRecord(`事件触发失败:${error}`, 'test-monster-record-error');
      record.autoClose(5000);
      reject('事件触发失败！');
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
 * @param loop 循环次数
 * @returns
 */
export const runEventSleep = async (
  list: Array<{ xpath: string; eventType: IEventType; formValue: any; lastRunTime: number }>,
  sleepTime: number,
  callback: Function,
  loop: number = 1
) => {
  cancelKey = false;
  let count = 1;
  while (count <= loop) {
    for (let i = 0; i < list.length; i++) {
      if (cancelKey) return;
      try {
        await sleep(list[i].lastRunTime || sleepTime);
        await runEvent(list[i].xpath, list[i].eventType, list[i].formValue);
      } catch (error) {
        throw error;
      }
    }
    count++;
  }
  callback();
};
/**
 * 取消执行事件
 */
export const cancelEvent = () => {
  cancelKey = true;
};
