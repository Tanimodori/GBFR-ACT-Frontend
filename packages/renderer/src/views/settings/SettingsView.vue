<template>
  <div>
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
