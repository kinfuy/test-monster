interface FolderStoreModule {
  namespace: string;
  store: Readonly<FolderStore>;
  action: FolderAction;
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
  size?: Number;
  parentId: string | null;
}
export interface FolderStore {
  flieList: Array<FileOrFolder>;
  currentLevel: number;
  currentID: null | string;
}

import { readonly, Ref, ref } from 'vue';
import { createFolder, updateFloder, sortFloder, FolderAction } from './action';
export const folderStore: Ref<FolderStore> = ref({
  currentLevel: 0,
  currentID: null,
  flieList: [],
});
const folderStoreModule: FolderStoreModule = {
  namespace: 'FolderStore',
  store: readonly(folderStore.value) as Readonly<FolderStore>,
  action: { createFolder, updateFloder, sortFloder },
};
export default folderStoreModule;
