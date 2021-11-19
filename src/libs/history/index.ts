import { HistoryRecord } from './types/index';
class OperateHistory {
  private historyRecordList: Map<string, HistoryRecord> = new Map();
  // 执行指定记录
  async runOperate(id?: string) {
    if (id) {
      const operate = this.historyRecordList.get(id);
      if (operate) {
        if (operate.preconditions && (await operate.preconditions())) {
          operate.opearte.dispatchEvent && operate.opearte.dispatchEvent();
          operate.opearte.clickElement && operate.opearte.clickElement();
        }
      }
    } else {
      this.historyRecordList.forEach((x) => {
        console.log(x);
        x.opearte.dispatchEvent && x.opearte.dispatchEvent();
        x.opearte.clickElement && x.opearte.clickElement();
      });
    }
  }
  addOperate(operateId: string, history: HistoryRecord) {
    this.historyRecordList.set(operateId, history);
  }
  deleteOperate() {}
}
export default OperateHistory;
