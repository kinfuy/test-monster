/**
 *
 * 获取该元素下可以被选中的元素集合
 * @param parentElement 父元素
 * @param keyCode 可选元素标识
 * @returns
 */
const getChildrens = function (parentElement: HTMLElement, keyCode: string) {
  const ary = [];
  const childs = parentElement.childNodes;
  for (let i = 0; i < childs.length; i++) {
    if (childs[i].nodeType === 1) {
      if ((childs[i] as HTMLElement).getAttribute(keyCode) !== null) {
        ary.push(childs[i]);
      }
    }
  }
  return ary as Array<HTMLElement>;
};
/**
 * @description 判断元素是否在选区内
 * @param {HTMLElement} selectBoxElement 选区元素
 * @param {Array<HTMLElement>} canCheckedElements 可选中元素列表
 * @return {Array<HTMLElement>} 包含元素列表
 */
const judgeContainElement = function (selectBoxElement: HTMLElement, canCheckedElements: Array<HTMLElement>): Array<HTMLElement> {
  const ContainElement: Array<HTMLElement> = [];
  const { left, right, bottom, top } = selectBoxElement.getBoundingClientRect();
  canCheckedElements.forEach((item) => {
    const child = item.getBoundingClientRect();
    if (child.left > left && child.top > top && child.bottom < bottom && child.right < right) {
      ContainElement.push(item);
    }
  });
  return ContainElement;
};

/**
 * 获取该元素下可以被选中的元素集合
 * @param parentElement 父元素
 * @param selectBoxElement 选择框元素
 * @param keyCode 可选元素标识
 * @returns
 */
const selectElement = function (parentElement: HTMLElement, selectBoxElement: HTMLElement, keyCode: string) {
  if (keyCode) {
  }
  const canCheckedElements = getChildrens(parentElement, keyCode);
  const containElements = judgeContainElement(selectBoxElement, canCheckedElements);
  return {
    containElements,
    canCheckedElements,
  };
};
export { selectElement };
