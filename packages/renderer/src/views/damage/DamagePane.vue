<template>
  <div class="damage-pane gbfr-act-frontend-damage-pane">
    <table>
      <tr v-for="(player, index) in validPlayers" :key="index" class="gbfr-act-frontend-damage-text">
        <template v-if="player">
          <td v-for="column in columns" :key="column" :class="column">
            <span v-if="column === 'name'">
              {{ `[${player.info.common_info[3]}]` + getActorName(player.info.common_info[2]) }}
            </span>
            <span v-if="column === 'totalDamage'">
              {{ getPlayerData(player, 'totalDamage') }}
            </span>
            <span v-if="column === 'totalDamagePerSecond'">
              {{ getPlayerData(player, 'totalDamagePerSecond') }}
            </span>
            <span v-if="column === 'damageInSecond'">
              {{ getPlayerData(player, 'damageInSecond') }}
            </span>
            <span v-if="column === 'damageInTenSecond'">
              {{ getPlayerData(player, 'damageInTenSecond') }}
            </span>
            <span v-if="column === 'damageInTenSecondPerSecond'">
              {{ getPlayerData(player, 'damageInTenSecondPerSecond') }}
            </span>
            <span v-if="column === 'damageInMinute'">
              {{ getPlayerData(player, 'damageInMinute') }}
            </span>
            <span v-if="column === 'damageInMinutePerSecond'">
              {{ getPlayerData(player, 'damageInMinutePerSecond') }}
            </span>
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import { getPlayerData, getPlayerNumber, type RecordState } from '@/store/record';
  import { useSettingsStore } from '@/store/settings';
  import { useStyleTag } from '@vueuse/core';
  import { computed } from 'vue';
  import { getActorName, validColumnKey, type ValidColumnKey } from '@/utils/enums';
  const props = defineProps<{
    record: RecordState;
  }>();

  const settingsStore = useSettingsStore();

  const columns = computed(() => {
    return settingsStore.damageStyle.colOrder.split(',').filter(key => validColumnKey.includes(key as ValidColumnKey));
  });

  const validPlayers = computed(() => {
    let result = props.record.players.filter(player => player !== undefined);
    result.sort((a, b) => {
      const rowOrderBy = settingsStore.damageStyle.rowOrderBy as ValidColumnKey;
      if (rowOrderBy === 'name') {
        return b.info.common_info[3] - a.info.common_info[3];
      } else {
        return getPlayerNumber(b, rowOrderBy) - getPlayerNumber(a, rowOrderBy);
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
