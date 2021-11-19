export type IEventType = 'CLICK' | 'FORM_INPUT';
export type OperateStatus = 'SUCCESS' | 'FAIL' | 'WAIT';
// 操作记录
export interface IOperateRecord {
  id: string;
  eventType: IEventType;
  xPath: string;
  formValue?: any;
  status: OperateStatus;
  run: (callBack: Function) => void | Error;
}

export type IOperateSet = Map<string, IOperateRecord>;
