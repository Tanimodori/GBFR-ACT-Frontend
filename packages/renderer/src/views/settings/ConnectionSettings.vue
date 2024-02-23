<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" layout="horizontal">
    <a-form-item name="host" :label="$t('settings.connection.host')" v-bind="validateInfos.host">
      <a-input v-model:value="state.host" @blur="validate('host')" />
    </a-form-item>
    <a-form-item name="port" :label="$t('settings.connection.port')" v-bind="validateInfos.port">
      <a-input-number v-model:value="state.port" min="1" max="65535" class="full-width" @blur="validate('port')" />
    </a-form-item>
    <a-form-item name="startup" :label="$t('settings.connection.startup')" v-bind="validateInfos.startup">
      <a-checkbox v-model:checked="state.startup" @change="validate('startup')" />
    </a-form-item>
    <a-form-item name="retry" :label="$t('settings.connection.retry')" v-bind="validateInfos.retry">
      <a-checkbox v-model:checked="state.retry" @change="validate('retry')" />
    </a-form-item>
    <a-form-item :label="$t('settings.connection.readyState')">
      <a-tag v-if="recordStore.readyState === 'OPEN'" color="success" class="full-width">
        <CheckCircleOutlined class="anticon" />
        {{ $t('settings.connection.connected', { value: recordStore.wsCurrentUrl }) }}
      </a-tag>
      <a-tag v-if="recordStore.readyState === 'CONNECTING'" color="processing" class="full-width">
        <ClockCircleOutlined class="anticon" />
        {{ $t('settings.connection.connecting', { value: recordStore.wsCurrentUrl }) }}
      </a-tag>
      <a-tag v-if="recordStore.readyState === 'CLOSED'" color="error" class="full-width">
        <CloseCircleOutlined class="anticon" />
        {{ $t('settings.connection.disconnected') }}
      </a-tag>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <div class="button-holder">
        <a-button
          type="primary"
          :disabled="recordStore.readyState !== 'CLOSED'"
          :loading="recordStore.readyState === 'CONNECTING'"
          @click="recordStore.connect"
        >
          {{ $t('settings.connection.connect') }}
        </a-button>
        <a-button :disabled="recordStore.readyState === 'CLOSED'" @click="() => recordStore.disconnect(1000)">
          {{ $t('settings.connection.disconnect') }}
        </a-button>
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '@/store/settings';
  import { reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { useRecordStore } from '@/store/record';
  import CheckCircleOutlined from '~icons/ant-design/check-circle-outlined';
  import ClockCircleOutlined from '~icons/ant-design/clock-circle-outlined';
  import CloseCircleOutlined from '~icons/ant-design/close-circle-outlined';
  const useForm = Form.useForm;

  const settingsStore = useSettingsStore();
  const recordStore = useRecordStore();
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
  .full-width {
    width: 100%;
  }

  .button-holder {
    display: flex;
    gap: 16px;
    justify-content: space-between;

    > button {
      flex: 1;
    }
  }
</style>
