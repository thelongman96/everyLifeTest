import moment from 'moment';

moment.locale('en-gb');
moment.updateLocale('en-gb', {
  week: {
    // Set the first day of week to Monday
    dow: 1,
  },
});
