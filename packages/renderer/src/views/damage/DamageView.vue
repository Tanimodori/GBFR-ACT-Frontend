<template>
  <div ref="damagePaneElement" class="damage-view">
    <DamagePane v-if="activeRecord" :record="activeRecord" />
  </div>
</template>

<script lang="ts" setup>
  import { useRecordStore } from '@/store/record';
  import { computed, ref, watch } from 'vue';
  import DamagePane from './DamagePane.vue';
  import { windowOps } from '#preload';
  import { useResizeObserver } from '@vueuse/core';
  import { useSettingsStore } from '@/store/settings';

  const settingsStore = useSettingsStore();
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
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);

    const { x, y, anchorHorizontal, anchorVertical } = settingsStore.damageWindowBound;
    const dpi = windowOps.getDpi();

    let xoffsetFactor = 0;
    if (anchorHorizontal === 'center') {
      xoffsetFactor = -0.5;
    } else if (anchorHorizontal === 'right') {
      xoffsetFactor = -1;
    }

    let yoffsetFactor = 0;
    if (anchorVertical === 'center') {
      yoffsetFactor = -0.5;
    } else if (anchorVertical === 'bottom') {
      yoffsetFactor = -1;
    }

    windowOps.setBounds({
      x: Math.ceil(x / dpi + xoffsetFactor * width),
      y: Math.ceil(y / dpi + yoffsetFactor * height),
      width,
      height,
    });
  };

  watch(damagePaneElement, onResize);
  useResizeObserver(damagePaneElement, onResize);
  settingsStore.$subscribe(mutation => {
    if (mutation.type === 'patch object' && mutation.payload.damageWindowBound) {
      onResize();
    }
  });
</script>

<style scoped lang="less">
  .damage-view {
    width: max-content;
  }
</style>
