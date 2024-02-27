import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import updateLocale from 'dayjs/plugin/updateLocale';

// locales
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';
import 'dayjs/locale/zh-tw';

const thresholds = [
  { l: 's', r: 1 },
  { l: 'ss', r: 59, d: 'second' },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 30, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y' },
  { l: 'yy', d: 'year' },
];

dayjs.extend(relativeTime, { thresholds });
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(updateLocale);

const langs = ['en', 'zh_CN', 'zh_TW', 'zh_HK'];

for (const lang of langs) {
  dayjs.updateLocale(lang, {
    relativeTime: {
      s: '%ds',
      ss: '%ds',
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
