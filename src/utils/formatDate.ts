import dayjs from 'dayjs';

export const formatDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YY');
};
