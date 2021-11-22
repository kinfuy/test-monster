// 该文件会注入到目标网站
import { NativeMask, NativeTool } from './history/view';
import { addEventListener } from './utils';
const mask = new NativeMask();
const tool = new NativeTool(handleStop);
addEventListener(
  'message',
  (info: any) => {
    if (info.data.key === 'MONSTER_CONTENT_RECORD') maskInit();
  },
  window
);

/**
 * 开始录制mask
 */
function maskInit() {
  if (tool.status === 1) tool.hidden();
  mask.init(5).then(() => {
    tool.show();
  });
}
function handleStop() {
  tool.hidden();
}
