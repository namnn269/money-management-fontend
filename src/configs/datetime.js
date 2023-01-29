import moment from 'moment/moment';

export const dateFormat = 'MM/DD/YYYY';
export const convertDateBeforeFetch = (date) => moment(date).format(dateFormat);
