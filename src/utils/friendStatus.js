export const getDaysSinceContact = lastContactDate => {
  if (!lastContactDate) return null;
  const last = new Date(lastContactDate);
  const today = new Date();
  last.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffMs = today - last;
  return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
};

export const getStatus = (daysSinceContact, goal) => {
  if (daysSinceContact === null || !goal) return 'on-track';
  const ratio = daysSinceContact / goal;
  if (ratio >= 1) return 'overdue';
  if (ratio >= 0.7) return 'almost due';
  return 'on-track';
};

export const getNextDueDate = (lastContactDate, goal) => {
  if (!lastContactDate || !goal) return null;
  const last = new Date(lastContactDate);
  last.setDate(last.getDate() + Number(goal));
  return last.toISOString().split('T')[0];
};

export const getDerivedFriendInfo = friend => {
  const daysSinceContact = getDaysSinceContact(friend.last_contact_date);
  const status = getStatus(daysSinceContact, friend.goal);
  const nextDueDate = getNextDueDate(friend.last_contact_date, friend.goal);
  return { daysSinceContact, status, nextDueDate };
};
