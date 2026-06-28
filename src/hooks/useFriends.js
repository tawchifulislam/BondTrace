import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'friends';

const seedFriendsIfNeeded = async () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);

  const res = await fetch('/friends.json');
  const data = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
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

  const getFriendById = useCallback(
    id => friends.find(f => String(f.id) === String(id)),
    [friends],
  );

  const addFriend = useCallback(
    friendData => {
      const newFriend = {
        id: uuidv4(),
        days_since_contact: 0,
        status: 'on-track',
        tags: [],
        goal: 14,
        next_due_date: new Date().toISOString().split('T')[0],
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

  return {
    friends,
    loading,
    getFriendById,
    addFriend,
    updateFriend,
    deleteFriend,
  };
};
