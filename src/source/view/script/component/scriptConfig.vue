<template>
  <el-drawer v-model="drawerVisible" title="脚本配置" direction="rtl"> </el-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ScriptConfig',
  setup() {
    const drawerVisible = ref(false);
    const show = () => {
      drawerVisible.value = true;
    };
    return {
      drawerVisible,
      show,
    };
  },
});
</script>
<style lang="less" scoped></style>
