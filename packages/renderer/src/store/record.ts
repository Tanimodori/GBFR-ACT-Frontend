import type {WsMessage, WsMessageRaw} from '@/types/wsMessage';
import {defineStore} from 'pinia';
import {useSettingsStore} from './settings';

export interface RecordState {
  id: string;
  startTimestamp: number;
  players: number[];
  records: WsMessage[];
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
    parseMessage(message: WsMessage) {
      console.log(message);
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
