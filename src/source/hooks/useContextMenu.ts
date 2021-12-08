import { ContextMenu, ContextMenuInstance, Menuitem } from '../components/contextMenu';
interface ContextMenuParam {
  menuConfig?: Array<Menuitem>;
  click?: (code: any) => void;
}
let instence: ContextMenuInstance | undefined = undefined;
/**
 *
 * @param options
 * @returns
 */
export const useContextMenu = (options?: ContextMenuParam) => {
  const createContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (instence) closeContextMenu();
    instence = ContextMenu({ menuConfig: options?.menuConfig || [], onClick: options?.click }, { top: e.clientY, left: e.clientX });
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
