<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>home</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ArrowRight } from '@element-plus/icons';
export default defineComponent({
  name: 'BreadCrumb',
  setup() {
    return {
      ArrowRight,
    };
  },
});
</script>
<style lang="less" scoped></style>
