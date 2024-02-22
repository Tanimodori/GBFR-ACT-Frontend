import type { WsMessage, WsMessageRaw } from '@/types/wsMessage';
import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';
import { v4 as uuidv4 } from 'uuid';

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
  id: number;
  totalDamage: number[];
  damageInSecond: number[];
  damageInMinute: number[];
  damageInMinutePerSecond: number[];
  targets: PlayerTargetState[];
  actions: PlayerActionState[];
}

export interface RecordState {
  id: string;
  startTimestamp: number;
  lastTimestamp: number;
  players: PlayerState[];
  messages: WsMessage[];
}

export const useRecordStore = defineStore('record', {
  state: () => {
    return {
      ws: null as WebSocket | null,
      activeRecordId: '',
      records: [] as RecordState[],
    };
  },
  actions: {
    connect() {
      if (this.ws) {
        this.ws.close();
      }
      const settingsStore = useSettingsStore();
      const port = settingsStore.port;
      this.ws = new WebSocket(`ws://localhost:${port}`);

      this.ws.onmessage = (event: MessageEvent<string>) => {
        if (event.type === 'message') {
          const timestamp = Date.now();
          const message: WsMessageRaw = JSON.parse(event.data);
          this.parseMessage({
            ...message,
            timestamp,
          });
        }
      };
    },
    addRecord(timestamp?: number, id?: string) {
      timestamp = timestamp ?? Date.now();
      id = id ?? uuidv4() + '-' + timestamp;
      this.records.push({
        id,
        startTimestamp: timestamp,
        lastTimestamp: timestamp,
        players: [],
        messages: [],
      });
      return this.records[this.records.length - 1];
    },
    getCurrentRecord(timestamp?: number): RecordState {
      timestamp = timestamp ?? Date.now();
      let record = this.records.find(record => record.id === this.activeRecordId);
      if (!record) {
        record = this.addRecord(timestamp);
      }
      return record;
    },
    parseMessage(message: WsMessage, recordId?: string) {
      // 1. Update record
      const timestamp = message.timestamp;
      let record = undefined;
      if (recordId) {
        // history message
        record = this.records.find(record => record.id === recordId);
        if (!record) {
          record = this.addRecord(timestamp, recordId);
        }
      } else {
        // live message
        if (message.type === 'enter_area') {
          record = this.addRecord(timestamp);
        } else {
          record = this.getCurrentRecord(timestamp);
        }
        this.activeRecordId = record.id;
      }
      // Temporary disable message logging
      // record.messages.push(message);
      if (record.lastTimestamp < timestamp) {
        record.lastTimestamp = timestamp;
      }
      const frame = Math.floor((timestamp - record.startTimestamp) / 1000);
      const lastFrame = Math.floor((record.lastTimestamp - record.startTimestamp) / 1000);

      // 2. Update players
      if (message.type === 'damage') {
        const { source, target, damage, flags: _flags, action_id: actionId } = message.data;
        const [_sourceType, _sourceIdx, sourceId, sourcePartyIdx] = source;
        const [_targetType, _targetIdx, targetId, _targetPartyIdx] = target;

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

        // 2.2 Find player
        if (!record.players[sourcePartyIdx]) {
          record.players[sourcePartyIdx] = {
            id: sourceId,
            totalDamage: [0],
            damageInSecond: [0],
            damageInMinute: [0],
            damageInMinutePerSecond: [0],
            targets: [],
            actions: [],
          };
        }

        // 2.3 Update frame
        for (let partyIdx = 0; partyIdx < record.players.length; partyIdx++) {
          const player = record.players[partyIdx];
          if (!player) {
            continue;
          }
          for (let frameIdx = player.totalDamage.length; frameIdx <= lastFrame; frameIdx++) {
            let damageDelta = damage;
            if (frameIdx !== frame || partyIdx !== sourcePartyIdx) {
              damageDelta = 0;
            }

            // totalDamage
            player.totalDamage[frameIdx] = player.totalDamage[frameIdx - 1] + damageDelta;

            // damageInSecond
            player.damageInSecond[frameIdx] = (player.damageInSecond[frameIdx] ?? 0) + damageDelta;

            // damageInMinute
            let oldTotalDamage = 0;
            if (frameIdx >= 60) {
              oldTotalDamage = player.totalDamage[frameIdx - 60];
            }
            player.damageInMinute[frameIdx] = player.totalDamage[frameIdx] - oldTotalDamage;

            // damageInMinutePerSecond
            const frames = Math.min(frameIdx, 60);
            player.damageInMinutePerSecond[frameIdx] = Math.floor(player.damageInMinute[frameIdx] / frames);
          }
        }

        // 2.4 Update player
        const player = record.players[sourcePartyIdx];
        // targets
        const playerTarget = player.targets.find(target => target.id === targetId);
        if (!playerTarget) {
          player.targets.push({
            id: targetId,
            damage: damage,
          });
        } else {
          playerTarget.damage += damage;
        }
        // actions
        const playerAction = player.actions.find(action => action.id === actionId);
        if (!playerAction) {
          player.actions.push({
            id: actionId,
            damage: damage,
            hits: 1,
            min: damage,
            max: damage,
          });
        } else {
          playerAction.damage += damage;
          playerAction.hits += 1;
          playerAction.min = Math.min(playerAction.min, damage);
          playerAction.max = Math.max(playerAction.max, damage);
        }
      }
    },
  },
  getters: {
    readyState(): number {
      if (this.ws) {
        return this.ws.readyState;
      }
      return WebSocket.CLOSED;
    },
  },
});
