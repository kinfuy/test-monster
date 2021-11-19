interface LooseObject {
  [key: string]: any;
}
/**
 * 获取store
 */
export const getStoreKey = <T>(keys: Array<string>): Promise<T> => {
  return new Promise((resolve, reject) => {
    let store: LooseObject = {};
    keys.forEach((x) => {
      store[x] = null;
    });
    try {
      chrome.storage.local.get(store, (rst) => {
        resolve(rst as T);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 设置store
 */
export const setStore = (store: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(store, () => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const clearStore = (): void => {
  chrome.storage.local.clear();
};
