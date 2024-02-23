<template>
  <div>
    <a-table :columns="columns" :data-source="rows" size="middle" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'detail'">
          <a-button type="link" @click="showDetail(record.key)">
            <MoniterOutlined class="anticon" />
          </a-button>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="open"
      width="100%"
      :title="title"
      :cancel-button-props="{ style: { display: 'none' } }"
      @ok="handleOk"
    >
      <StatsDetail :player="currentPlayer" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { type RecordState } from '@/store/record';
  import { getActorName } from '@/utils/enums';
  import type { TableColumnType } from 'ant-design-vue';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import MoniterOutlined from '~icons/ant-design/monitor-outlined';
  import StatsDetail from './StatsDetail.vue';
  import { onUnmounted } from 'vue';

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
        key: player.index,
        name: `[${player.index}]` + getActorName(player.id),
        totalDamage: player.totalDamage[frame],
        damageInMinute: player.damageInMinute[frame],
        damageInSecond: player.damageInSecond[frame],
        damageInMinutePerSecond: player.damageInMinutePerSecond[frame],
      });
    }
    return rows;
  });

  const allDamage = computed(() => {
    let result = 0;
    for (let i = 0; i < props.record.players.length; i++) {
      const player = props.record.players[i];
      if (!player) continue;
      result += player.totalDamage[player.totalDamage.length - 1];
    }
    return result;
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
      customRender: ({ text }) => {
        const damage = Number(text);
        const percent = ((damage / allDamage.value) * 100).toFixed(1);
        return `${damage.toLocaleString()} (${percent}%)`;
      },
      align: 'right',
    },
    {
      title: t('statsTable.damageInMinute'),
      dataIndex: 'damageInMinute',
      key: 'damageInMinute',
      sorter: (a, b) => a.damageInMinute - b.damageInMinute,
      sortDirections: ['descend', 'ascend'],
      customRender: ({ text }) => Number(text).toLocaleString(),
      align: 'right',
    },
    {
      title: t('statsTable.damageInSecond'),
      dataIndex: 'damageInSecond',
      key: 'damageInSecond',
      sorter: (a, b) => a.damageInSecond - b.damageInSecond,
      sortDirections: ['descend', 'ascend'],
      customRender: ({ text }) => Number(text).toLocaleString(),
      align: 'right',
    },
    {
      title: t('statsTable.damageInMinutePerSecond'),
      dataIndex: 'damageInMinutePerSecond',
      key: 'damageInMinutePerSecond',
      sorter: (a, b) => a.damageInMinutePerSecond - b.damageInMinutePerSecond,
      sortDirections: ['descend', 'ascend'],
      customRender: ({ text }) => Number(text).toLocaleString(),
      align: 'right',
    },
    {
      title: t('statsTable.detail'),
      key: 'detail',
    },
  ];

  const open = ref(false);
  const currentKey = ref(0);
  const currentPlayer = computed(() => props.record.players[currentKey.value]);
  const title = computed(() => rows.value[currentKey.value]?.name);
  const showDetail = (key: number) => {
    currentKey.value = key;
    open.value = true;
  };
  const handleOk = () => {
    open.value = false;
  };

  onUnmounted(() => {
    open.value = false;
  });
</script>
