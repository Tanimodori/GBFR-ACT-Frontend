<template>
  <div>
    <DamagePane
      v-if="activeRecord"
      :record="activeRecord"
    />
    <DamageOverlay />
  </div>
</template>

<script lang="ts" setup>
  import { useRecordStore } from '@/store/record';
  import { computed } from 'vue';
  import DamagePane from './DamagePane.vue';
  import DamageOverlay from './DamageOverlay.vue';

  const recordStore = useRecordStore();
  const activeRecord = computed(() => {
    if (recordStore.activeRecordId) {
      return recordStore.records.find(record => record.id === recordStore.activeRecordId);
    }
    return undefined;
  });
</script>
