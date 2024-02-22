<template>
  <div class="wrapper">
    <StatsTable
      class="stats-table"
      :record="props.record"
    />
    <StatsChart
      class="stats-chart"
      :record="props.record"
    />
  </div>
</template>

<script lang="ts" setup>
  import type { RecordState } from '@/store/record';
  import StatsTable from './StatsTable.vue';
  import StatsChart from './StatsChart.vue';

  const props = defineProps<{
    record: RecordState;
  }>();
</script>

<style scoped lang="less">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    // magic number
    height: calc(100vh - 89px);
  }

  .stats-chart {
    flex: 1;
  }
</style>
