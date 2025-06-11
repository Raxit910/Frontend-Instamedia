import { formatDistanceToNow, parseISO } from 'date-fns';

export const getTimeAgo = (dateString) => {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return '';
  }
};
