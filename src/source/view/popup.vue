<template>
  <div class="test-monster">
    <div class="header">
      <span>TestMonster</span>
    </div>
    <el-button type="danger" @click="handleRecord">开始记录</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { sendMessageToContentScript } from './../../libs/utils';
export default defineComponent({
  name: 'TestMonster',
  setup() {
    const handleRecord = () => {
      sendMessageToContentScript({
        key: 'MONSTER_POPUP_RECORD',
      });
      window.close();
    };
    return { handleRecord };
  },
});
</script>
<style lang="less" scoped>
.test-monster {
  width: 300px;
  height: 300px;
  padding: 20px 30px;
  border: 1px solid red;
  box-sizing: border-box;
  .header {
    height: 50px;
  }
}
</style>
