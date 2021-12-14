<template>
  <div :data-drag="isDrag" :class="['file', fixClass, { 'file-cutting': cutting }]">
    <IconSvg :fix-class="fixIconClass" :name="icon"></IconSvg>
    <div
      ref="edit"
      :contenteditable="contenteditable"
      class="file-title"
      :title="fileTitle"
      @blur="headleBlur()"
      @keydown.enter="headleBlur()"
    >
      {{ fileTitle }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, computed } from 'vue';
export default defineComponent({
  name: 'FolderOrFile',
  props: {
    fixClass: {
      type: String,
      default: undefined,
    },
    contenteditable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'week-wenjianjia', // week-wenjianjia  文件夹 week-daimaxiang 脚本
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    cutting: {
      type: Boolean,
      default: false,
    },
    fileTitle: {
      type: String,
      default: '新建分组',
    },
    fixIconClass: {
      type: String,
      default: 'fixIconClass',
    },
  },
  emits: ['blur'],
  setup(props, { emit }) {
    const edit = ref<HTMLElement | undefined>(undefined);
    watch(
      () => props.contenteditable,
      (val) => {
        if (val) {
          nextTick(() => {
            if (edit.value) edit.value.focus();
            document.execCommand('selectAll', false);
          });
        }
      },
      { immediate: true }
    );
    const headleBlur = () => {
      emit('blur', {
        value: (edit.value && edit.value.innerText) || '新建分组',
        html: (edit.value && edit.value.innerHTML) || '新建分组',
      });
    };
    const isDrag = computed(() => {});
    return {
      edit,
      isDrag,
      headleBlur,
    };
  },
});
</script>
<style lang="less" scoped>
.file {
  &.file-cutting {
    opacity: 0.5;
  }
  display: inline-block;
  text-align: center;
  padding: 10px 30px;
  border-radius: 10px;
  margin: 10px;
  &:hover {
    background-color: #f4f4f4;
  }
  &:deep(.fixIconClass) {
    width: 80px;
    cursor: pointer;
    height: 80px;
  }
  .file-title {
    margin-top: 5px;
    text-align: center;
    font-size: 13px;
    max-width: 80px;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:focus {
      outline: 1.5px solid #ee68b2;
      padding: 0 4px;
      box-shadow: 0 0 5px #ee68b2;
    }
  }
}
</style>
