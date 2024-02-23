<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" layout="horizontal">
    <a-form-item :label="$t('settings.layout.preview')">
      <DamageDemo class="demo" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import DamageDemo from './DamageDemo.vue';
</script>

<style scoped lang="less">
  .demo {
    margin-top: 8px;
  }
</style>
