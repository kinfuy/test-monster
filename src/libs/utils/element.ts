import { getXPath } from './index';
export const PositioningElement = (Element: Element) => {
  console.log([Element]);
  console.log(getXPath(Element));
};
// 遍历子元素
export const bindChildElenemt = (target: Array<Element> | NodeListOf<ChildNode> | Array<Node>, handleBind: Function) => {
  let nodeElem = target;
  nodeElem.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA')) {
      handleBind(node);
    }
    if (node.childNodes.length > 0) {
      bindChildElenemt(node.childNodes, handleBind);
    }
  });
};
