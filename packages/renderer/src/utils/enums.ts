import i18n from '@/locales';
import en_US from '@/locales/en_US.json';

export const getActorName = (id: number) => {
  return i18n.global.t('actors.' + id.toString(16));
};

export type ActorKey = keyof typeof en_US.actors;

export const actors = Object.keys(en_US.actors) as ActorKey[];
