import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDerivedFriendInfo } from '../utils/friendStatus';

const STORAGE_KEY = 'friends';

const migrateLegacyFriend = friend => {
  if (friend.last_contact_date) return friend; // already migrated

  const days = friend.days_since_contact ?? 0;
  const lastContact = new Date();
  lastContact.setDate(lastContact.getDate() - days);

  return {
    ...friend,
    last_contact_date: lastContact.toISOString().split('T')[0],
  };
};

const seedFriendsIfNeeded = async () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);

  const res = await fetch('/friends.json');
  const data = await res.json();
  const migrated = data.map(migrateLegacyFriend);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  return migrated;
};

export const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedFriendsIfNeeded()
      .then(data => setFriends(data))
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(updated => {
    setFriends(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const enrichedFriends = friends.map(f => ({
    ...f,
    ...getDerivedFriendInfo(f),
  }));

  const getFriendById = useCallback(
    id => {
      const found = friends.find(f => String(f.id) === String(id));
      if (!found) return null;
      return { ...found, ...getDerivedFriendInfo(found) };
    },
    [friends],
  );

  const addFriend = useCallback(
    friendData => {
      const newFriend = {
        id: uuidv4(),
        last_contact_date: new Date().toISOString().split('T')[0],
        tags: [],
        goal: 14,
        ...friendData,
      };
      const updated = [...friends, newFriend];
      persist(updated);
      return newFriend;
    },
    [friends, persist],
  );

  const updateFriend = useCallback(
    (id, changes) => {
      const updated = friends.map(f =>
        String(f.id) === String(id) ? { ...f, ...changes } : f,
      );
      persist(updated);
    },
    [friends, persist],
  );

  const deleteFriend = useCallback(
    id => {
      const updated = friends.filter(f => String(f.id) !== String(id));
      persist(updated);
    },
    [friends, persist],
  );

  const markContacted = useCallback(
    id => {
      updateFriend(id, {
        last_contact_date: new Date().toISOString().split('T')[0],
      });
    },
    [updateFriend],
  );

  return {
    friends: enrichedFriends,
    loading,
    getFriendById,
    addFriend,
    updateFriend,
    deleteFriend,
    markContacted,
  };
};
