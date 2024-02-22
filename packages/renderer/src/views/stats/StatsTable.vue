<template>
  <a-table
    :columns="columns"
    :data-source="rows"
    size="middle"
    :pagination="false"
  />
</template>

<script lang="ts" setup>
  import { type RecordState } from '@/store/record';
  import type { TableColumnType } from 'ant-design-vue';
  import { computed } from 'vue';

  const props = defineProps<{
    record: RecordState;
  }>();

  interface StatsTableRow {
    key: number;
    name: number;
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
        name: player.id,
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Total Damage',
      dataIndex: 'totalDamage',
      key: 'totalDamage',
      sorter: (a, b) => a.totalDamage - b.totalDamage,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Damage In Minute',
      dataIndex: 'damageInMinute',
      key: 'damageInMinute',
      sorter: (a, b) => a.damageInMinute - b.damageInMinute,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Damage In Second',
      dataIndex: 'damageInSecond',
      key: 'damageInSecond',
      sorter: (a, b) => a.damageInSecond - b.damageInSecond,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Damage In Minute Per Second',
      dataIndex: 'damageInMinutePerSecond',
      key: 'damageInMinutePerSecond',
      sorter: (a, b) => a.damageInMinutePerSecond - b.damageInMinutePerSecond,
      sortDirections: ['descend', 'ascend'],
    },
  ];
</script>
