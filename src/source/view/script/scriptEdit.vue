<template>
  <div class="script-edit">
    <flow-design />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FlowDesign from '../../components/FlowDesign';
export default defineComponent({
  name: 'scriptEdit',
  components: { FlowDesign },
});
</script>
<style lang="less" scoped></style>
