<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="target" :tab="$t('stats.target')">
      <StatsDetailTargetTable :player="props.player" />
    </a-tab-pane>
    <a-tab-pane key="action" :tab="$t('stats.action')">
      <StatsDetailActionTable :player="props.player" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import type { PlayerState } from '@/store/record';
  import { ref } from 'vue';
  import StatsDetailActionTable from './StatsDetailActionTable.vue';
  import StatsDetailTargetTable from './StatsDetailTargetTable.vue';
  const activeKey = ref('target');
  const props = defineProps<{
    player: PlayerState;
  }>();
</script>
