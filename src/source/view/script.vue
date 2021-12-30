<template>
  <div v-height class="script">
    <div class="script-left">
      <nav-menu />
    </div>
    <div class="script-right">
      <div class="content-header">
        <div class="menu-item">
          <span>Githup</span>
        </div>
        <div class="menu-item">
          <span>帮助</span>
        </div>
      </div>
      <div class="constent-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NavMenu from './../components/common/navMenu.vue';
import { useStore } from './../store/script';
import { getStoreKey, setStore } from './../../libs/utils';
import { EventMonsterList } from './../../libs/history';
export default defineComponent({
  name: 'Script',
  components: { NavMenu },
  setup() {
    const { folderStoreModule } = useStore();
    folderStoreModule.action.initFolderModule().then(() => {
      getStoreKey<{ currectEventList: EventMonsterList }>(['currectEventList']).then(({ currectEventList }) => {
        if (currectEventList) {
          folderStoreModule.action.createFolder({
            type: 'file',
            name: '录制脚本',
            contentScript: currectEventList,
            level: 0,
            parentId: 'script_uuid',
          });
          folderStoreModule.action.updateCurrent('script_uuid', 0);
          folderStoreModule.action.goCrumb('script_uuid');
          setStore({ currectEventList: null });
        }
      });
    });
  },
});
</script>
<style lang="less">
@import url('./../../style/common.less');
.script {
  display: flex;
  .script-left {
    width: 200px;
  }
  .script-right {
    width: calc(100% - 200px);
    .content-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 100px;
      height: 66px;
      .menu-item {
        margin: 0 10px;
      }
    }
    .constent-body {
      height: calc(100% - 66px);
      width: 100%;
    }
  }
}
</style>
