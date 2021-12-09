<template>
  <div class="folder-content" @click="closeContextMenu()" @contextmenu="createContextMenu($event)">
    <folder-or-file
      v-for="item in folderList"
      :key="item.id"
      :draggable="true"
      :icon="item.icon"
      :fileTitle="item.name"
      :contenteditable="item.contenteditable"
      @contextmenu.stop="handleContextmenu($event, item)"
      @blur="handleBlur($event, item)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useContextMenu } from './../../../hooks/useContextMenu';
import { getContextMenu } from './../../../lib/config/contextMenu';
import { useStore, FileOrFolder } from './../../../store/script';
import FolderOrFile from './../../../components/FolderOrFile/FolderOrFile.vue';
import folderStoreModule from '../../../store/script/module/folder';
export default defineComponent({
  name: 'FolderContent',
  components: { FolderOrFile },
  setup() {
    const { FolderStore } = useStore();
    const folderList = computed(() => {
      return FolderStore.store.flieList.filter(
        (x) => x.level == FolderStore.store.currentLevel && x.parentId == FolderStore.store.currentID
      );
    });
    const { createContextMenu, closeContextMenu } = useContextMenu({
      menuConfig: getContextMenu(['script']),
      click: (code) => {
        if (code === 'CREATE_SCRIPT') {
          FolderStore.action.createFolder({
            type: 'file',
            name: '新建脚本',
          });
        }
        if (code === 'CREATE_GROUP') {
          FolderStore.action.createFolder({
            type: 'floder',
            name: '新建分组',
          });
        }
        if (code === 'SORT_NAME') FolderStore.action.sortFloder('name');
        if (code === 'SORT_TIME') FolderStore.action.sortFloder('time');
        if (code === 'SORT_TYPE') FolderStore.action.sortFloder('type');
        closeContextMenu();
      },
    });
    const handleBlur = (data: any, item: FileOrFolder) => {
      folderStoreModule.action.updateFloder(item.id, 'name', data.value);
    };
    const handleContextmenu = (e: MouseEvent, item: FileOrFolder) => {
      const { createContextMenu, closeContextMenu } = useContextMenu({
        menuConfig: getContextMenu(['folder']),
        click: (code) => {
          if (code === 'EDIT') {
            folderStoreModule.action.updateFloder(item.id, 'contenteditable', true);
          }
          closeContextMenu();
        },
      });
      createContextMenu(e);
    };
    return {
      folderList,
      createContextMenu,
      closeContextMenu,
      handleContextmenu,
      handleBlur,
    };
  },
});
</script>
<style lang="less" scoped>
.folder-content {
  height: 100%;
}
</style>
