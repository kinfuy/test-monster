import { dispatchEventHandler, getELementXpath, UUID } from './../../utils/util';
import { IEventType } from './../../types';
export class EventMonster {
  id = UUID();
  xpath = '';
  formValue = '';
  eventType: IEventType = 'CLICK';
  constructor({ xpath, eventType, formValue }: { xpath: string; eventType: IEventType; formValue?: any }) {
    this.xpath = xpath;
    this.eventType = eventType;
    formValue && (this.formValue = formValue);
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
export const runEvent = (xpath: string, eventType: IEventType, formValue: any): Promise<boolean | string> => {
  return new Promise((resolve, reject) => {
    try {
      const el = getELementXpath(xpath);
      if (eventType === 'CLICK') {
        dispatchEventHandler('click', el as Element);
      }
      if (eventType === 'INPUT') {
        (el as HTMLInputElement).value = formValue;
        dispatchEventHandler('input', el as HTMLInputElement);
      }
      if (eventType === 'FOCUS') {
        dispatchEventHandler('click', el as Element);
        dispatchEventHandler('focus', el as Element);
      }
      resolve(true);
    } catch (error) {
      reject('事件触发失败！');
    }
  });
};
