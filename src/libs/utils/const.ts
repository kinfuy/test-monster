/**
 * 事件key
 */
export const Eventkey = {
  /**开始记录 */
  MONSTER_RECORD_INIT: 'monster_record_init',
  /**停止记录 */
  MONSTER_RECORD_STOP: 'monster_record_stop',
  /** 事件执行 */
  MONSTER_EVENTS_RUN: 'monster_events_run',
  /** 脚本托盘 */
  MONSTER_SCRIPT_TRAY: 'monster_script_tray',
  /** 脚本检索 */
  MONSTER_SCRIPT_SEARCH: 'monster_script_search',
  /** 脚本检索结果 */
  MONSTER_SCRIPT_SEARCH_RESULT: 'monster_script_search_result',
  /** 脚本截图 */
  MONSTER_SCREEN_SHOT: 'monster_screen_shot',
  /** 定时任务*/
  MONSTER_TIMWER_TASK: 'monster_timer_task',
};

export const ScriptType = [
  {
    key: 'SCRIPT',
    value: '脚本',
  },
  {
    key: 'TASK',
    value: '任务',
  },
  {
    key: 'SCRIPT_SET',
    value: '脚本集',
  },
  {
    key: 'TASK_SET',
    value: '任务集',
  },
];
