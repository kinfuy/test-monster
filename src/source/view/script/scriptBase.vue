<template>
  <div class="script-base" @click="closeContextMenu()" @contextmenu="createContextMenu($event)">
    <bread-crumb></bread-crumb>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BreadCrumb from './../../components/common/breadcrumb.vue';
import { useContextMenu } from './../../hooks/useContextMenu';
export default defineComponent({
  name: 'ScriptBase',
  components: { BreadCrumb },
  setup() {
    const { createContextMenu, closeContextMenu } = useContextMenu({
      click: (code) => {
        console.log(code);
      },
    });
    return {
      createContextMenu,
      closeContextMenu,
    };
  },
});
</script>
<style lang="less" scoped>
.script-base {
  padding: 10px;
  height: 100%;
}
</style>
