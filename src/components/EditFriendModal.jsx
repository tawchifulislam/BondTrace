import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useFriendsContext } from '../context/FriendsContext';

const toFormState = friend => ({
  name: friend?.name || '',
  picture: friend?.picture || '',
  email: friend?.email || '',
  bio: friend?.bio || '',
  tags: friend?.tags?.join(', ') || '',
  goal: friend?.goal || 14,
});

const EditFriendModal = ({ friend }) => {
  const { updateFriend } = useFriendsContext();
  // initialize form from friend; when friend changes we remount the dialog (see key on dialog)
  const [form, setForm] = useState(() => toFormState(friend));

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    document.getElementById('edit_friend_modal').close();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }

    updateFriend(friend.id, {
      name: form.name.trim(),
      picture: form.picture.trim() || friend.picture,
      email: form.email.trim(),
      bio: form.bio.trim(),
      tags: form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      goal: Number(form.goal) || 14,
    });

    toast.success('Profile updated');
    closeModal();
  };

  if (!friend) return null;

  return createPortal(
    <dialog id="edit_friend_modal" className="modal" key={friend.id}>
      <div className="modal-box rounded-2xl">
        <h3 className="font-bold text-lg text-gray-900 mb-4">
          Edit {friend.name}'s Profile
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full mt-1 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500">
              Picture URL
            </label>
            <input
              type="url"
              name="picture"
              value={form.picture}
              onChange={handleChange}
              placeholder="https://..."
              className="input input-bordered w-full mt-1 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full mt-1 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="input input-bordered w-full mt-1 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={2}
              className="textarea textarea-bordered w-full mt-1 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500">
              Contact Goal (days)
            </label>
            <input
              type="number"
              name="goal"
              min={1}
              value={form.goal}
              onChange={handleChange}
              className="input input-bordered w-full mt-1 rounded-lg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Next due date will be calculated automatically based on this goal.
            </p>
          </div>

          <div className="modal-action mt-5">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-[#244D3F] hover:bg-[#1b3a2f] text-white rounded-full border-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body,
  );
};

export default EditFriendModal;
