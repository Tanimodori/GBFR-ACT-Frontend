<template>
  <div class="wrapper">
    <DamagePane class="wrapper-pane" :record="demoRecord" />
  </div>
</template>
<script setup lang="ts">
  import type { PlayerState, RecordState } from '@/store/record';
  import DamagePane from '../damage/DamagePane.vue';
  import { actors } from '@/utils/enums';

  const players: PlayerState[] = [];

  let totalDamage = 9_876_543_210;
  let totalDamagePerSecond = 9_876_543_210;
  let damageInSecond = 9_876_543_210;
  let damageInTenSecond = 9_876_543_210;
  let damageInTenSecondPerSecond = 9_876_543_210;
  let damageInMinute = 9_876_543_210;
  let damageInMinutePerSecond = 9_876_543_210;
  for (let i = 0; i < 4; ++i) {
    players.push({
      info: {
        weapon: {
          weapon_id: 0,
          skill1: 0,
          skill1_lv: 0,
          skill2: 0,
          skill2_lv: 0,
          skill3: 0,
          skill3_lv: 0,
          bless_item: 0,
        },
        sigils: [],
        is_online: 0,
        c_name: '',
        d_name: '',
        common_info: ['', 0, Number.parseInt(actors[i], 16), i],
      },
      stats: {
        totalDamage: [totalDamage],
        totalDamagePerSecond: [totalDamagePerSecond],
        damageInSecond: [damageInSecond],
        damageInTenSecond: [damageInTenSecond],
        damageInTenSecondPerSecond: [damageInTenSecondPerSecond],
        damageInMinute: [damageInMinute],
        damageInMinutePerSecond: [damageInMinutePerSecond],
        targets: [],
        actions: [],
      },
    });

    totalDamage = Math.floor(totalDamage / 10);
    damageInSecond = Math.floor(damageInSecond / 10);
    damageInMinute = Math.floor(damageInMinute / 10);
    damageInMinutePerSecond = Math.floor(damageInMinutePerSecond / 10);
  }

  const demoRecord: RecordState = {
    id: 'demo',
    startTimestamp: Date.now() - 1000,
    lastTimestamp: Date.now(),
    players,
    messages: [],
    hasBattleMessage: true,
  };
</script>

<style scoped lang="less">
  .wrapper {
    padding: 16px;

    width: 100%;
    height: 250px;

    // Background
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(135deg, transparent 75%, #ccc 75%);
    background-size: 24px 24px; /* Must be a square */
    background-position: 0 0, 12px 0, 12px -12px, 0px 12px; /* Must be half of one side of the square */

    // Border
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
