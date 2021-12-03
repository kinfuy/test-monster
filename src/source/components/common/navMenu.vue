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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Promotion, Monitor } from '@element-plus/icons';
export default defineComponent({
  name: 'NavMenu',
  components: { Promotion, Monitor },
  setup() {
    const activeMenu = ref('script');
    const handleClick = (val: string) => {
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
  width: 200px;
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
