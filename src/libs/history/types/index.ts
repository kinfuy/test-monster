/** 条件 */
export type Conditions = () => Promise<boolean>;
export interface Operate {
  // 点击元素
  clickElement?: () => void;
  // 触发事件
  dispatchEvent?: () => void;
}
export type HistoryEvent = 'CLICK' | 'FORM_CLICK' | 'FORM_INPUT' | 'MOUSE_CLICK_MOVE' | 'CONTEXT_MENU';
// 操作记录历史
export interface HistoryRecord {
  preconditions?: Conditions;
  xpath: string;
  triggerEvent: HistoryEvent;
  formValue?: any;
  opearte: Operate;
}
