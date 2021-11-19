import { OperateStatus, IOperateRecord, IEventType } from './types';
import { createRandomCode } from './../utils/util';
class OperateRecord {
  id: string = '';
  eventType: IEventType = 'CLICK';
  xPath: string = '';
  formValue?: any = '';
  status: OperateStatus = 'WAIT';
  constructor() {}
  run(callBack: Function) {
    if (this.status === 'WAIT') {
      callBack();
    }
  }
}
export default OperateRecord;
