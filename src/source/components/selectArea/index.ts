import { createVNode, render } from 'vue';
import SelectAreaConstructor from './SelectArea.vue';
let instence: HTMLElement | undefined;
const SelectArea = function (options: any) {
  if (instence) {
    document.body.removeChild(instence);
    instence = undefined;
  }
  const vm = createVNode(SelectAreaConstructor, options);
  const container = document.createElement('div');
  render(vm, container);
  instence = container.firstElementChild as HTMLElement;
  document.body.appendChild(instence);
  return instence;
};

const close = () => {
  if (instence) {
    document.body.removeChild(instence);
    instence = undefined;
  }
};
export { SelectArea, close };
