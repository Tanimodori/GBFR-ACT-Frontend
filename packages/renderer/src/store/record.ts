import type { LoadPartyPlayer, WsMessage } from '@/types/wsMessage';
import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';
import { v4 as uuidv4 } from 'uuid';
import { computed, ref } from 'vue';
import { useWebSocket } from '@vueuse/core';

export interface PlayerTargetState {
  id: number;
  damage: number;
}

export interface PlayerActionState {
  id: number;
  damage: number;
  hits: number;
  min: number;
  max: number;
}

export interface PlayerState {
  info: LoadPartyPlayer;
  stats: {
    totalDamage: number[];
    totalDamagePerSecond: number[];
    damageInSecond: number[];
    damageInTenSecond: number[];
    damageInTenSecondPerSecond: number[];
    damageInMinute: number[];
    damageInMinutePerSecond: number[];
    targets: PlayerTargetState[];
    actions: PlayerActionState[];
  };
}

export interface RecordState {
  id: string;
  startTimestamp: number;
  lastTimestamp: number;
  players: PlayerState[];
  messages: WsMessage[];
  hasBattleMessage: boolean;
}

export const useRecordStore = defineStore('record', () => {
  const activeRecordId = ref('');
  const records = ref<RecordState[]>([]);

  const settingsStore = useSettingsStore();
  const wsUrl = computed(() => {
    const host = settingsStore.connection.host;
    const port = settingsStore.connection.port;
    return `ws://${host}:${port}`;
  });

  const {
    ws,
    status: readyState,
    open: connect,
    close: disconnect,
  } = useWebSocket(wsUrl, {
    immediate: false,
    autoReconnect: {
      retries: () => settingsStore.connection.retry,
    },
    onMessage: (_ws, event: MessageEvent<string>) => {
      if (event.type === 'message') {
        const timestamp = Date.now();
        const message: WsMessage = JSON.parse(event.data);
        /** Defence for older version of ACT, will be remove soon */
        if (!message.time_ms) {
          message.time_ms = timestamp;
        }
        parseMessage(message);
      }
    },
  });

  const wsCurrentUrl = computed(() => ws.value?.url);

  const addRecord = (timestamp?: number, id?: string) => {
    timestamp = timestamp ?? Date.now();
    id = id ?? uuidv4() + '-' + timestamp;
    records.value.push({
      id,
      startTimestamp: timestamp,
      lastTimestamp: timestamp,
      players: [],
      messages: [],
      hasBattleMessage: false,
    });
    return records.value[records.value.length - 1];
  };

  const getCurrentRecord = (timestamp?: number) => {
    timestamp = timestamp ?? Date.now();
    let record = records.value.find(record => record.id === activeRecordId.value);
    if (!record) {
      record = addRecord(timestamp);
    }
    return record;
  };

  const parseMessage = (message: WsMessage, recordId?: string) => {
    // 1. Update record
    const timestamp = message.time_ms;
    let record = undefined;
    if (recordId) {
      // history message
      record = records.value.find(record => record.id === recordId);
      if (!record) {
        record = addRecord(timestamp, recordId);
      }
    } else {
      // live message
      if (message.type === 'enter_area') {
        record = addRecord(timestamp);
      } else {
        record = getCurrentRecord(timestamp);
      }
      activeRecordId.value = record.id;
    }
    record.messages.push(message);
    if (record.lastTimestamp < timestamp) {
      record.lastTimestamp = timestamp;
    }
    const frame = Math.floor((timestamp - record.startTimestamp) / 1000);
    const lastFrame = Math.floor((record.lastTimestamp - record.startTimestamp) / 1000);

    // 2. Update players
    if (message.type === 'load_party') {
      record.hasBattleMessage = true;
      const players = message.data;
      for (const player of players) {
        if (!player) {
          continue;
        }
        const playerState: PlayerState = {
          info: player,
          stats: {
            totalDamage: new Array(lastFrame + 1).fill(0),
            totalDamagePerSecond: new Array(lastFrame + 1).fill(0),
            damageInSecond: new Array(lastFrame + 1).fill(0),
            damageInTenSecond: new Array(lastFrame + 1).fill(0),
            damageInTenSecondPerSecond: new Array(lastFrame + 1).fill(0),
            damageInMinute: new Array(lastFrame + 1).fill(0),
            damageInMinutePerSecond: new Array(lastFrame + 1).fill(0),
            targets: [],
            actions: [],
          },
        };
        record.players[player.common_info[3]] = playerState;
      }
    } else if (message.type === 'damage') {
      record.hasBattleMessage = true;
      const { source: _source, target: _target, damage, flags: flags, action_id: actionId } = message.data;
      const [_sourceType, _sourceIdx, _sourceId, sourcePartyIdx] = _source;
      const [_targetType, _targetIdx, targetId, _targetPartyIdx] = _target;

      // 2.1 Filter out damage
      /**
       * https://github.com/nyaoouo/GBFR-ACT/issues/14
       * 对欧根附加炸弹造成的伤害不进行记录
       */
      if (targetId === 0x22a350f) return;
      /**
       * Do not record damage dealt by the enemy
       */
      if (sourcePartyIdx === -1) return;

      const correctActionId = flags & (1 << 15) ? -3 : actionId;

      // 2.2 Find player
      if (!record.players[sourcePartyIdx]) {
        console.error('Player not found', sourcePartyIdx, record.players);
      }

      // 2.3 Update frame
      for (let partyIdx = 0; partyIdx < record.players.length; partyIdx++) {
        const player = record.players[partyIdx];
        if (!player) {
          continue;
        }
        const startFrame = Math.min(frame, player.stats.totalDamage.length);
        for (let frameIdx = startFrame; frameIdx <= lastFrame; frameIdx++) {
          let damageDelta = damage;
          if (frameIdx !== frame || partyIdx !== sourcePartyIdx) {
            damageDelta = 0;
          }

          // totalDamage
          let oldTotalDamage;
          if (player.stats.totalDamage[frameIdx] !== undefined) {
            oldTotalDamage = player.stats.totalDamage[frameIdx];
          } else {
            if (frameIdx > 0) {
              oldTotalDamage = player.stats.totalDamage[frameIdx - 1];
            } else {
              oldTotalDamage = 0;
            }
          }
          player.stats.totalDamage[frameIdx] = oldTotalDamage + damageDelta;

          // totalDamagePerSecond
          player.stats.totalDamagePerSecond[frameIdx] = Math.floor(player.stats.totalDamage[frameIdx] / (frameIdx + 1));

          // damageInSecond
          player.stats.damageInSecond[frameIdx] = (player.stats.damageInSecond[frameIdx] ?? 0) + damageDelta;

          // damageInTenSecond
          let oldTotalDamageInTenSecond = 0;
          if (frameIdx >= 10) {
            oldTotalDamageInTenSecond = player.stats.totalDamage[frameIdx - 10];
          }
          player.stats.damageInTenSecond[frameIdx] = player.stats.totalDamage[frameIdx] - oldTotalDamageInTenSecond;

          // damageInTenSecondPerSecond
          const framesInTenSecond = Math.max(Math.min(frameIdx, 10), 1);
          player.stats.damageInTenSecondPerSecond[frameIdx] = Math.floor(
            player.stats.damageInTenSecond[frameIdx] / framesInTenSecond,
          );

          // damageInMinute
          let oldTotalDamageInMinute = 0;
          if (frameIdx >= 60) {
            oldTotalDamageInMinute = player.stats.totalDamage[frameIdx - 60];
          }
          player.stats.damageInMinute[frameIdx] = player.stats.totalDamage[frameIdx] - oldTotalDamageInMinute;

          // damageInMinutePerSecond
          const framesInMinute = Math.max(Math.min(frameIdx, 60), 1);
          player.stats.damageInMinutePerSecond[frameIdx] = Math.floor(
            player.stats.damageInMinute[frameIdx] / framesInMinute,
          );
        }
      }

      // 2.4 Update player
      const player = record.players[sourcePartyIdx];
      // targets
      const targets = player.stats.targets;
      const target = targets.find(t => t.id === targetId);
      if (!target) {
        targets.push({
          id: targetId,
          damage: damage,
        });
      } else {
        target.damage += damage;
      }
      // actions
      const actions = player.stats.actions;
      const action = actions.find(a => a.id === correctActionId);
      if (!action) {
        actions.push({
          id: correctActionId,
          damage: damage,
          hits: 1,
          min: damage,
          max: damage,
        });
      } else {
        action.damage += damage;
        action.hits += 1;
        action.min = Math.min(action.min, damage);
        action.max = Math.max(action.max, damage);
      }
    }
  };

  return {
    activeRecordId,
    records,
    wsCurrentUrl,
    connect,
    disconnect,
    addRecord,
    getCurrentRecord,
    parseMessage,
    readyState,
  };
});

export const validPlayerNumberName = [
  'totalDamage',
  'totalDamagePerSecond',
  'damageInSecond',
  'damageInTenSecond',
  'damageInTenSecondPerSecond',
  'damageInMinute',
  'damageInMinutePerSecond',
] as const;
export type ValidPlayerNumberName = (typeof validPlayerNumberName)[number];
export const getPlayerNumbers = (player: PlayerState, seriesName: string): number[] => {
  if (!validPlayerNumberName.includes(seriesName as ValidPlayerNumberName)) {
    throw new Error('Invalid seriesName');
  }
  return player.stats[seriesName as ValidPlayerNumberName];
};

export const getPlayerNumber = (player: PlayerState, seriesName: string, frame = -1): number => {
  const arr = getPlayerNumbers(player, seriesName);
  frame = frame === -1 ? arr.length - 1 : frame;
  return arr[frame];
};

export const validPlayerStringName = ['index', 'name', 'd_name', 'c_name', ...validPlayerNumberName] as const;
export type ValidPlayerStringName = (typeof validPlayerStringName)[number];
export const getPlayerData = <T extends PlayerState>(player: T, dataName: string, frame = -1): string => {
  if (!validPlayerStringName.includes(dataName as ValidPlayerStringName)) {
    throw new Error('Invalid dataName');
  }
  if (dataName === 'index') {
    return player.info.common_info[3].toString();
  } else if (dataName === 'name') {
    return player.info.common_info[0].toString();
  } else if (dataName === 'd_name') {
    return player.info.d_name;
  } else if (dataName === 'c_name') {
    return player.info.c_name;
  } else {
    return getPlayerNumber(player, dataName, frame).toLocaleString();
  }
};
