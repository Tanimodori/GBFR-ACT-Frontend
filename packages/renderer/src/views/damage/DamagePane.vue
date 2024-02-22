<template>
  <div>
    <span
      v-for="player in validPlayers"
      :key="player.id"
      class="damage-text"
    >
      {{ player.totalDamage[player.totalDamage.length - 1] }}
      <br />
    </span>
  </div>
</template>

<script lang="ts" setup>
  import type { RecordState } from '@/store/record';
  import { computed } from 'vue';
  const props = defineProps<{
    record: RecordState;
  }>();

  const validPlayers = computed(() => {
    console.log(props.record.players);
    return props.record.players.filter(player => player);
  });
</script>

<style scoped lang="less">
  .damage-text {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
</style>
