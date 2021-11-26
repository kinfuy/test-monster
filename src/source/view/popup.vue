<template>
  <div class="test-monster">
    <div class="monster-header">
      <img class="monster-logo" src="./../assets/logo32.png" alt="" srcset="" />
      <span class="monster-title">TestMonster</span>
    </div>
    <el-button class="record-btn" type="danger" @click="handleRecord">
      <div class="">
        <el-icon><VideoPlay /></el-icon><span style="margin-left: 5px">开始记录</span>
      </div>
    </el-button>
    <div class="operate-box">
      <el-button type="primary" plain @click="handleClick('script')">
        <div class="">
          <el-icon><Promotion /></el-icon><span style="margin-left: 5px">脚本库</span>
        </div>
      </el-button>
      <el-button type="primary" plain @click="handleClick('option')">
        <div class="">
          <el-icon><Setting /></el-icon><span style="margin-left: 5px">配置屋</span>
        </div>
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { sendMessageToContentScript } from './../../libs/utils';
import { VideoPlay, Promotion, Setting } from '@element-plus/icons';
export default defineComponent({
  name: 'TestMonster',
  components: { VideoPlay, Promotion, Setting },
  setup() {
    const handleClick = (page: string) => {
      window.open(chrome.extension.getURL(`/libs/views/${page}.html`));
    };
    const handleRecord = () => {
      sendMessageToContentScript({
        key: 'MONSTER_POPUP_RECORD',
      });
      window.close();
    };
    return { handleRecord, handleClick };
  },
});
</script>
<style lang="less" scoped>
.test-monster {
  width: 300px;
  padding: 0 30px 20px 30px;
  box-sizing: border-box;
  .monster-header {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    .monster-logo {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    .monster-title {
      line-height: 40px;
    }
  }
  .record-btn {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  .operate-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
