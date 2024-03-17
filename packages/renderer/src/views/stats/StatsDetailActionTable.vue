<template>
  <a-table :columns="columns" :data-source="rows" size="small" :pagination="false" />
</template>

<script setup lang="ts">
  import type { PlayerState } from '@/store/record';
  import { getActionName } from '@/utils/enums';
  import type { TableColumnType } from 'ant-design-vue';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    player: PlayerState;
  }>();

  interface StatsDetailActionTableRow {
    key: number;
    name: string;
    hits: number;
    totalDamage: number;
    min: number;
    max: number;
    avg: number;
  }

  const rows = computed(() => {
    const rows: StatsDetailActionTableRow[] = [];
    for (let i = 0; i < props.player.stats.actions.length; i++) {
      const action = props.player.stats.actions[i];
      if (!action) continue;
      const id = props.player.info.common_info[3];
      rows.push({
        key: action.id,
        name: getActionName(id, action.id),
        hits: action.hits,
        totalDamage: action.damage,
        min: action.min,
        max: action.max,
        avg: Math.round(action.damage / action.hits),
      });
    }
    return rows;
  });

  const allHits = computed(() => {
    return props.player.stats.actions.reduce((prev, curr) => prev + curr.hits, 0);
  });

  const allDamage = computed(() => {
    return props.player.stats.actions.reduce((prev, curr) => prev + curr.damage, 0);
  });

  const { t } = useI18n();
  const columns: TableColumnType<StatsDetailActionTableRow>[] = [
    {
      title: t('statsTable.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('statsTable.hits'),
      dataIndex: 'hits',
      key: 'hits',
      sorter: (a, b) => a.hits - b.hits,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      customRender: ({ text }) => {
        const hits = Number(text);
        const percent = ((hits / allHits.value) * 100).toFixed(1);
        return `${hits.toLocaleString()} (${percent}%)`;
      },
    },
    {
      title: t('statsTable.totalDamage'),
      dataIndex: 'totalDamage',
      key: 'totalDamage',
      sorter: (a, b) => a.totalDamage - b.totalDamage,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      customRender: ({ text }) => {
        const damage = Number(text);
        const percent = ((damage / allDamage.value) * 100).toFixed(1);
        return `${damage.toLocaleString()} (${percent}%)`;
      },
    },
    {
      title: t('statsTable.min'),
      dataIndex: 'min',
      key: 'min',
      sorter: (a, b) => a.min - b.min,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
    },
    {
      title: t('statsTable.max'),
      dataIndex: 'max',
      key: 'max',
      sorter: (a, b) => a.max - b.max,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
    },
    {
      title: t('statsTable.avg'),
      dataIndex: 'avg',
      key: 'avg',
      sorter: (a, b) => a.avg - b.avg,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
    },
  ];
</script>
