<template>
  <a-form
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 12 }"
    layout="horizontal"
  >
    <a-form-item
      :label="$t('settings.connection.host')"
      v-bind="validateInfos.host"
    >
      <a-input
        v-model:value="state.host"
        name="host"
        @blur="validate('host', { trigger: 'blur' })"
      />
    </a-form-item>
    <a-form-item
      :label="$t('settings.connection.port')"
      v-bind="validateInfos.port"
    >
      <a-input
        v-model:value="state.port"
        name="port"
        @blur="validate('port', { trigger: 'blur' })"
      />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '@/store/settings';
  import { reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;

  const settingsStore = useSettingsStore();
  const state = reactive({
    host: settingsStore.connection.host,
    port: settingsStore.connection.port,
  });

  const { t } = useI18n();
  const rules = reactive({
    host: [{ required: true, message: t('error.valueRequired') }],
    port: [
      { required: true, message: t('error.valueRequired') },
      { type: 'number', message: t('error.valueNumber'), transform: Number },
      { min: 1, message: t('error.valueMin', { value: 1 }), transform: Number },
      { max: 65535, message: t('error.valueMax', { value: 65535 }), transform: Number },
    ],
  });

  const { validate, validateInfos } = useForm(state, rules, {
    onValidate: (...args) => console.log(...args),
  });
</script>
