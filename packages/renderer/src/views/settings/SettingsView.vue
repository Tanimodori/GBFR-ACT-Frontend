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
    <a-divider orientation="left">
      <BgColorsOutlined class="anticon" />
      {{ $t('settings.style.title') }}
    </a-divider>
    <StyleSettings />
    <a-divider orientation="left">
      <LayoutOutlined class="anticon" />
      {{ $t('settings.layout.title') }}
    </a-divider>
    <LayoutSettings />
    <a-divider orientation="left">
      <KeyboardAltOutline class="anticon" />
      {{ $t('settings.shortcut.title') }}
    </a-divider>
    <ShortcutSettings />
  </div>
</template>

<script lang="ts" setup>
  import GlobalOutlined from '~icons/ant-design/global-outlined';
  import ApiOutlined from '~icons/ant-design/api-outlined';
  import BgColorsOutlined from '~icons/ant-design/bg-colors-outlined';
  import LayoutOutlined from '~icons/ant-design/layout-outlined';
  import KeyboardAltOutline from '~icons/material-symbols/keyboard-alt-outline';
  import LocaleSettings from './LocaleSettings.vue';
  import ConnectionSettings from './ConnectionSettings.vue';
  import StyleSettings from './StyleSettings.vue';
  import LayoutSettings from './LayoutSettings.vue';
  import ShortcutSettings from './ShortcutSettings.vue';
</script>

<style scoped lang="less">
  .setting-view {
    height: 100%;
    overflow-y: auto;
  }
</style>
