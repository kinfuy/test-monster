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
import { defineComponent, ref } from 'vue';
import BreadCrumb from './../../components/common/breadcrumb.vue';

import FolderContent from './component/FolderContent.vue';
export default defineComponent({
  name: 'ScriptBase',
  components: { BreadCrumb, FolderContent },
  setup() {
    const virtualCrumb = ref([
      {
        name: '脚本',
        active: true,
      },
    ]);

    const handleClick = (data: any) => {
      console.log(data);
    };
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
