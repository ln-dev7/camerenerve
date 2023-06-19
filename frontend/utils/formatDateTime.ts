import moment from 'moment';
import 'moment/locale/fr';

function formatDateTime(date: string) {
  moment.locale('fr');
  const now = moment();
  const targetDateUtc = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');
  const targetDateLocal = targetDateUtc.local();

  // conast targetDateLocal = moment(date);

  if (now.diff(targetDateLocal, 'days') >= 1) {
    return targetDateLocal.format('DD MMM YYYY');
  } else {
    return targetDateLocal.fromNow();
  }
}

export default formatDateTime;
