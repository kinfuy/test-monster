import { createVNode, render } from 'vue';
import ContextMenuConstructor from './ContextMenu.vue';
import { getWindowSize } from './../../lib/utils/index';
import { defaultConfig } from './config';
import { PositionType, ContextMenuConfigType } from './contextMenuType';
let instence: HTMLElement | undefined;
/**
 *
 * @param propsData 传递给组件props
 * @param position 组件位置
 * @returns instence 当前实例
 */
const ContextMenu = function (propsData: any, position: PositionType, config?: ContextMenuConfigType) {
  if (instence) {
    document.body.removeChild(instence);
    instence = undefined;
  }
  const vm = createVNode(ContextMenuConstructor, propsData);
  const container = document.createElement('div');
  render(vm, container);
  instence = container.firstElementChild as HTMLElement;
  instence.style.position = 'absolute';
  const { width, height } = getWindowSize();
  const compatibleHeight = config?.height || defaultConfig.height;
  const compatibleWidth = config?.width || defaultConfig.width;
  if (position.top + compatibleHeight > height) {
    position.top -= compatibleHeight;
  }
  if (position.left + compatibleWidth > width) {
    position.left -= compatibleWidth;
  }
  instence.style.top = position.top + 'px';
  instence.style.left = position.left + 'px';
  document.body.appendChild(instence);
  return instence;
};
const close = () => {
  if (instence) {
    document.body.removeChild(instence);
    instence = undefined;
  }
};

export { ContextMenu, close };
