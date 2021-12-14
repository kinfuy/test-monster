<template>
  <div class="flow-design">
    <div class="flow-tool"><FlowTool></FlowTool></div>
    <div class="flow-map"><FlowMap></FlowMap></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FlowMap from './FlowMap/FlowMap.vue';
import FlowTool from './FlowTool/FlowTool.vue';
export default defineComponent({
  name: 'FlowDesign',
  components: { FlowMap, FlowTool },
});
</script>
<style lang="less" scoped>
.flow-design {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  .flow-tool {
    width: 300px;
  }
  .flow-map {
    width: calc(100% - 300px);
    min-width: 600px;
  }
}
</style>
