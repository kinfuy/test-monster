import { dispatchEventHandler, getELementXpath, UUID } from './../../utils/util';
export type IEventType = 'CLICK' | 'INPUT' | 'FOCUS';

export type FormType = 'INPUT' | 'TEXTAREA';

export class EventMonster {
  xpath = '';
  formValue = '';
  eventType: IEventType = 'CLICK';
  constructor({ xpath, eventType, formValue }: { xpath: string; eventType: IEventType; formValue?: any }) {
    this.xpath = xpath;
    this.eventType = eventType;
    formValue && (this.formValue = formValue);
  }
  run(): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      try {
        const el = getELementXpath(this.xpath);
        if (this.eventType === 'CLICK') {
          dispatchEventHandler('click', el as Element);
        }
        if (this.eventType === 'INPUT') {
          (el as HTMLInputElement).value = this.formValue;
          dispatchEventHandler('input', el as HTMLInputElement);
        }
        if (this.eventType === 'FOCUS') {
          dispatchEventHandler('focus', el as Element);
        }
        resolve(true);
      } catch (error) {
        reject('事件触发失败！');
      }
    });
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
