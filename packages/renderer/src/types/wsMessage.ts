export interface EnterAreaMessage {
  time_ms: number;
  type: 'enter_area';
}

export interface DamageMessage {
  time_ms: number;
  type: 'damage';
  data: {
    /** [name, id, hash, index] */
    source: [string, number, number, number];
    /** [name, id, hash, index] */
    target: [string, number, number, number];
    action_id: number;
    damage: number;
    flags: number;
  };
}

export interface LoadPartyWeapon {
  weapon_id: number;
  skill1: number;
  skill1_lv: number;
  skill2: number;
  skill2_lv: number;
  skill3: number;
  skill3_lv: number;
  bless_item: number;
}

export interface LoadPartySigil {
  first_trait_id: number;
  first_trait_level: number;
  second_trait_id: number;
  second_trait_level: number;
  sigil_id: number;
  sigil_level: number;
}

export interface LoadPartyPlayer {
  weapon: LoadPartyWeapon;
  sigils: LoadPartySigil[];
  /** 0 or 1 */
  is_online: number;
  /** Character Name */
  c_name: string;
  /** Steam Name */
  d_name: string;
  /** [name, id, hash, index] */
  common_info: [string, number, number, number];
}

export interface LoadPartyMessage {
  time_ms: number;
  type: 'load_party';
  data: Array<LoadPartyPlayer | null>;
}

export type WsMessage = EnterAreaMessage | DamageMessage | LoadPartyMessage;
