import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import updateLocale from 'dayjs/plugin/updateLocale';

// locales
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(updateLocale);

const langs = ['en', 'zh_CN'];

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
