<template>
  <div class="flow-design">
    <div class="flow-tool-warper"><FlowTool></FlowTool></div>
    <div class="flow-map-warper"><FlowMap></FlowMap></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FlowMap from './components/FlowMap/FlowMap.vue';
import FlowTool from './components/FlowTool/FlowTool.vue';
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
  .flow-tool-warper {
    width: 260px;
  }
  .flow-map-warper {
    width: calc(100% - 260px);
    min-width: 600px;
  }
}
</style>
