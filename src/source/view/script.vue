<template>
  <div v-height class="script">
    <div class="script-left">
      <nav-menu />
    </div>
    <div class="script-right"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NavMenu from './../components/common/navMenu.vue';
export default defineComponent({
  name: 'Script',
  components: { NavMenu },
});
</script>
<style lang="less">
@import url('./../../style/common.less');
.script {
  display: flex;
}
</style>
