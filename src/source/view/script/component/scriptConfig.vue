<template>
  <el-drawer v-model="drawerVisible" size="520" title="脚本配置" direction="rtl">
    <el-form ref="editorFormRef" size="mini" :model="formData" label-width="120px">
      <el-form-item label="url" required>
        <el-input placeholder="请输入url" v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSave()">保存</el-button>
        <el-button size="mini" @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, ComputedRef } from 'vue';
export default defineComponent({
  name: 'ScriptConfig',
  setup(props, { emit }) {
    const drawerVisible = ref(false);
    const editorFormRef = ref<null | ComputedRef>(null);
    const formData = ref({
      id: undefined,
      url: undefined,
      eventList: [],
    });
    const show = (item: any) => {
      if (item) {
        formData.value.id = item.id;
        formData.value.eventList = item.eventList;
        formData.value.url = item.url;
      }
      drawerVisible.value = true;
    };
    const handleSave = () => {
      if (!editorFormRef.value) return;
      editorFormRef.value.validate((valid: boolean) => {
        if (valid) {
          emit('finish', formData.value);
          resetForm();
        }
      });
    };
    const resetForm = () => {
      drawerVisible.value = false;
    };
    return {
      drawerVisible,
      formData,
      handleSave,
      resetForm,
      editorFormRef,
      show,
    };
  },
});
</script>
<style lang="less" scoped></style>
