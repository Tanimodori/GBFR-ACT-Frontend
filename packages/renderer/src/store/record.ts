import type {WsMessage} from '@/types/wsMessage';
import {defineStore} from 'pinia';
import {useSettingsStore} from './settings';

export interface RecordState {
  startTimestamp: number;
  players: number[];
  records: WsMessage[];
}

export const useRecordStore = defineStore('record', {
  state: () => {
    return {
      ws: null as WebSocket | null,
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

      this.ws.onmessage = event => {
        console.log(event);
      };
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
