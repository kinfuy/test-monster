export type IConditions = () => Promise<boolean>;
export interface IOperate {
  // 点击元素
  clickElement?: () => void;
  // 触发事件
  dispatchEvent?: () => void;
}
export type IEventType = 'CLICK' | 'FORM_INPUT';
// 操作记录
export interface IOperateRecord {
  id: string;
  preconditions?: IConditions;
  xPath: string;
  eventType: IEventType;
  formValue?: any;
  opearte: IOperate;
}

export type IOperateSet = Map<string, IOperateRecord>;
