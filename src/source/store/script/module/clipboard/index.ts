import { createAction } from './action';
const action = createAction();
interface ClipboardStoreModule {
  namespace: string;
  store: Readonly<ClipboardStore>;
  action: typeof action;
}
interface CopyObject {
  id: string;
  type: 'file' | 'floder';
  content: any;
}
interface ClipboardStore {
  currect: CopyObject | undefined;
  history: CopyObject[];
}
import { readonly, Ref, ref } from 'vue';
export const clipboardStore: Ref<ClipboardStore> = ref({
  history: [],
  currect: undefined,
});
const clipboardStoreModule: ClipboardStoreModule = {
  namespace: 'clipboardStore',
  store: readonly(clipboardStore.value) as Readonly<ClipboardStore>,
  action: action,
};
export default clipboardStoreModule;
