<template>
  <div class="damage-pane gbfr-act-frontend-damage-pane">
    <table>
      <tr v-for="(player, index) in validPlayers" :key="index" class="gbfr-act-frontend-damage-text">
        <template v-if="player">
          <td v-for="column in columns" :key="column" :class="column">
            <span v-if="column === 'name'">{{ `[${player.index}]` + getActorName(player.id) }}</span>
            <span v-if="column === 'totalDamage'">
              {{ player['totalDamage'][player['totalDamage'].length - 1].toLocaleString() }}
            </span>
            <span v-if="column === 'damageInSecond'">
              {{ player['damageInSecond'][player['damageInSecond'].length - 1].toLocaleString() }}
            </span>
            <span v-if="column === 'damageInMinute'">
              {{ player['damageInMinute'][player['damageInMinute'].length - 1].toLocaleString() }}
            </span>
            <span v-if="column === 'damageInMinutePerSecond'">
              {{ player['damageInMinutePerSecond'][player['damageInMinutePerSecond'].length - 1].toLocaleString() }}
            </span>
          </td>
        </template>
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

  const settingsStore = useSettingsStore();

  const validColumnKey = ['name', 'totalDamage', 'damageInSecond', 'damageInMinute', 'damageInMinutePerSecond'];
  type ValidColumnKey = 'name' | 'totalDamage' | 'damageInSecond' | 'damageInMinute' | 'damageInMinutePerSecond';
  const columns = computed(() => {
    return settingsStore.damageStyle.colOrder.split(',').filter(key => validColumnKey.includes(key));
  });

  const validPlayers = computed(() => {
    let result = props.record.players.filter(player => player !== undefined);
    result.sort((a, b) => {
      const rowOrderBy = settingsStore.damageStyle.rowOrderBy as ValidColumnKey;
      if (rowOrderBy === 'name') {
        return a.index - b.index;
      } else {
        return b[rowOrderBy][b[rowOrderBy].length - 1] - a[rowOrderBy][a[rowOrderBy].length - 1];
      }
    });
    if (settingsStore.damageStyle.rowOrder === 'asc') {
      result = result.reverse();
    }
    return result;
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
