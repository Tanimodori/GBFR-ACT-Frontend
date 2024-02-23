<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" layout="horizontal">
    <a-form-item :label="$t('settings.locale.language')">
      <a-select v-model:value="formState.language" @select="onLanguageSelect">
        <a-select-option value="en_US">{{ $t('settings.locale.en_US') }}</a-select-option>
        <a-select-option value="zh_CN">{{ $t('settings.locale.zh_CN') }}</a-select-option>
        <a-select-option value="zh_TW">{{ $t('settings.locale.zh_TW') }}</a-select-option>
        <a-select-option value="zh_HK">{{ $t('settings.locale.zh_HK') }}</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '@/store/settings';
  import { ref } from 'vue';
  const settingsStore = useSettingsStore();
  const formState = ref({
    language: settingsStore.locale.language,
  });
  const onLanguageSelect = (value: string) => {
    settingsStore.locale.language = value;
  };
</script>
