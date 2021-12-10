import folderStoreModule from './module/folder';
import clipboardStoreModule from './module/clipboard';
export { FileOrFolder, Breadcrumb } from './module/folder';
export const useStore = () => {
  return {
    folderStoreModule,
    clipboardStoreModule,
  };
};
