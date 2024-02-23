<template>
  <a-form
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 12 }"
    layout="horizontal"
  >
    <a-form-item
      name="host"
      :label="$t('settings.connection.host')"
      v-bind="validateInfos.host"
    >
      <a-input
        v-model:value="state.host"
        @blur="validate('host')"
      />
    </a-form-item>
    <a-form-item
      name="port"
      :label="$t('settings.connection.port')"
      v-bind="validateInfos.port"
    >
      <a-input-number
        v-model:value="state.port"
        min="1"
        max="65535"
        class="input-number"
        @blur="validate('port')"
      />
    </a-form-item>
    <a-form-item
      name="startup"
      v-bind="validateInfos.startup"
      :wrapper-col="{ offset: 4, span: 12 }"
    >
      <a-checkbox v-model:checked="state.startup">{{ $t('settings.connection.startup') }}</a-checkbox>
    </a-form-item>
    <a-form-item
      name="retry"
      v-bind="validateInfos.retry"
      :wrapper-col="{ offset: 4, span: 12 }"
    >
      <a-checkbox v-model:checked="state.retry">{{ $t('settings.connection.retry') }}</a-checkbox>
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
    startup: settingsStore.connection.startup,
    retry: settingsStore.connection.retry,
  });
  type StateKey = keyof typeof state;

  const { t } = useI18n();
  const rules = reactive({
    host: [{ required: true, message: t('error.valueRequired') }],
    port: [
      { required: true, message: t('error.valueRequired') },
      { type: 'number', message: t('error.valueNumber'), transform: Number },
      { type: 'number', min: 1, message: t('error.valueMin', { value: 1 }), transform: Number },
      { type: 'number', max: 65535, message: t('error.valueMax', { value: 65535 }), transform: Number },
    ],
    startup: [{ required: true, message: t('error.valueRequired') }],
    retry: [{ required: true, message: t('error.valueRequired') }],
  });

  const { validate, validateInfos } = useForm(state, rules, {
    onValidate: (name, status) => {
      if (!status) return;
      settingsStore.$patch({ connection: { [name as StateKey]: state[name as StateKey] } });
    },
  });
</script>

<style scoped lang="less">
  .input-number {
    width: 100%;
  }
</style>
