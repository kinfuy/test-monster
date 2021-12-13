import { UUID, buildCopyTree, flatTree, getChildID } from './../../../../lib/utils';
import { folderStore } from './index';
import { unref } from 'vue';
import clonedeep from 'lodash.clonedeep';
/**
 * 创建文件
 * @param param
 */
const createFolder = ({ type, name, icon }: { type: 'file' | 'floder'; name: string; icon?: string }) => {
  folderStore.value.flieList.push({
    id: UUID(),
    type: type,
    name: name,
    icon: icon ? icon : getIcon(type),
    contenteditable: true,
    disabled: false,
    createTime: new Date(),
    updateTime: new Date(),
    level: unref(folderStore.value.currentLevel),
    parentId: unref(folderStore.value.currentID),
  });
};
/**
 * 更新文件（夹）消息
 * @param id
 * @param key 需更新key (id type name icon contenteditable createTime updateTime level parentId)
 * @param value
 */
const updateFloder = (id: string, info: Array<{ key: string; value: any }>) => {
  folderStore.value.flieList.forEach((x) => {
    info.forEach((s) => {
      if (x.id === id) {
        x[s.key] = s.value;
        x.updateTime = new Date();
      }
    });
  });
};
/**
 * 更新排序
 * @param sortType time type name
 */
const sortFloder = (sortType: 'time' | 'type' | 'name') => {
  folderStore.value.flieList = folderStore.value.flieList.sort((a, b) => {
    if (sortType === 'name') return a.name.localeCompare(b.name);
    if (sortType === 'time') return a.createTime.getTime() - b.createTime.getTime();
    if (sortType === 'type') return -a.type.localeCompare(b.type);
    return 1;
  });
};
/**
 * 复制文件
 * @param id
 */
const copyFloder = (id: string) => {
  const list = buildCopyTree(id, clonedeep(folderStore.value.flieList));
  const copyList = flatTree(list);
  folderStore.value.flieList.push(...copyList);
};
/**
 * 剪切文件
 * @param id
 */
const cutFloder = async (id: string) => {
  await copyFloder(id);
  await deleteFloder(id);
};
/**
 * 删除文件
 * @param id
 */
const deleteFloder = (id: string) => {
  const rst = [id, ...getChildID(id, clonedeep(folderStore.value.flieList))];
  for (let i = 0; i < folderStore.value.flieList.length; i++) {
    if (rst.includes(folderStore.value.flieList[i].id)) {
      folderStore.value.flieList.splice(i, 1);
      i--;
    }
  }
};
/**
 * 更新当前层级
 * @param currentID 当前ID
 * @param currentLevel 当前层级
 */
const updateCurrent = (currentID: string, currentLevel: number) => {
  folderStore.value.currentID = currentID;
  folderStore.value.currentLevel = currentLevel;
};

/**
 * 创建虚拟目录
 * @param id
 * @param name
 * @param options
 */
const createCrumb = (id: string, name: string, level: number, options?: { disabled: boolean; active: boolean }) => {
  folderStore.value.virtualCrumb.push({
    id: id,
    name: name,
    level: level,
    disabled: options?.disabled || false,
    active: options?.active || false,
  });
};
/**
 *
 * @param id 跳转id
 */
const goCrumb = (id: string) => {
  let findKey = false;
  folderStore.value.virtualCrumb = folderStore.value.virtualCrumb.filter((x) => {
    if (x.id === id) {
      findKey = true;
      return true;
    }
    if (x.id !== id && !findKey) {
      return true;
    }
    return false;
  });
};

export const createAction = () => {
  return {
    updateFloder,
    createFolder,
    sortFloder,
    updateCurrent,
    createCrumb,
    goCrumb,
    copyFloder,
    cutFloder,
    deleteFloder,
  };
};
function getIcon(type: string) {
  if (type === 'file') return 'week-daimaxiang';
  if (type === 'floder') return 'week-wenjianjia';
  return '';
}
