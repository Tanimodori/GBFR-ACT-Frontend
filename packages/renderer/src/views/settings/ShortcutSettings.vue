<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" layout="horizontal">
    <a-form-item name="enabled" :label="$t('settings.shortcut.enabled')" v-bind="validateInfos.enabled">
      <a-checkbox v-model:checked="state.enabled" @change="validate('enabled')" />
    </a-form-item>
    <a-form-item name="switch" :label="$t('settings.shortcut.switch')" v-bind="validateInfos.switch">
      <a-input v-model:value="state.switch" @blur="validate('switch')" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '@/store/settings';
  import { reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { isAccelerator } from '@/utils/accelerator';
  const useForm = Form.useForm;

  const settingsStore = useSettingsStore();
  const state = reactive({
    enabled: settingsStore.shortcut.enabled,
    switch: settingsStore.shortcut.switch,
  });
  type StateKey = keyof typeof state;

  const { t } = useI18n();

  const rules = reactive({
    enabled: [{ required: true, message: t('error.valueRequired') }],
    switch: [
      { required: true, message: t('error.valueRequired') },
      {
        validator: (_rule: unknown, value: string) => {
          if (isAccelerator(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject(t('error.invalidShortcut'));
          }
        },
      },
    ],
  });

  const { validate, validateInfos } = useForm(state, rules, {
    onValidate: (name, status) => {
      if (!status) return;
      settingsStore.$patch({ shortcut: { [name as StateKey]: state[name as StateKey] } });
    },
  });
</script>

<style scoped lang="less">
  .full-width {
    width: 100%;
  }
</style>
