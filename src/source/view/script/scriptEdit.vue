<template>
  <div v-height class="script-edit">
    <div class="edit-opreate">
      <el-button size="mini" @click="handleAdd" type="primary">新建节点</el-button>
      <el-button size="mini" @click="handleEdit" type="primary">配置节点</el-button>
      <el-button size="mini" @click="handleBack">返回</el-button>
    </div>
    <div v-if="stepEvent" class="edit-view">
      <div class="step-warper">
        <el-steps :space="200" :active="stepEvent.eventList.length + 2" align-center>
          <el-step status="success" title="开始">
            <template #icon>
              <IconSvg name="week-fuwuleixing"></IconSvg>
            </template>
          </el-step>
          <el-step @click="handleClick(item)" v-for="item in stepEvent.eventList" :key="item.xpath" :title="item.eventType">
            <template #icon>
              <IconSvg :name="getIcon(item.eventType)?.icon"></IconSvg>
            </template>
            <template #description>
              {{ getIcon(item.eventType)?.desc }}
            </template>
          </el-step>
          <el-step status="success" title="结束">
            <template #icon>
              <IconSvg name="week-pin-outline"></IconSvg>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
    <el-drawer v-model="drawerVisible" title="编辑节点" direction="rtl">
      <el-form ref="editorFormRef" :model="formData" label-width="120px" class="demo-ruleForm">
        <el-form-item label="节点类型:" required>
          <el-select v-model="formData.eventType" placeholder="请选择节点类型">
            <el-option label="点击元素" value="CLICK"> </el-option>
            <el-option label="聚焦表单" value="FOCUS"> </el-option>
            <el-option label="表单赋值" value="INPUT"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.eventType === 'INPUT'" label="表单值">
          <el-input placeholder="请输入表单值" v-model="formData.formValue"></el-input>
        </el-form-item>
        <el-form-item label="xpath" required>
          <el-input placeholder="请输入元素Xpath" v-model="formData.xpath"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSave()">保存</el-button>
          <el-button size="mini" @click="handleDelete" plain type="danger">删除</el-button>
          <el-button size="mini" @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, ComputedRef } from 'vue';
import { useStore } from './../../store/script';
import { useRoute, useRouter } from 'vue-router';
import { EventMonsterList } from '../../../libs/history';
import { ElMessage } from 'element-plus';
import { UUID } from '../../../libs/utils';
export default defineComponent({
  name: 'scriptEdit',
  components: {},
  setup() {
    //表单
    const editorFormRef = ref<null | ComputedRef>(null);

    const drawerVisible = ref(false);
    const { folderStoreModule } = useStore();
    const route = useRoute();
    const router = useRouter();
    const stepEvent = ref<EventMonsterList | undefined>(undefined);

    const formData = ref({
      id: undefined,
      eventType: undefined,
      formValue: undefined,
      xpath: undefined,
    });
    const init = (id: string) => {
      const script = folderStoreModule.action.getFloder(id);
      if (script && script.contentScript && script.contentScript.eventList.length > 0) {
        stepEvent.value = script.contentScript;
      }
    };
    const getIcon = (type: string) => {
      if (type === 'CLICK')
        return {
          icon: 'week-fenxiang',
          desc: '点击元素',
        };
      if (type === 'FOCUS')
        return {
          icon: 'week-dingwei',
          desc: '聚焦表单',
        };
      if (type === 'INPUT')
        return {
          icon: 'week-zhongmingming',
          desc: '表单赋值',
        };
    };
    const handleBack = () => {
      router.back();
    };
    const handleAdd = () => {
      drawerVisible.value = true;
    };
    const handleSave = () => {
      if (!editorFormRef.value) return;
      editorFormRef.value.validate((valid: boolean) => {
        if (!valid && route.query.id) return false;
        if (formData.value.id) {
          stepEvent.value?.eventList.forEach((x) => {
            if (x.id === formData.value.id) {
              if (formData.value.eventType) x.eventType = formData.value.eventType;
              if (formData.value.formValue) x.formValue = formData.value.formValue;
              if (formData.value.xpath) x.xpath = formData.value.xpath;
            }
          });
        } else {
          stepEvent.value?.eventList.push({
            id: UUID(),
            eventType: formData.value.eventType || 'CLICK',
            formValue: formData.value.formValue || '',
            xpath: formData.value.xpath || '',
          });
        }
        folderStoreModule.action.updateFloder(route.query.id as string, [{ key: 'contentScript', value: stepEvent.value }]);
        init(route.query.id as string);
        resetForm();
        ElMessage.success('节点已经修改');
      });
    };
    const handleClick = (item: any) => {
      formData.value.id = item.id;
      formData.value.xpath = item.xpath;
      formData.value.formValue = item.formValue;
      formData.value.eventType = item.eventType;
      drawerVisible.value = true;
    };

    const resetForm = () => {
      drawerVisible.value = false;
      formData.value.id = undefined;
      formData.value.xpath = undefined;
      formData.value.formValue = undefined;
      formData.value.eventType = undefined;
    };
    const handleDelete = () => {
      if (stepEvent.value) {
        for (let i = 0; i < stepEvent.value.eventList.length; i++) {
          if (stepEvent.value.eventList[i].id === formData.value.id) {
            stepEvent.value.eventList.splice(i, 1);
            i--;
          }
        }
        folderStoreModule.action.updateFloder(route.query.id as string, [{ key: 'contentScript', value: stepEvent.value }]);
        init(route.query.id as string);
        resetForm();
        ElMessage.success('节点已删除');
      }
    };

    const handleEdit = () => {};
    onMounted(() => {
      if (!route.query.id) {
        router.back();
      } else {
        init(route.query.id as string);
      }
    });
    return {
      editorFormRef,
      drawerVisible,
      stepEvent,
      formData,
      getIcon,
      handleBack,
      handleSave,
      handleClick,
      resetForm,
      handleDelete,
      handleAdd,
      handleEdit,
    };
  },
});
</script>
<style lang="less" scoped>
.script-edit {
  width: 100%;
  box-sizing: border-box;
  .edit-opreate {
    padding: 10px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  .edit-view {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 50px;
    width: 100%;
    height: calc(100% - 50px);
    .step-warper {
      width: 100%;
      max-width: 1400px;
      &:deep(.el-step__icon) {
        cursor: pointer;
      }
      &:deep(.el-step__title) {
        cursor: pointer;
      }
      &:deep(.el-step__description) {
        cursor: pointer;
      }
    }
  }
}
</style>
