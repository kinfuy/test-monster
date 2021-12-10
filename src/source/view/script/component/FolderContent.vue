<template>
  <div class="folder-content" @click="closeContextMenu()" @contextmenu="createContextMenu($event)">
    <folder-or-file
      v-for="item in folderList"
      :key="item.id"
      :draggable="true"
      :icon="item.icon"
      :cutting="item.cutting"
      :fileTitle="item.name"
      :contenteditable="item.contenteditable"
      @contextmenu.stop="handleContextmenu($event, item)"
      @dblclick="handleDblclick(item)"
      @blur="handleBlur($event, item)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useContextMenu } from './../../../hooks/useContextMenu';
import { useStore, FileOrFolder } from './../../../store/script';
import FolderOrFile from './../../../components/FolderOrFile/FolderOrFile.vue';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'FolderContent',
  components: { FolderOrFile },
  setup() {
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
          ElMessage.success('粘贴成功');
        }
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
          console.log(code);
          if (code === 'EDIT') {
            folderStoreModule.action.updateFloder(item.id, [{ key: 'contenteditable', value: true }]);
          }
          if (code === 'OPEN') {
            if (item.type === 'floder') {
              folderStoreModule.action.updateCurrent(item.id, item.level + 1);
              folderStoreModule.action.createCrumb(item.id, item.name, item.level + 1);
            } else {
              ElMessage.error('无法打开该文件');
            }
          }
          if (code === 'COPY') {
            clipboardStoreModule.action.updateCurrectClipboard(item.id, item.type, item);
            ElMessage.success('复制成功');
          }
          if (code === 'CUT') {
            folderStoreModule.action.updateFloder(item.id, [{ key: 'cutting', value: true }]);
            clipboardStoreModule.action.updateCurrectClipboard(item.id, item.type, item);
          }
          closeContextMenu();
        },
      });
      createContextMenu(e);
    };
    const handleDblclick = (item: FileOrFolder) => {
      if (item.type === 'floder') {
        folderStoreModule.action.updateCurrent(item.id, item.level + 1);
        folderStoreModule.action.createCrumb(item.id, item.name, item.level + 1);
      } else {
        ElMessage.error('无法打开该文件');
      }
    };
    return {
      folderList,
      createContextMenu,
      closeContextMenu,
      handleContextmenu,
      handleBlur,
      handleDblclick,
    };
  },
});
</script>
<style lang="less" scoped>
.folder-content {
  height: 100%;
}
</style>
