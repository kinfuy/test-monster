import { FileOrFolder } from '../../store/script';
import { folderStore } from '../../store/script/module/folder';
import clonedeep from 'lodash.clonedeep';
interface WindowSize {
  height: number;
  width: number;
}
/**
 * @ description 获取屏幕高度和宽度
 */
export const getWindowSize = (): WindowSize => {
  const height = document.documentElement.clientHeight || document.body.clientHeight;
  const width = document.documentElement.clientWidth || document.body.clientWidth;
  return {
    height,
    width,
  };
};
// 生成uuid
export const UUID = (): string => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};
/**
 * 复制建树
 * @param id
 * @param floderList
 */
export const buildCopyTree = (id: string, floderList: Array<FileOrFolder>) => {
  let target = floderList.filter((x) => x.id === id)[0];
  const copyId = UUID();
  target.childs = getChild(copyId, clonedeep(target), floderList);
  target.id = copyId;
  target.parentId = folderStore.value.currentID;
  target.level = folderStore.value.currentLevel;
  return target as ChildReLationShip;
};

export const flatTree = (floderList: ChildReLationShip) => {
  debugger;
  let target = clonedeep(floderList);
  const rst = [] as Array<FileOrFolder>;
  if (floderList.childs.length > 0) {
    rst.push(...flatChild(target.childs));
  }
  const temp = clonedeep(target);
  delete (temp as FileOrFolder).childs;
  rst.push(temp as FileOrFolder);
  return rst;
};
interface ChildReLationShip extends FileOrFolder {
  childs: Array<ChildReLationShip>;
}
function getChild(copyId: string, target: FileOrFolder, floderList: Array<FileOrFolder>) {
  const child = floderList.filter((x) => x.parentId === target.id);
  if (child.length > 0) {
    child.forEach((l) => {
      const newId = UUID();
      l.childs = getChild(newId, clonedeep(l), floderList);
      l.id = newId;
      l.level = target.level + 1;
      l.parentId = copyId;
    });
  }
  return child as Array<ChildReLationShip>;
}

function flatChild(list: Array<ChildReLationShip>) {
  let rst = [] as Array<FileOrFolder>;
  list.forEach((x) => {
    let target = clonedeep(x);
    if (target.childs.length > 0) {
      rst.push(...flatChild(target.childs));
    }
    const temp = clonedeep(target);
    delete (temp as FileOrFolder).childs;
    rst.push(temp as FileOrFolder);
  });
  return rst;
}
