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
      :tab="recordStore.records[i - 1].id"
    >
      <StatsPane :record="recordStore.records[i - 1]" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { useRecordStore } from '@/store/record';
  import { ref } from 'vue';
  import StatsPane from './StatsPane.vue';
  const activeKey = ref(1);

  const recordStore = useRecordStore();

  console.log(recordStore.records);
</script>

<style scoped lang="less">
  .tabLeft {
    width: 10px;
  }
</style>
