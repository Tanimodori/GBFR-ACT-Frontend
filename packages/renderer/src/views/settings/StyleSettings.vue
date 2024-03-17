<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" layout="horizontal">
    <a-form-item :label="$t('settings.style.preview')">
      <DamageDemo class="demo" />
    </a-form-item>
    <a-form-item name="bgColor" :label="$t('settings.style.bgColor')" v-bind="validateInfos.bgColor">
      <a-input v-model:value="state.bgColor" @blur="validate('bgColor')" />
    </a-form-item>
    <a-form-item name="bgCornerSize" :label="$t('settings.style.bgCornerSize')" v-bind="validateInfos.bgCornerSize">
      <a-input v-model:value="state.bgCornerSize" @blur="validate('bgCornerSize')" />
    </a-form-item>
    <a-form-item name="bgPadding" :label="$t('settings.style.bgPadding')" v-bind="validateInfos.bgPadding">
      <a-input v-model:value="state.bgPadding" @blur="validate('bgPadding')" />
    </a-form-item>
    <a-form-item name="fontFace" :label="$t('settings.style.fontFace')" v-bind="validateInfos.fontFace">
      <a-input v-model:value="state.fontFace" @blur="validate('fontFace')" />
    </a-form-item>
    <a-form-item name="fontColor" :label="$t('settings.style.fontColor')" v-bind="validateInfos.fontColor">
      <a-input v-model:value="state.fontColor" @blur="validate('fontColor')" />
    </a-form-item>
    <a-form-item name="fontSize" :label="$t('settings.style.fontSize')" v-bind="validateInfos.fontSize">
      <a-input v-model:value="state.fontSize" @blur="validate('fontSize')" />
    </a-form-item>
    <a-form-item name="fontWeight" :label="$t('settings.style.fontWeight')" v-bind="validateInfos.fontWeight">
      <a-input v-model:value="state.fontWeight" @blur="validate('fontWeight')" />
    </a-form-item>
    <a-form-item
      name="fontBorderColor"
      :label="$t('settings.style.fontBorderColor')"
      v-bind="validateInfos.fontBorderColor"
    >
      <a-input v-model:value="state.fontBorderColor" @blur="validate('fontBorderColor')" />
    </a-form-item>
    <a-form-item
      name="fontBorderSize"
      :label="$t('settings.style.fontBorderSize')"
      v-bind="validateInfos.fontBorderSize"
    >
      <a-input v-model:value="state.fontBorderSize" @blur="validate('fontBorderSize')" />
    </a-form-item>
    <a-form-item name="colOrder" :label="$t('settings.style.colOrder')" v-bind="validateInfos.colOrder">
      <a-input v-model:value="state.colOrder" @blur="validate('colOrder')" />
    </a-form-item>
    <a-form-item name="rowOrderBy" :label="$t('settings.style.rowOrderBy')" v-bind="validateInfos.rowOrderBy">
      <a-select v-model:value="state.rowOrderBy" :options="rowOrderByData" />
    </a-form-item>
    <a-form-item name="rowOrder" :label="$t('settings.style.rowOrder')" v-bind="validateInfos.rowOrder">
      <a-segmented v-model:value="state.rowOrder" :options="rowOrderData" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import DamageDemo from './DamageDemo.vue';
  import { useSettingsStore } from '@/store/settings';
  import { computed, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const settingsStore = useSettingsStore();

  const state = reactive({
    bgColor: settingsStore.damageStyle.bgColor,
    bgCornerSize: settingsStore.damageStyle.bgCornerSize,
    bgPadding: settingsStore.damageStyle.bgPadding,
    fontFace: settingsStore.damageStyle.fontFace,
    fontColor: settingsStore.damageStyle.fontColor,
    fontSize: settingsStore.damageStyle.fontSize,
    fontWeight: settingsStore.damageStyle.fontWeight,
    fontBorderColor: settingsStore.damageStyle.fontBorderColor,
    fontBorderSize: settingsStore.damageStyle.fontBorderSize,
    colOrder: settingsStore.damageStyle.colOrder,
    rowOrderBy: settingsStore.damageStyle.rowOrderBy,
    rowOrder: settingsStore.damageStyle.rowOrder,
  });
  type StateKey = keyof typeof state;

  const { t } = useI18n();
  const rowOrderByData = computed(() => [
    { label: t('statsTable.name'), value: 'name' },
    { label: t('statsTable.totalDamage'), value: 'totalDamage' },
    { label: t('statsTable.totalDamagePerSecond'), value: 'totalDamagePerSecond' },
    { label: t('statsTable.damageInSecond'), value: 'damageInSecond' },
    { label: t('statsTable.damageInTenSecond'), value: 'damageInTenSecond' },
    { label: t('statsTable.damageInTenSecondPerSecond'), value: 'damageInTenSecondPerSecond' },
    { label: t('statsTable.damageInMinute'), value: 'damageInMinute' },
    { label: t('statsTable.damageInMinutePerSecond'), value: 'damageInMinutePerSecond' },
  ]);
  const rowOrderData = computed(() => [
    { label: t('settings.style.asc'), value: 'asc' },
    { label: t('settings.style.desc'), value: 'desc' },
  ]);
  const rules = computed(() => ({
    bgColor: [{ required: true, message: t('error.valueRequired') }],
    bgCornerSize: [{ required: true, message: t('error.valueRequired') }],
    bgPadding: [{ required: true, message: t('error.valueRequired') }],
    fontFace: [{ required: true, message: t('error.valueRequired') }],
    fontColor: [{ required: true, message: t('error.valueRequired') }],
    fontSize: [{ required: true, message: t('error.valueRequired') }],
    fontWeight: [{ required: true, message: t('error.valueRequired') }],
    fontBorderColor: [{ required: true, message: t('error.valueRequired') }],
    fontBorderSize: [{ required: true, message: t('error.valueRequired') }],
    colOrder: [{ required: true, message: t('error.valueRequired') }],
    rowOrderBy: [{ required: true, message: t('error.valueRequired') }],
    rowOrder: [{ required: true, message: t('error.valueRequired') }],
  }));

  const { validate, validateInfos } = useForm(state, rules, {
    onValidate: (name, status) => {
      if (!status) return;
      settingsStore.$patch({ damageStyle: { [name as StateKey]: state[name as StateKey] } });
    },
  });
</script>

<style scoped lang="less">
  .demo {
    margin-top: 8px;
  }
</style>
