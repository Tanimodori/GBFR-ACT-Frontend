<template>
  <v-chart :option="option" class="chart" autoresize />
</template>

<script setup lang="ts">
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { computed } from 'vue';
  import type { RecordState } from '@/store/record';
  import dayjs from '@/utils/dayjs';
  import { getActorName } from '@/utils/enums';

  use([CanvasRenderer, LineChart, TooltipComponent, LegendComponent, GridComponent]);

  const props = defineProps<{
    record: RecordState;
  }>();

  const durationFormatter = (value: number) => {
    return dayjs.duration(value * 1000).format('m:ss');
  };

  const option = computed(() => {
    const legendData: string[] = [];
    const series = [];
    let xAxisData: number[] = [];

    for (let i = 0; i < props.record.players.length; i++) {
      const player = props.record.players[i];
      if (player) {
        legendData.push(`[${player.index}]` + getActorName(player.id));
        series.push({
          name: `[${player.index}]` + getActorName(player.id),
          type: 'line',
          data: player.damageInMinutePerSecond,
          showAllSymbol: false,
        });
        xAxisData = player.damageInMinutePerSecond.map((_, i) => i);
      }
    }

    if (legendData.length === 0) {
      return {};
    }

    return {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendData,
      },
      grid: {
        left: 80,
        top: 30,
        right: 30,
        bottom: 30,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLabel: {
          formatter: (value: number) => {
            if (value % 15 !== 0) {
              return '';
            }
            return durationFormatter(value);
          },
          interval: 14,
        },
      },
      yAxis: {
        type: 'value',
      },
      series,
    };
  });
</script>

<style scoped lang="less">
  .chart {
    height: 100%;
  }
</style>
