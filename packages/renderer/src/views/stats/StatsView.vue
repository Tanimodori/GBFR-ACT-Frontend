<template>
  <a-tabs v-model:activeKey="activeKey" type="editable-card" hide-add @edit="onEdit">
    <template #leftExtra>
      <div class="tabLeft"></div>
    </template>
    <a-tab-pane
      v-for="i in recordStore.records.length"
      :key="recordStore.records[i - 1].id"
      :tab="getTabName(recordStore.records[i - 1])"
      :closable="true"
    >
      <StatsPane :record="recordStore.records[i - 1]" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import dayjs from '@/utils/dayjs';
  import { ref, watch, onActivated, onMounted } from 'vue';
  import { type RecordState, useRecordStore } from '@/store/record';
  import StatsPane from './StatsPane.vue';
  const activeKey = ref('');
  const recordStore = useRecordStore();

  const getTabName = (record: RecordState) => {
    const startTime = dayjs(record.startTimestamp).format('hh:mm:ss');
    const duration = dayjs(record.lastTimestamp).from(dayjs(record.startTimestamp), true);
    return `${startTime}[${duration}]`;
  };

  // Auto select active tab
  const autoSelectActiveTab = () => {
    if (activeKey.value === '' && recordStore.activeRecordId !== '') {
      activeKey.value = recordStore.activeRecordId;
    }
  };
  watch([activeKey, () => recordStore.activeRecordId], autoSelectActiveTab);
  onMounted(autoSelectActiveTab);
  onActivated(autoSelectActiveTab);

  // Remove tab
  const onEdit = (targetKey: string | MouseEvent, action: string) => {
    if (action !== 'remove') {
      return;
    }
    const key = targetKey as string;
    const index = recordStore.records.findIndex(record => record.id === key);
    if (index !== -1) {
      recordStore.records.splice(index, 1);
    }
  };
</script>

<style scoped lang="less">
  .tabLeft {
    width: 10px;
  }
</style>
