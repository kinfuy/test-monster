import { ContextMenu, ContextMenuInstance } from '../components/contextMenu';

import { getContextMenu } from '../lib/config/contextMenu';
interface ContextMenuParam {
  click?: (code: any) => void;
}
let instence: ContextMenuInstance | undefined = undefined;
export const useContextMenu = (options?: ContextMenuParam) => {
  const createContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (instence) closeContextMenu();
    const option = {
      menuConfig: getContextMenu('empty'),
      onClick: options?.click,
    };
    instence = ContextMenu(option, {
      top: e.clientY,
      left: e.clientX,
    });
  };
  const closeContextMenu = () => {
    if (instence) {
      document.body.removeChild(instence.$el);
      instence = undefined;
    }
  };
  return {
    createContextMenu,
    closeContextMenu,
  };
};
