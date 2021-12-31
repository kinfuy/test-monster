<template>
  <div v-height class="script-edit">
    <div class="edit-opreate">
      <el-button size="mini" :disabled="!stepEvent" @click="handleAdd" type="primary">新建节点</el-button>
      <el-button size="mini" @click="handleEdit" type="primary">配置脚本</el-button>
      <el-button size="mini" @click="handleBack">返回</el-button>
    </div>
    <div v-if="stepEvent" class="edit-view">
      <div class="step-warper">
        <el-steps direction="vertical" :space="60" :active="stepEvent.eventList.length + 2" align-center>
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
    <script-config ref="scriptConfigRef" @finish="handleFinish"></script-config>
    <node-edit ref="nodeEditRef" @finish="handleFinish" @delete="handleDelete"></node-edit>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, ComputedRef } from 'vue';
import { useStore } from './../../store/script';
import { useRoute, useRouter } from 'vue-router';
import { EventMonsterList } from '../../../libs/history';
import { ElMessage } from 'element-plus';
import NodeEdit from './component/nodeEdit.vue';
import ScriptConfig from './component/scriptConfig.vue';
import { IEventType } from '../../../libs/types';
import { UUID } from '../../../libs/utils';
import clonedeep from 'lodash.clonedeep';
export default defineComponent({
  name: 'scriptEdit',
  components: { NodeEdit, ScriptConfig },
  setup() {
    //表单
    const nodeEditRef = ref<null | ComputedRef>(null);
    const scriptConfigRef = ref<null | ComputedRef>(null);
    const drawerVisible = ref(false);
    const { folderStoreModule } = useStore();

    const route = useRoute();
    const router = useRouter();
    const stepEvent = ref<EventMonsterList | undefined>(undefined);

    const init = (id: string) => {
      folderStoreModule.action.initFolderModule().then(() => {
        const script = folderStoreModule.action.getFloder(id);
        if (script && script.contentScript && script.contentScript.eventList.length > 0) {
          stepEvent.value = script.contentScript || [];
        }
      });
    };
    const handleBack = () => {
      router.back();
    };
    const handleAdd = () => {
      if (stepEvent.value) {
        drawerVisible.value = true;
      } else {
        ElMessage.success('请先配置脚本消息');
        return;
      }
    };
    const handleClick = (item: any) => {
      if (nodeEditRef.value) nodeEditRef.value.show(item);
    };
    const getIcon = (type: IEventType) => {
      if (type === 'CLICK')
        return {
          icon: 'week-fenxiang',
          desc: '元素点击',
        };
      if (type === 'FOCUS')
        return {
          icon: 'week-dingwei',
          desc: '表单聚焦',
        };
      if (type === 'INPUT')
        return {
          icon: 'week-wenben2',
          desc: '表单赋值',
        };
      if (type === 'CHANGE')
        return {
          icon: 'week-zhongmingming',
          desc: '表单赋值',
        };
      if (type === 'BLUR')
        return {
          icon: 'week-fullscreen',
          desc: '表单失焦',
        };
      if (type === 'KEY_DOWN')
        return {
          icon: 'week--jianpan',
          desc: 'Enter按下',
        };
      if (type === 'KEY_UP')
        return {
          icon: 'week--jianpan',
          desc: 'Enter抬起',
        };
      if (type === 'MOUSE_DOWN')
        return {
          icon: 'week-shubiao',
          desc: '鼠标按下',
        };
      if (type === 'MOUSE_UP')
        return {
          icon: 'week-shubiao',
          desc: '鼠标抬起',
        };
    };
    const handleFinish = (formData: any) => {
      if (formData.id) {
        stepEvent.value?.eventList.forEach((x) => {
          if (x.id === formData.id) {
            if (formData.eventType) x.eventType = formData.eventType;
            if (formData.formValue) x.formValue = formData.formValue;
            if (formData.xpath) x.xpath = formData.xpath;
          }
        });
      } else {
        stepEvent.value?.eventList.push({
          id: UUID(),
          eventType: formData.eventType || 'CLICK',
          formValue: formData.formValue || '',
          xpath: formData.xpath || '',
          lastRunTime: formData.lastRunTime,
        });
      }
      folderStoreModule.action.updateFloder(route.query.id as string, [{ key: 'contentScript', value: clonedeep(stepEvent.value) }]);
      ElMessage.success('节点已修改');
      init(route.query.id as string);
    };
    const handleEdit = () => {
      if (scriptConfigRef.value) scriptConfigRef.value.show();
    };
    const handleDelete = (id: string) => {
      if (stepEvent.value) {
        for (let i = 0; i < stepEvent.value.eventList.length; i++) {
          if (stepEvent.value.eventList[i].id === id) {
            stepEvent.value.eventList.splice(i, 1);
            i--;
          }
        }
        folderStoreModule.action.updateFloder(route.query.id as string, [{ key: 'contentScript', value: stepEvent.value }]);
        ElMessage.success('节点已删除');
      }
    };
    onMounted(() => {
      if (!route.query.id) {
        router.back();
      } else {
        init(route.query.id as string);
      }
    });
    return {
      stepEvent,
      nodeEditRef,
      scriptConfigRef,
      getIcon,
      handleBack,
      handleClick,
      handleAdd,
      handleDelete,
      handleEdit,
      handleFinish,
    };
  },
});
</script>
<style lang="less" scoped>
.script-edit {
  width: 100%;
  box-sizing: border-box;
  .edit-opreate {
    position: fixed;
    top: 10px;
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
    padding: 60px 50px 20px 50px;
    width: 100%;
    height: calc(100% - 50px);
    .step-warper {
      width: 100%;
      max-width: 300px;
      &:deep(.el-step__icon) {
        cursor: pointer;
      }
      &:deep(.el-step__title) {
        cursor: pointer;
      }
      &:deep(.el-step__description) {
        cursor: pointer;
      }
      &:deep(.el-step) {
        flex-shrink: 0;
        .el-step__head {
          height: 100%;
        }
      }
    }
  }
}
</style>
