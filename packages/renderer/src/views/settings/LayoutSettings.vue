<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" layout="horizontal">
    <a-form-item name="x" :label="$t('settings.layout.x')" v-bind="validateInfos.x">
      <a-input-number v-model:value="state.x" class="full-width" @blur="validate('x')" />
    </a-form-item>
    <a-form-item name="y" :label="$t('settings.layout.y')" v-bind="validateInfos.y">
      <a-input-number v-model:value="state.y" class="full-width" @blur="validate('y')" />
    </a-form-item>
    <a-form-item
      name="anchorVertical"
      :label="$t('settings.layout.anchorVertical')"
      v-bind="validateInfos.anchorVertical"
    >
      <a-segmented v-model:value="state.anchorVertical" :options="anchorVerticalData" />
    </a-form-item>
    <a-form-item
      name="anchorHorizontal"
      :label="$t('settings.layout.anchorHorizontal')"
      v-bind="validateInfos.anchorHorizontal"
    >
      <a-segmented v-model:value="state.anchorHorizontal" :options="anchorHorizontalData" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '@/store/settings';
  import { computed, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;

  const settingsStore = useSettingsStore();
  const state = reactive({
    x: settingsStore.damageWindowBound.x,
    y: settingsStore.damageWindowBound.y,
    anchorVertical: settingsStore.damageWindowBound.anchorVertical,
    anchorHorizontal: settingsStore.damageWindowBound.anchorHorizontal,
  });
  type StateKey = keyof typeof state;

  const { t } = useI18n();
  const anchorVerticalData = computed(() => [
    { label: t('settings.layout.top'), value: 'top' },
    { label: t('settings.layout.center'), value: 'center' },
    { label: t('settings.layout.bottom'), value: 'bottom' },
  ]);
  const anchorHorizontalData = computed(() => [
    { label: t('settings.layout.left'), value: 'left' },
    { label: t('settings.layout.center'), value: 'center' },
    { label: t('settings.layout.right'), value: 'right' },
  ]);

  const rules = computed(() => ({
    x: [
      { required: true, message: t('error.valueRequired') },
      { type: 'number', message: t('error.valueNumber'), transform: Number },
    ],
    y: [
      { required: true, message: t('error.valueRequired') },
      { type: 'number', message: t('error.valueNumber'), transform: Number },
    ],
    anchorVertical: [{ required: true, message: t('error.valueRequired') }],
    anchorHorizontal: [{ required: true, message: t('error.valueRequired') }],
  }));

  const { validate, validateInfos } = useForm(state, rules, {
    onValidate: (name, status) => {
      if (!status) return;
      settingsStore.$patch({ damageWindowBound: { [name as StateKey]: state[name as StateKey] } });
    },
  });
</script>

<style scoped lang="less">
  .full-width {
    width: 100%;
  }
</style>
