import { createApp, h } from 'vue';
import SelectAreaConstructor from './SelectArea.vue';
import { SelectAreaInstance, SelectAreaProps } from './selectArea.type';
/**
 *
 * @param props 传递给组件props
 * @returns instence 当前实例
 */
export const SelectArea = function (props: SelectAreaProps) {
  const vm = document.createElement('div');
  const app = createApp({
    render() {
      return h(SelectAreaConstructor, {
        ref: 'selectAreaRef',
        ...props,
      });
    },
  });
  const instance = app.mount(vm);
  const SelectAreaInstance = instance.$refs.selectAreaRef as SelectAreaInstance;
  document.body.appendChild(SelectAreaInstance.$el);
  return SelectAreaInstance;
};
