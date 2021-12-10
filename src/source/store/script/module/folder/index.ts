interface FolderStoreModule {
  namespace: string;
  store: Readonly<FolderStore>;
  action: typeof action;
}
export interface Breadcrumb {
  id: string;
  name: string;
  level: number;
  active?: boolean;
  disabled?: boolean;
}
export interface FileOrFolder extends Record<string, any> {
  id: string;
  type: 'file' | 'floder';
  icon: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  contenteditable: boolean;
  level: number;
  disabled: boolean;
  cutting: boolean;
  size?: Number;
  parentId: string | null;
}
export interface FolderStore {
  flieList: Array<FileOrFolder>;
  currentLevel: number;
  currentID: null | string;
  virtualCrumb: Array<Breadcrumb>;
}

import { readonly, Ref, ref } from 'vue';
import { createAction } from './action';
export const folderStore: Ref<FolderStore> = ref({
  currentLevel: 0,
  currentID: 'script_uuid',
  flieList: [],
  virtualCrumb: [
    {
      id: 'script_uuid',
      level: 0,
      name: '脚本',
      active: true,
      disabled: false,
    },
  ],
});
const action = createAction();
const folderStoreModule: FolderStoreModule = {
  namespace: 'folderStore',
  store: readonly(folderStore.value) as Readonly<FolderStore>,
  action: action,
};
export default folderStoreModule;
