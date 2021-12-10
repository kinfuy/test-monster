<template>
  <div class="script-base">
    <div class="bread-crumb">
      <bread-crumb :virtual-crumb="virtualCrumb" @click="handleClick"></bread-crumb>
    </div>
    <div class="folder-content-warper">
      <folder-content />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onUnmounted } from 'vue';
import BreadCrumb from './../../components/common/breadcrumb.vue';
import { useStore, Breadcrumb } from './../../store/script';
import FolderContent from './component/FolderContent.vue';
export default defineComponent({
  name: 'ScriptBase',
  components: { BreadCrumb, FolderContent },
  setup() {
    const { folderStoreModule } = useStore();
    const virtualCrumb = computed(() => {
      return folderStoreModule.store.virtualCrumb;
    });
    const handleClick = (data: Breadcrumb) => {
      folderStoreModule.action.goCrumb(data.id);
      folderStoreModule.action.updateCurrent(data.id, data.level);
    };
    onUnmounted(() => {
      folderStoreModule.action.updateCurrent('script_uuid', 0);
      folderStoreModule.action.goCrumb('script_uuid');
    });

    return {
      virtualCrumb,
      handleClick,
    };
  },
});
</script>
<style lang="less" scoped>
.script-base {
  padding: 10px;
  height: 100%;
  .bread-crumb {
    padding: 0 10px;
  }
  .folder-content-warper {
    height: calc(100% - 50px);
    width: 100%;
  }
}
</style>
