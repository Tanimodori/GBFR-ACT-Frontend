export type EnterAreaMessage = {
  type: 'enter_area';
};

export type DamageMessage = {
  type: 'damage';
  data: {
    source: [string, number, number, number];
    target: [string, number, number, number];
    action_id: number;
    damage: number;
    flags: number;
  };
};

export type WsMessage = EnterAreaMessage | DamageMessage;
