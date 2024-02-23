import i18n from '@/locales';

export const getActorName = (id: number) => {
  return i18n.global.t('actors.' + id.toString(16));
};
