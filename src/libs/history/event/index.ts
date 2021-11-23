import { dispatchEventHandler, getELementXpath } from './../../utils/util';
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
  list: Array<EventMonster> = [];
  push(node: EventMonster) {
    return this.list.push(node);
  }
  pop() {
    return this.list.shift();
  }
  peck() {
    return this.list[0];
  }
  size() {
    return this.list.length;
  }
  isEmpty() {
    return this.list.length === 0 ? true : false;
  }
  clear() {
    this.list = [];
  }
}
