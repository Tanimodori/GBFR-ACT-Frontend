import i18n from '@/locales';
import en_US from '@/locales/en_US.json';

export type ActorKey = keyof typeof en_US.actors;

export const actors = Object.keys(en_US.actors) as ActorKey[];

export type CommonActionKeys = keyof typeof en_US.actions.common;

export const commonActionKeys = Object.keys(en_US.actions.common) as CommonActionKeys[];

export const getActorName = (id: number) => {
  return i18n.global.t('actors.' + id.toString(16));
};

export const getActionName = (playerId: number, actionId: number) => {
  if (commonActionKeys.includes(actionId.toString() as CommonActionKeys)) {
    return i18n.global.t(`actions.common.${actionId}`);
  } else {
    const key = `actions.${playerId.toString(16)}.${actionId}`;
    if (i18n.global.te(key)) {
      return i18n.global.t(key);
    } else {
      return actionId.toString();
    }
  }
};
