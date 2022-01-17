import { ref, Ref, readonly } from 'vue';
import throttle from 'lodash.throttle';
export interface DragKeyList {
  dragStartKey: string | undefined;
  dragOverKey: string | undefined;
  dragEndKey: string | undefined;
  dragStartParams?: any;
  dragOverParams?: any;
  dragDropParams?: any;
}
export interface UseDragParams {
  afterDragStart?: (e: DragEvent) => void;
  afterDragEnter?: (e: DragEvent, dragKeyList: Readonly<Ref<DragKeyList>>) => void;
  afterDragOver?: (e: DragEvent, dragKeyList: Readonly<Ref<DragKeyList>>) => void;
  afterDragLeave?: (e: DragEvent, dragKeyList: Readonly<Ref<DragKeyList>>) => void;
  afterDragEnd?: (e: DragEvent, dragKeyList: Readonly<Ref<DragKeyList>>) => void;
  afterDrop?: (e: DragEvent, dragKeyList: Readonly<Ref<DragKeyList>>) => void;
}
export const useDrag = ({ afterDragStart, afterDragEnter, afterDragOver, afterDragLeave, afterDragEnd, afterDrop }: UseDragParams) => {
  const dragKeys = ref<DragKeyList>({
    dragStartKey: undefined,
    dragOverKey: undefined,
    dragEndKey: undefined,
    dragStartParams: undefined, //开始拖拽附加参数
    dragOverParams: undefined, // over 附加参数
    dragDropParams: undefined,
  });

  let dragElenmt: HTMLElement | undefined = undefined; // 被拖拽元素
  let dragCloneElenmt: HTMLElement | undefined = undefined; // 被克隆元素
  let clickElement = { x: 0, y: 0 }; // 拖拽元素点击位置

  const clearDrag = () => {
    if (dragElenmt) dragElenmt.style.opacity = '1';
    if (dragCloneElenmt) {
      document.body.removeChild(dragCloneElenmt);
      dragCloneElenmt = undefined;
    }
    dragKeys.value.dragStartKey = undefined;
    dragKeys.value.dragOverKey = undefined;
    dragKeys.value.dragEndKey = undefined;
    dragKeys.value.dragStartParams = undefined;
    dragKeys.value.dragOverParams = undefined;
    dragKeys.value.dragDropParams = undefined;
    window.removeEventListener('dragover', bindDragOver);
    window.removeEventListener('dragend', bindDragOver);
  };
  const bindDragOver = (e: any) => {
    if (dragCloneElenmt) {
      // 修改跟随样式
      dragCloneElenmt.style.position = 'fixed';
      dragCloneElenmt.style.top = e.clientY - clickElement.y + 'px';
      dragCloneElenmt.style.left = e.clientX - clickElement.x + 'px';
      dragCloneElenmt.style.zIndex = '999';
      dragCloneElenmt.style.pointerEvents = 'none';
    }
  };
  const onDragStart = (e: DragEvent, key: string, appendParam?: any) => {
    if (e.dataTransfer) clearDefaultImage(e.dataTransfer);
    if (key && e.target && e.target instanceof HTMLElement) {
      dragCloneElenmt = document.createElement('div');
      dragCloneElenmt.style.width = window.getComputedStyle(e.target).width;
      dragCloneElenmt.style.height = window.getComputedStyle(e.target).height;
      const { left, top } = e.target.getBoundingClientRect();
      clickElement.x = e.clientX - left;
      clickElement.y = e.clientY - top;
      dragCloneElenmt.appendChild(e.target.cloneNode(true) as HTMLElement);
      document.body.appendChild(dragCloneElenmt);
      dragKeys.value.dragStartKey = key;

      e.target.style.opacity = '0.5';
      dragElenmt = e.target;
      window.addEventListener('dragover', bindDragOver, { capture: true });
      window.addEventListener('dragend', clearDrag, { capture: true });

      if (afterDragStart) afterDragStart(e);
      if (appendParam) dragKeys.value.dragStartParams = appendParam;
    }
  };
  const onDragEnter = (e: DragEvent) => {
    pauseEvent(e);
    if (afterDragEnter) afterDragEnter(e, readonly(dragKeys));
  };
  const onDragLeave = (e: DragEvent) => {
    pauseEvent(e);
    if (afterDragLeave) afterDragLeave(e, readonly(dragKeys));
  };
  const onDragOver = (e: DragEvent, key: string, appendParam?: any) => {
    pauseEvent(e);
    dragKeys.value.dragOverKey = key;
    if (afterDragOver) afterDragOver(e, readonly(dragKeys));
    if (appendParam) dragKeys.value.dragOverParams = appendParam;
  };
  const onDragEnd = (e: DragEvent, key: string) => {
    dragKeys.value.dragEndKey = key;
    pauseEvent(e);
    if (afterDragEnd) afterDragEnd(e, readonly(dragKeys));
    clearDrag();
  };
  // 阻止事件冒泡
  const pauseEvent = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onDrop = (e: DragEvent, key: string, appendParam?: any) => {
    dragKeys.value.dragEndKey = key;
    if (appendParam) dragKeys.value.dragDropParams = appendParam;
    if (afterDrop) afterDrop(e, readonly(dragKeys));
    clearDrag();
  };
  return {
    dragKeys: readonly(dragKeys),
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop,
  };
};

function clearDefaultImage(dataTransfer: DataTransfer) {
  var img = new Image();
  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
  dataTransfer.setDragImage(img, 0, 0);
}
