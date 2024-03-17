<template>
  <a-table :columns="columns" :data-source="rows" size="small" :pagination="false" />
</template>

<script setup lang="ts">
  import type { PlayerState } from '@/store/record';
  import { getEnemyName } from '@/utils/enums';
  import type { TableColumnType } from 'ant-design-vue';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    player: PlayerState;
  }>();

  interface StatsDetailTargetTableRow {
    key: number;
    name: string;
    totalDamage: number;
  }

  const rows = computed(() => {
    const rows: StatsDetailTargetTableRow[] = [];
    for (let i = 0; i < props.player.stats.targets.length; i++) {
      const target = props.player.stats.targets[i];
      if (!target) continue;
      rows.push({
        key: target.id,
        name: getEnemyName(target.id),
        totalDamage: target.damage,
      });
    }
    return rows;
  });

  const { t } = useI18n();
  const columns: TableColumnType<StatsDetailTargetTableRow>[] = [
    {
      title: t('statsTable.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('statsTable.totalDamage'),
      dataIndex: 'totalDamage',
      key: 'totalDamage',
      sorter: (a, b) => a.totalDamage - b.totalDamage,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      customRender: ({ text }) => Number(text).toLocaleString(),
    },
  ];
</script>
