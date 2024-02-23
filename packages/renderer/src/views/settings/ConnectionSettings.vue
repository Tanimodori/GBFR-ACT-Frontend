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
        @blur="validate('host')"
      />
    </a-form-item>
    <a-form-item
      :label="$t('settings.connection.port')"
      v-bind="validateInfos.port"
    >
      <a-input-number
        v-model:value="state.port"
        name="port"
        min="1"
        max="65535"
        class="input-number"
        @blur="validate('port')"
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
