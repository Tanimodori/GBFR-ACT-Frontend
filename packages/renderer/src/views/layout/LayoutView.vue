<template>
  <a-layout class="layout">
    <a-layout-header>
      <div> </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
      >
        <a-menu-item key="logs">
          <line-chart-outlined class="anticon" />
          <span>Logs</span>
        </a-menu-item>
        <a-menu-item key="Settings">
          <setting-outlined class="anticon" />
          <span>Settings</span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content> </a-layout-content>
    <a-layout-footer> </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import LineChartOutlined from '~icons/ant-design/line-chart-outlined';
import SettingOutlined from '~icons/ant-design/setting-outlined';
import {ref} from 'vue';
const selectedKeys = ref<string[]>(['logs']);
</script>

<style scoped>
.layout :deep(header) {
  height: 32px;
  line-height: 32px;
  padding-inline: 0px;
}
</style>
