import folderStoreModule from './module/folder';
export { FileOrFolder } from './module/folder';
export const useStore = () => {
  return {
    [folderStoreModule.namespace]: {
      store: folderStoreModule.store,
      action: folderStoreModule.action,
    },
  };
};
