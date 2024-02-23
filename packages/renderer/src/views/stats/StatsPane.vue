<template>
  <div class="wrapper">
    <div class="wrapper-inner">
      <StatsTable
        class="stats-table"
        :record="props.record"
      />
      <StatsChart
        class="stats-chart"
        :record="props.record"
      />
    </div>
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
    height: calc(100vh - 89px);
    overflow-x: hidden;
    overflow-y: auto;

    .wrapper-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 400px;
      height: 100%;
    }
  }

  .stats-chart {
    flex: 1;
  }
</style>
