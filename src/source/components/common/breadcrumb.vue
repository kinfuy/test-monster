<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in virtualCrumb" :key="item.name">
      <span
        @click="handleClick(item)"
        :class="['breadcrumb-text', { 'breadcrumb-disabled': disabled(item) }, { 'breadcrumb-active': active(item) }]"
        >{{ item.name }}</span
      >
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
interface Breadcrumb {
  name: string;
  active?: boolean;
  disabled?: boolean;
}
export default defineComponent({
  name: 'BreadCrumb',
  props: {
    virtualCrumb: {
      type: Array as PropType<Array<Breadcrumb>>,
      default: [],
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const disabled = computed(() => {
      return (item: Breadcrumb) => {
        return item.disabled === undefined ? false : item.disabled;
      };
    });
    const active = computed(() => {
      return (item: Breadcrumb) => {
        return item.active === undefined ? false : item.active;
      };
    });
    const handleClick = (item: Breadcrumb) => {
      emit('click', item);
    };
    return {
      disabled,
      active,
      handleClick,
    };
  },
});
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  .el-breadcrumb__item:last-child {
    .breadcrumb-text {
      cursor: auto;
      &:hover {
        color: inherit;
      }
    }
  }
}
.breadcrumb-text {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.breadcrumb-active {
  cursor: pointer;
  font-weight: 600;
  color: #333;
}
.breadcrumb-disabled {
  cursor: auto;
  &:hover {
    color: inherit;
  }
}
</style>
