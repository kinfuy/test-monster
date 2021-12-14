<template>
  <div class="folder-content" @click="closeContextMenu()" @contextmenu="createContextMenu($event)">
    <folder-or-file
      v-for="item in folderList"
      :key="item.id"
      :draggable="true"
      :icon="item.icon"
      :type="item.type"
      :cutting="getCutting(item.id)"
      :fileTitle="item.name"
      :contenteditable="item.contenteditable"
      @contextmenu.stop="handleContextmenu($event, item)"
      @dblclick="handleDblclick(item)"
      @blur="handleBlur($event, item)"
      @dragstart="handleDragStart($event, item.id)"
      @dragover="handleDragOver($event, item.id)"
      @dragleave="handleDragLeave($event, item.id)"
      @drag="handleDrag($event, item.id)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useContextMenu } from './../../../hooks/useContextMenu';
import { useStore, FileOrFolder } from './../../../store/script';
import FolderOrFile from './../../../components/FolderOrFile/FolderOrFile.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'FolderContent',
  components: { FolderOrFile },
  setup() {
    const router = useRouter();
    const { folderStoreModule, clipboardStoreModule } = useStore();
    const folderList = computed(() => {
      return folderStoreModule.store.flieList.filter(
        (x) => x.level == folderStoreModule.store.currentLevel && x.parentId == folderStoreModule.store.currentID
      );
    });
    const { createContextMenu, closeContextMenu } = useContextMenu({
      menuConfig: ['script'],
      click: (code) => {
        if (code === 'CREATE_SCRIPT') {
          folderStoreModule.action.createFolder({ type: 'file', name: '新建脚本' });
        }
        if (code === 'CREATE_GROUP') {
          folderStoreModule.action.createFolder({ type: 'floder', name: '新建分组' });
        }
        if (code === 'SORT_NAME') folderStoreModule.action.sortFloder('name');
        if (code === 'SORT_TIME') folderStoreModule.action.sortFloder('time');
        if (code === 'SORT_TYPE') folderStoreModule.action.sortFloder('type');
        if (code === 'PASTE') {
          const copyId = clipboardStoreModule.store.currect?.id;
          const type = clipboardStoreModule.store.currect?.type;
          if (type === 'copy' && copyId) folderStoreModule.action.copyFloder(copyId);
          if (type === 'cut' && copyId) folderStoreModule.action.cutFloder(copyId);
          ElMessage.success(`${type === 'copy' ? '粘贴' : '剪切'}成功`);
        }
        clipboardStoreModule.action.clearCurrectClipboard();
        closeContextMenu();
      },
    });
    const handleBlur = (data: any, item: FileOrFolder) => {
      folderStoreModule.action.updateFloder(item.id, [
        { key: 'name', value: data.value },
        { key: 'contenteditable', value: false },
      ]);
    };
    const handleContextmenu = (e: MouseEvent, item: FileOrFolder) => {
      const { createContextMenu, closeContextMenu } = useContextMenu({
        menuConfig: ['folder'],
        click: (code) => {
          clipboardStoreModule.action.clearCurrectClipboard();
          if (code === 'EDIT') {
            folderStoreModule.action.updateFloder(item.id, [{ key: 'contenteditable', value: true }]);
          }
          if (code === 'OPEN') {
            handleDblclick(item);
          }
          if (code === 'COPY') {
            clipboardStoreModule.action.updateCurrectClipboard(item.id, 'copy', item);
            ElMessage.success('复制成功');
          }
          if (code === 'CUT') {
            folderStoreModule.action.updateFloder(item.id, [{ key: 'cutting', value: true }]);
            clipboardStoreModule.action.updateCurrectClipboard(item.id, 'cut', item);
          }
          if (code === 'DELETE') {
            folderStoreModule.action.deleteFloder(item.id);
            ElMessage.success('删除成功');
          }
          closeContextMenu();
        },
      });
      createContextMenu(e);
    };
    const handleDblclick = (item: FileOrFolder) => {
      if (clipboardStoreModule.store.currect?.id === item.id && clipboardStoreModule.store.currect?.type === 'cut') {
        ElMessage.error('该文件已经被锁定');
        return;
      }
      if (item.type === 'floder') {
        folderStoreModule.action.updateCurrent(item.id, item.level + 1);
        folderStoreModule.action.createCrumb(item.id, item.name, item.level + 1);
      } else {
        router.push({ name: 'scriptFlow', query: { id: item.id } });
      }
    };
    const getCutting = computed(() => {
      return (id: string) => {
        return (
          clipboardStoreModule.store.currect &&
          clipboardStoreModule.store.currect.id === id &&
          clipboardStoreModule.store.currect.type === 'cut'
        );
      };
    });

    const dragID = ref<undefined | string>(undefined);
    const handleDragStart = (event: DragEvent, id: string) => {
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
      dragID.value = id;
    };
    const handleDragOver = (event: DragEvent, id: string) => {
      event.preventDefault();
      if (event && event.target instanceof HTMLElement && event.target.dataset.drag === 'drag') {
        if (id !== dragID.value) {
          event.target.style.backgroundColor = '#faecd8';
        } else {
          if (event.dataTransfer) event.dataTransfer.dropEffect = 'none';
        }
      } else {
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'none';
      }
    };
    const handleDragLeave = (event: DragEvent, id: string) => {
      if (event && event.target instanceof HTMLElement && event.target.dataset.drag === 'drag') {
        event.target.style.backgroundColor = 'inherit';
      }
    };
    const handleDrag = (event: DragEvent, id: string) => {
      if (event && event.target instanceof HTMLElement && event.target.dataset.drag === 'drag') {
        const target = folderStoreModule.action.getFloder(id);
        if (target && dragID.value) {
          folderStoreModule.action.updateFloder(dragID.value, [{ key: 'cutting', value: true }]);
          clipboardStoreModule.action.updateCurrectClipboard(dragID.value, 'cut', target);

          folderStoreModule.action.cutFloder(dragID.value, target.id, target.level + 1);
          ElMessage.success(`移动成功`);
        }
      }
    };
    return {
      folderList,
      getCutting,
      createContextMenu,
      closeContextMenu,
      handleContextmenu,
      handleBlur,
      handleDblclick,
      handleDragStart,
      handleDragLeave,
      handleDragOver,
      handleDrag,
    };
  },
});
</script>
<style lang="less" scoped>
.folder-content {
  height: 100%;
}
</style>
