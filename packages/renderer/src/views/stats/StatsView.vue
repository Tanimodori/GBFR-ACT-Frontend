<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="card"
  >
    <template #leftExtra>
      <div class="tabLeft"></div>
    </template>
    <a-tab-pane
      v-for="i in recordStore.records.length"
      :key="recordStore.records[i - 1].id"
      :tab="getTabName(recordStore.records[i - 1])"
    >
      <StatsPane :record="recordStore.records[i - 1]" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import dayjs from '@/utils/dayjs';
  import { ref } from 'vue';
  import { type RecordState, useRecordStore } from '@/store/record';
  import StatsPane from './StatsPane.vue';
  const activeKey = ref(1);
  const recordStore = useRecordStore();

  const getTabName = (record: RecordState) => {
    const startTime = dayjs(record.startTimestamp).format('LTS');
    const duration = dayjs(record.lastTimestamp).from(dayjs(record.startTimestamp), true);
    return `${startTime}[${duration}]`;
  };
</script>

<style scoped lang="less">
  .tabLeft {
    width: 10px;
  }
</style>
