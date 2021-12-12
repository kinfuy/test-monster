import { ContextMenu, ContextMenuInstance, Menuitem } from '../components/contextMenu';
import { useStore } from '../store/script';
import { getContextMenu } from '../lib/config/contextMenu';
import { computed } from 'vue';
interface ContextMenuParam {
  menuConfig?: Array<string>;
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
    let menu: Array<string> = [];
    if (options?.menuConfig) menu = [...options.menuConfig];
    const { clipboardStoreModule } = useStore();
    const menuList = computed(() => {
      if (clipboardStoreModule.store.currect && !menu.includes('folder') && !menu.includes('file')) {
        menu.push('paste');
      }
      return menu;
    });
    if (instence) closeContextMenu();
    instence = ContextMenu({ menuConfig: getContextMenu(menuList.value), onClick: options?.click }, { top: e.clientY, left: e.clientX });
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
