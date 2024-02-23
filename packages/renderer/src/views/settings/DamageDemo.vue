<template>
  <DamagePane :record="demoRecord" />
</template>
<script setup lang="ts">
  import type { RecordState } from '@/store/record';
  import DamagePane from '../damage/DamagePane.vue';
  import { actors } from '@/utils/enums';

  const demoRecord: RecordState = {
    id: 'demo',
    startTimestamp: Date.now() - 1000,
    lastTimestamp: Date.now(),
    players: Array(4).map((_, i) => ({
      id: Number.parseInt(actors[i], 16),
      totalDamage: [9_876_543_210],
      damageInSecond: [98_765],
      damageInMinute: [9_876_543],
      damageInMinutePerSecond: [98_765],
      targets: [],
      actions: [],
    })),
    messages: [],
  };
</script>
