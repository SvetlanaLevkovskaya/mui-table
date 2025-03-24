import dayjs from 'dayjs';

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};
