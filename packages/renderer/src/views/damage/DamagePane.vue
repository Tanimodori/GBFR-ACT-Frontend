<template>
  <div class="damage-pane gbfr-act-frontend-damage-pane">
    <span v-for="player in validPlayers" :key="player.id" class="gbfr-act-frontend-damage-text">
      {{ player.totalDamage[player.totalDamage.length - 1] }}
      <br />
    </span>
  </div>
</template>

<script lang="ts" setup>
  import type { RecordState } from '@/store/record';
  import { useSettingsStore } from '@/store/settings';
  import { useStyleTag } from '@vueuse/core';
  import { computed } from 'vue';
  const props = defineProps<{
    record: RecordState;
  }>();

  const validPlayers = computed(() => {
    return props.record.players.filter(player => player);
  });

  const settingsStore = useSettingsStore();

  const injectStyle = computed(() => {
    const { bgColor, bgCornerSize, bgPadding, fontColor, fontSize, fontWeight, fontBorderColor, fontBorderSize } =
      settingsStore.damageStyle;
    return `.gbfr-act-frontend-damage-pane {
  background-color: ${bgColor};
  border-radius: ${bgCornerSize};
  padding: ${bgPadding};
}
.gbfr-act-frontend-damage-text {
  color: ${fontColor};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  -webkit-text-stroke: ${fontBorderSize} ${fontBorderColor};
}`;
  });

  useStyleTag(injectStyle);
</script>

<style scoped lang="less">
  .damage-pane {
    width: fit-content;
  }
</style>
