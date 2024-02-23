<template>
  <div class="damage-pane gbfr-act-frontend-damage-pane">
    <table>
      <tr v-for="(player, index) in validPlayers" :key="player.id" class="gbfr-act-frontend-damage-text">
        <td v-for="column in columns" :key="column" :class="column">
          <span v-if="column === 'name'">{{ `[${index}]` + getActorName(player.id) }}</span>
          <span v-if="column === 'totalDamage'">{{ player['totalDamage'][player['totalDamage'].length - 1] }}</span>
          <span v-if="column === 'damageInSecond'">
            {{ player['damageInSecond'][player['damageInSecond'].length - 1] }}
          </span>
          <span v-if="column === 'damageInMinute'">
            {{ player['damageInMinute'][player['damageInMinute'].length - 1] }}
          </span>
          <span v-if="column === 'damageInMinutePerSecond'">
            {{ player['damageInMinutePerSecond'][player['damageInMinutePerSecond'].length - 1] }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import type { RecordState } from '@/store/record';
  import { useSettingsStore } from '@/store/settings';
  import { useStyleTag } from '@vueuse/core';
  import { computed } from 'vue';
  import { getActorName } from '@/utils/enums';
  const props = defineProps<{
    record: RecordState;
  }>();

  const validPlayers = computed(() => {
    return props.record.players.filter(player => player);
  });

  const settingsStore = useSettingsStore();

  const validColumnKey = ['name', 'totalDamage', 'damageInSecond', 'damageInMinute', 'damageInMinutePerSecond'];
  const columns = computed(() => {
    return settingsStore.damageStyle.colOrder.split(',').filter(key => validColumnKey.includes(key));
  });

  const injectStyle = computed(() => {
    const {
      bgColor,
      bgCornerSize,
      bgPadding,
      fontFace,
      fontColor,
      fontSize,
      fontWeight,
      fontBorderColor,
      fontBorderSize,
    } = settingsStore.damageStyle;
    return `.gbfr-act-frontend-damage-pane {
  background-color: ${bgColor};
  border-radius: ${bgCornerSize};
  padding: ${bgPadding};
}
.gbfr-act-frontend-damage-text {
  color: ${fontColor};
  font-family: "${fontFace}";
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

    .gbfr-act-frontend-damage-text td {
      padding-left: 5px;
      padding-right: 5px;

      &.name {
        text-align: left;
      }

      &.totalDamage,
      &.damageInSecond,
      &.damageInMinute,
      &.damageInMinutePerSecond {
        text-align: right;
      }
    }
  }
</style>
