<template>
  <div class="test-monster">
    <div class="monster-header">
      <img class="monster-logo" src="./../assets/logo32.png" alt="" srcset="" />
      <span class="monster-title">TestMonster</span>
    </div>
    <el-button class="record-btn" type="danger" @click="handleRecord">
      <div>
        <el-icon><VideoPlay /></el-icon><span style="margin-left: 5px">开始记录</span>
      </div>
    </el-button>
    <el-button class="record-btn" plain @click="handleClick('script')">
      <div>
        <el-icon><Setting /></el-icon><span style="margin-left: 5px">脚本中心</span>
      </div>
    </el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { sendMessageToContentScript, createNotifications, getChromeUrl, UUID } from './../../libs/utils';
import { Eventkey } from './../../libs/utils/const';
import { VideoPlay, Setting } from '@element-plus/icons';
export default defineComponent({
  name: 'TestMonster',
  components: { VideoPlay, Setting },
  setup() {
    const handleClick = (page: string) => {
      window.open(getChromeUrl(`/libs/views/${page}.html`));
    };
    const handleRecord = () => {
      sendMessageToContentScript({
        key: Eventkey.MONSTER_RECORD_INIT,
      }).then(() => {
        createNotifications(UUID(), {
          type: 'basic',
          title: 'TestMoster',
          iconUrl: getChromeUrl('assets/logo.png'),
          message: 'TestMoster开始记录!',
        });
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
      font-size: 18px;
      line-height: 40px;
    }
  }
  .record-btn {
    display: block;
    width: 100%;
    margin: 5px 0;
  }
  .operate-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
