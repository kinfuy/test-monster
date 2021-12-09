import { UUID } from './../../../../lib/utils';
import { folderStore } from './index';
export const createFolder = ({ type, name, icon }: { type: 'file' | 'floder'; name: string; icon?: string }) => {
  folderStore.value.flieList.push({
    id: UUID(),
    type: type,
    name: name,
    icon: icon ? icon : getIcon(type),
    contenteditable: true,
    createTime: new Date(),
    updateTime: new Date(),
    level: folderStore.value.currentLevel,
    parentId: folderStore.value.currentID,
  });
};
/**
 * 更新文件（夹）消息
 * @param id
 * @param key 需更新key
 * @param value
 */
export const updateFloder = (id: string, key: string, value: any) => {
  folderStore.value.flieList.forEach((x) => {
    if (x.id === id) {
      x[key] = value;
    }
  });
};

export const sortFloder = (sortType: 'time' | 'type' | 'name') => {
  folderStore.value.flieList = folderStore.value.flieList.sort((a, b) => {
    if (sortType === 'name') return a.name.localeCompare(b.name);
    if (sortType === 'time') return a.createTime.getTime() - b.createTime.getTime();
    if (sortType === 'type') return a.name.localeCompare(b.name);
    return 1;
  });
};
const action = {
  updateFloder,
  createFolder,
  sortFloder,
};
export type FolderAction = typeof action;
function getIcon(type: string) {
  if (type === 'file') return 'week-daimaxiang';
  if (type === 'floder') return 'week-wenjianjia';
  return '';
}
