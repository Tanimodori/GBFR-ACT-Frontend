<template>
  <a-table :columns="columns" :data-source="rows" size="middle" :pagination="false" />
</template>

<script lang="ts" setup>
  import { type RecordState } from '@/store/record';
  import { getActorName } from '@/utils/enums';
  import type { TableColumnType } from 'ant-design-vue';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps<{
    record: RecordState;
  }>();

  interface StatsTableRow {
    key: number;
    name: string;
    totalDamage: number;
    damageInMinute: number;
    damageInSecond: number;
    damageInMinutePerSecond: number;
  }

  const rows = computed(() => {
    const rows: StatsTableRow[] = [];
    for (let i = 0; i < props.record.players.length; i++) {
      const player = props.record.players[i];
      if (!player) continue;
      const frame = player.totalDamage.length - 1;
      rows.push({
        key: i,
        name: `[${i}]` + getActorName(player.id),
        totalDamage: player.totalDamage[frame],
        damageInMinute: player.damageInMinute[frame],
        damageInSecond: player.damageInSecond[frame],
        damageInMinutePerSecond: player.damageInMinutePerSecond[frame],
      });
    }
    return rows;
  });

  const columns: TableColumnType<StatsTableRow>[] = [
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
    },
    {
      title: t('statsTable.damageInMinute'),
      dataIndex: 'damageInMinute',
      key: 'damageInMinute',
      sorter: (a, b) => a.damageInMinute - b.damageInMinute,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('statsTable.damageInSecond'),
      dataIndex: 'damageInSecond',
      key: 'damageInSecond',
      sorter: (a, b) => a.damageInSecond - b.damageInSecond,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('statsTable.damageInMinutePerSecond'),
      dataIndex: 'damageInMinutePerSecond',
      key: 'damageInMinutePerSecond',
      sorter: (a, b) => a.damageInMinutePerSecond - b.damageInMinutePerSecond,
      sortDirections: ['descend', 'ascend'],
    },
  ];
</script>
