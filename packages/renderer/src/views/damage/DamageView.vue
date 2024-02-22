<template>
  <div
    ref="damagePaneElement"
    class="damage-view"
  >
    <DamagePane
      v-if="activeRecord"
      :record="activeRecord"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useRecordStore } from '@/store/record';
  import { computed, ref, watch } from 'vue';
  import DamagePane from './DamagePane.vue';
  import { windowOps } from '#preload';
  import { useResizeObserver } from '@vueuse/core';

  const recordStore = useRecordStore();
  const activeRecord = computed(() => {
    if (recordStore.activeRecordId) {
      return recordStore.records.find(record => record.id === recordStore.activeRecordId);
    }
    return undefined;
  });

  const damagePaneElement = ref<HTMLElement | null>(null);
  const onResize = () => {
    if (!activeRecord.value || !damagePaneElement.value) {
      return;
    }
    const rect = damagePaneElement.value.getBoundingClientRect();
    windowOps.setBounds({
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
    });
  };
  watch(damagePaneElement, onResize);

  useResizeObserver(damagePaneElement, onResize);
</script>

<style scoped lang="less">
  .damage-view {
    width: max-content;
  }
</style>
