<!--
 * @Author: jinhu.yang
 * @Date: 2021-07-12 16:24:44
 * @LastEditors: jinhu.yang
 * @LastEditTime: 2021-07-23 17:46:43
-->
<template>
  <div class="contextmenu">
    <div v-for="item in menuList" :key="item.code" class="context-menu-item" @click="headleClick(item)">
      <IconSvg :name="item.icon"></IconSvg>
      <span class="menu-text">{{ item.name }}</span>
      <IconSvg v-if="item.children" fix-class="fix-class" name="week-arrow-right-copy-copy"></IconSvg>
      <div v-if="item.children" class="children-menu">
        <ContextMenu :menu-list="item.children"></ContextMenu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IconSvg from './../Icon/IconSvg.vue';
import { defineComponent, PropType } from 'vue';
import { MenuListitem } from './contextMenuType';
export default defineComponent({
  name: 'ContextMenu',
  components: { IconSvg },
  props: {
    menuList: {
      type: Array as PropType<Array<MenuListitem>>,
      required: true,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const headleClick = (item: MenuListitem) => {
      if (item.code) {
        props.onClick(item.code);
      }
    };
    return {
      headleClick,
    };
  },
});
</script>

<style lang="less" scoped>
.contextmenu {
  padding: 2px 0px;
  min-width: 160px;
  background: rgb(255, 255, 255);
  transition: opacity 0s ease 0s, transform 0.2s ease-in-out 0s;
  border-radius: 4px;
  transform-origin: 0px 0px;
  box-shadow: #ccc 0px 2px 16px 0px;
  .context-menu-item {
    position: relative;
    min-width: 160px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f4f4f4;
      > .children-menu {
        display: block;
      }
    }
    .children-menu {
      display: none;
      position: absolute;
      top: 0;
      left: 100%;
      box-shadow: #ccc 0px 2px 16px 0px;
    }
    .fix-class {
      position: absolute;
      right: 10px;
    }
    .menu-text {
      margin-left: 10px;
    }
  }
}
</style>
