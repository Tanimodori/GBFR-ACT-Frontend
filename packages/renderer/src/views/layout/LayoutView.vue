<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">
        <orb-wand-icon class="anticon" />
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
      >
        <a-menu-item key="logs">
          <line-chart-outlined class="anticon" />
          <span>{{ $t('menu.logs') }}</span>
        </a-menu-item>
        <a-menu-item key="Settings">
          <setting-outlined class="anticon" />
          <span>{{ $t('menu.settings') }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content> </a-layout-content>
    <a-layout-footer> </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import OrbWandIcon from '~icons/game-icons/orb-wand';
import LineChartOutlined from '~icons/ant-design/line-chart-outlined';
import SettingOutlined from '~icons/ant-design/setting-outlined';
import {ref} from 'vue';
const selectedKeys = ref<string[]>(['logs']);
</script>

<style scoped lang="less">
.layout {
  .logo {
    float: left;
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0);

    svg.anticon {
      color: white;
    }
  }

  :deep(header) {
    height: 32px;
    line-height: 32px;
    padding-inline: 0px;
  }
}
</style>

<i18n lang="json"></i18n>
