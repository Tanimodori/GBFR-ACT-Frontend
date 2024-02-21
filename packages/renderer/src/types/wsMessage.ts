export type EnterAreaMessageRaw = {
  type: 'enter_area';
};

export type DamageMessageRaw = {
  type: 'damage';
  data: {
    source: [string, number, number, number];
    target: [string, number, number, number];
    action_id: number;
    damage: number;
    flags: number;
  };
};

export type WsMessageRaw = EnterAreaMessageRaw | DamageMessageRaw;

export type WsMessageTimestamp = {
  timestamp: number;
};

export type EnterAreaMessage = EnterAreaMessageRaw & WsMessageTimestamp;

export type DamageMessage = DamageMessageRaw & WsMessageTimestamp;

export type WsMessage = EnterAreaMessage | DamageMessage;
