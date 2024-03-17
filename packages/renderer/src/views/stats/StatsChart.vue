<template>
  <div class="chart-wrapper">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" layout="horizontal">
      <a-form-item name="anchorVertical" :label="$t('statsTable.columnFilter')">
        <a-select v-model:value="columnFilter" :options="columnFilterNameData" mode="multiple" />
      </a-form-item>
      <a-form-item name="anchorVertical" :label="$t('statsTable.seriesName')">
        <a-select v-model:value="seriesName" :options="seriesNameData" />
      </a-form-item>
    </a-form>
    <v-chart :option="option" class="chart" autoresize />
  </div>
</template>

<script setup lang="ts">
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { computed, ref, watch } from 'vue';
  import { getPlayerNumbers, type RecordState } from '@/store/record';
  import dayjs from '@/utils/dayjs';
  import { getActorName } from '@/utils/enums';
  import { useSettingsStore } from '@/store/settings';
  import { useI18n } from 'vue-i18n';

  use([CanvasRenderer, LineChart, TooltipComponent, LegendComponent, GridComponent]);

  const props = defineProps<{
    record: RecordState;
  }>();

  const durationFormatter = (value: number) => {
    return dayjs.duration(value * 1000).format('m:ss');
  };

  const { t } = useI18n();
  const settingsStore = useSettingsStore();
  const columnFilter = ref(settingsStore.statsTable.columnFilter);
  const seriesName = ref(settingsStore.statsTable.seriesName);
  watch(seriesName, value => {
    settingsStore.statsTable.seriesName = value;
  });
  watch(columnFilter, value => {
    settingsStore.statsTable.columnFilter = value;
  });
  const seriesNameData = computed(() => [
    { label: t('statsTable.totalDamage'), value: 'totalDamage' as const },
    { label: t('statsTable.totalDamagePerSecond'), value: 'totalDamagePerSecond' as const },
    { label: t('statsTable.damageInSecond'), value: 'damageInSecond' as const },
    { label: t('statsTable.damageInTenSecond'), value: 'damageInTenSecond' as const },
    { label: t('statsTable.damageInTenSecondPerSecond'), value: 'damageInTenSecondPerSecond' as const },
    { label: t('statsTable.damageInMinute'), value: 'damageInMinute' as const },
    { label: t('statsTable.damageInMinutePerSecond'), value: 'damageInMinutePerSecond' as const },
  ]);

  const columnFilterNameData = computed(() => [
    { label: t('statsTable.name'), value: 'name' as const },
    ...seriesNameData.value,
  ]);

  const option = computed(() => {
    const legendData: string[] = [];
    const series = [];
    let xAxisData: number[] = [];

    for (let i = 0; i < props.record.players.length; i++) {
      const player = props.record.players[i];
      if (player) {
        const id = player.info.common_info[2];
        const index = player.info.common_info[3];
        legendData.push(`[${index}]` + getActorName(id));
        series.push({
          name: `[${index}]` + getActorName(id),
          type: 'line',
          data: getPlayerNumbers(player, seriesName.value),
          showAllSymbol: false,
        });
        xAxisData = player.stats.totalDamage.map((_, i) => i);
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
  .chart-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .chart {
      height: 100%;
    }
  }
</style>
