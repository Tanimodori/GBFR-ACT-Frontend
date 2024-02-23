<template>
  <a-form
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 8 }"
    layout="horizontal"
  >
    <a-form-item :label="$t('settings.locale.language')">
      <a-select>
        <a-select-option value="en_US">{{ $t('settings.locale.en_US') }}</a-select-option>
        <a-select-option value="zh_CN">{{ $t('settings.locale.zh_CN') }}</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
