import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

const langs = ['en', 'zh-Hans'];

for (const lang of langs) {
  dayjs.updateLocale(lang, {
    relativeTime: {
      s: '%ds',
      m: '%dm',
      mm: '%dm',
      h: '%dh',
      hh: '%dh',
      d: '%dD',
      dd: '%dD',
      M: '%dM',
      MM: '%dM',
      y: '%dY',
      yy: '%dY',
    },
  });
}

export default dayjs;
