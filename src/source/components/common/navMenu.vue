<template>
  <div class="nav-menu">
    <div class="nav-header">
      <img class="monster-logo" src="./../../assets/logo64.png" alt="" srcset="" />
      <div class="monster-title">TestMonster</div>
    </div>
    <div class="menu-list">
      <div @click="handleClick('script')" :class="['menu-item', { 'menu-active': activeMenu === 'script' }]">
        <el-icon class="menu-icon"><Promotion /></el-icon>
        <span class="menu-text">脚本</span>
      </div>
      <div @click="handleClick('website')" :class="['menu-item', { 'menu-active': activeMenu === 'website' }]">
        <el-icon class="menu-icon"><Monitor /></el-icon>
        <span class="menu-text">站点</span>
      </div>
      <div @click="handleClick('task')" :class="['menu-item', { 'menu-active': activeMenu === 'task' }]">
        <el-icon class="menu-icon"><AlarmClock /></el-icon>
        <span class="menu-text">任务</span>
      </div>
      <div @click="handleClick('log')" :class="['menu-item', { 'menu-active': activeMenu === 'log' }]">
        <el-icon class="menu-icon"><Calendar /></el-icon>
        <span class="menu-text">日志</span>
      </div>
      <div @click="handleClick('setting')" :class="['menu-item', { 'menu-active': activeMenu === 'setting' }]">
        <el-icon class="menu-icon"><Setting /></el-icon>
        <span class="menu-text">设置</span>
      </div>
      <div @click="handleClick('dustbin')" :class="['menu-item', { 'menu-active': activeMenu === 'dustbin' }]">
        <el-icon class="menu-icon"><DeleteFilled /></el-icon>
        <span class="menu-text">回收站</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Promotion, Monitor, AlarmClock, Setting, Calendar, DeleteFilled } from '@element-plus/icons';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'NavMenu',
  components: { Promotion, Monitor, AlarmClock, Setting, Calendar, DeleteFilled },
  setup() {
    const router = useRouter();
    const activeMenu = ref('script');
    const handleClick = (val: string) => {
      router.push({
        name: val,
      });
      activeMenu.value = val;
    };
    return {
      activeMenu,
      handleClick,
    };
  },
});
</script>
<style lang="less" scoped>
.nav-menu {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding-top: 50px;
  .nav-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    .monster-logo {
      width: 65px;
    }
    .monster-title {
      font-size: 18px;
    }
  }
  .menu-list {
    margin-top: 40px;
    width: 100%;
    .menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 10px 0;
      padding: 10px 20px;
      color: #666;
      .menu-icon {
        font-size: 18px;
        margin-right: 5px;
      }
      &:hover {
        background-color: rgb(232, 238, 245);
        .menu-text {
          color: rgb(41, 141, 248);
        }
        .menu-icon {
          color: rgb(41, 141, 248);
        }
      }
      &.menu-active {
        background-color: rgb(232, 238, 245);
        .menu-text {
          color: rgb(41, 141, 248);
        }
        .menu-icon {
          color: rgb(41, 141, 248);
        }
      }
    }
  }
}
</style>
