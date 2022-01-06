<template>
  <el-drawer v-model="drawerVisible" :title="title" size="520" direction="rtl">
    <el-form ref="editorFormRef" size="mini" :model="formData" label-width="120px">
      <el-form-item v-if="formData.id" label="更多操作:">
        <!-- <el-button size="mini" @click="handleAdd" plain type="primary">插入前置节点</el-button>
        <el-button size="mini" @click="handleAdd" plain type="primary">插入后置节点</el-button> -->
        <el-popover v-model:visible="popoverVisible" placement="top" :width="160">
          <p>是否删除该节点?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
            <el-button size="mini" type="primary" plain @click="handleDelete">确认</el-button>
          </div>
          <template #reference>
            <el-button size="mini" @click="popoverVisible = true" plain type="danger">删除该节点</el-button>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item label="节点类型:" required>
        <el-select v-model="formData.eventType" placeholder="请选择节点类型">
          <el-option v-for="item in EventOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.eventType === 'INPUT' || formData.eventType === 'CHANGE'" label="表单值">
        <el-input placeholder="请输入表单值" v-model="formData.formValue"></el-input>
      </el-form-item>
      <el-form-item required v-if="formData.eventType === 'KEY_DOWN' || formData.eventType === 'KEY_UP'" label="KeyCode">
        <el-input placeholder="请输入KeyCode" v-model="formData.formValue"></el-input>
      </el-form-item>
      <el-form-item label="xpath" required>
        <el-input placeholder="请输入元素Xpath" v-model="formData.xpath"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSave()">保存</el-button>
        <el-button size="mini" @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, ComputedRef, computed } from 'vue';
import { EventOptions } from './../../../lib/config/event';
export default defineComponent({
  name: 'NodeEdit',
  emits: ['finish', 'delete'],
  setup(props, { emit }) {
    const drawerVisible = ref(false);
    //表单
    const editorFormRef = ref<null | ComputedRef>(null);
    const title = computed(() => {
      return formData.value.id ? '编辑节点' : '新建节点';
    });
    const show = (item: any) => {
      if (item) {
        formData.value.id = item.id;
        formData.value.xpath = item.xpath;
        formData.value.formValue = item.formValue;
        formData.value.eventType = item.eventType;
      }
      drawerVisible.value = true;
    };
    const handleAdd = () => {
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
      formData.value.id = undefined;
      formData.value.xpath = undefined;
      formData.value.formValue = undefined;
      formData.value.eventType = undefined;
    };
    const popoverVisible = ref(false);
    const handleDelete = () => {
      emit('delete', formData.value.id);
      resetForm();
      popoverVisible.value = false;
    };
    const formData = ref({
      id: undefined,
      eventType: undefined,
      formValue: undefined,
      xpath: undefined,
      lastRunTime: 1000,
    });
    return {
      drawerVisible,
      EventOptions,
      editorFormRef,
      formData,
      popoverVisible,
      title,
      handleAdd,
      handleDelete,
      show,
      resetForm,
      handleSave,
    };
  },
});
</script>
<style lang="less" scoped></style>
