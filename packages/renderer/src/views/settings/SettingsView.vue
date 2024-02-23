<template>
  <div class="setting-view">
    <a-divider orientation="left">
      <GlobalOutlined class="anticon" />
      {{ $t('settings.locale.title') }}
    </a-divider>
    <LocaleSettings />
    <a-divider orientation="left">
      <ApiOutlined class="anticon" />
      {{ $t('settings.connection.title') }}
    </a-divider>
    <ConnectionSettings />
  </div>
</template>

<script lang="ts" setup>
  import GlobalOutlined from '~icons/ant-design/global-outlined';
  import ApiOutlined from '~icons/ant-design/api-outlined';
  import LocaleSettings from './LocaleSettings.vue';
  import ConnectionSettings from './ConnectionSettings.vue';
</script>

<style scoped lang="less">
  .setting-view {
    height: 100%;
    overflow-y: auto;
  }
</style>
