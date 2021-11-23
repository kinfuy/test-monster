export type IEventType = 'CLICK' | 'FORM_INPUT';
export type OperateStatus = 'RUNED' | 'WAIT';
// 操作记录
export interface IOperateRecord {
  id: string;
  eventType: IEventType;
  xPath: string;
  formValue?: any;
  status: OperateStatus;
  run?: (callBack: Function) => void;
}

export type IOperateSet = Map<string, IOperateRecord>;

export interface NativeUI {
  status: number;
  example: undefined | HTMLDivElement;
  show: () => void;
  hidden: () => void;
  destroy: () => void;
}
export class NativeBase implements NativeUI {
  display = 'block';
  status = 0;
  example: HTMLDivElement | undefined = undefined;
  constructor(className: string, display: string, target?: Element) {
    const base = document.createElement('div');
    base.className = className;
    base.dataset.testMonster = 'true'; // 给注入的元素打上标记
    this.display = display;
    this.example = base;
    target ? target.appendChild(this.example) : document.body.appendChild(this.example);
  }
  show() {
    if (this.example) {
      this.example.style.display = this.display;
      this.status = 1;
    }
  }
  hidden() {
    if (this.example) {
      this.example.style.display = 'none';
      this.status = 0;
    }
  }
  destroy() {
    if (this.example) document.body.removeChild(this.example);
    this.example = undefined;
    this.status = 0;
  }
}
