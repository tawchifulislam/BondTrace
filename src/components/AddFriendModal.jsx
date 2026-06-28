import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useFriendsContext } from '../context/FriendsContext';

const emptyForm = {
  name: '',
  picture: '',
  email: '',
  bio: '',
  tags: '',
  goal: 14,
};

const AddFriendModal = () => {
  const { addFriend } = useFriendsContext();
  const [form, setForm] = useState(emptyForm);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    document.getElementById('add_friend_modal').close();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }

    addFriend({
      name: form.name.trim(),
      picture:
        form.picture.trim() ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(form.name)}`,
      email: form.email.trim(),
      bio: form.bio.trim(),
      tags: form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      goal: Number(form.goal) || 14,
    });

    toast.success(`${form.name} added to your friends`);
    setForm(emptyForm);
    closeModal();
  };

  return (
    <dialog id="add_friend_modal" className="modal">
      <div className="modal-box rounded-2xl">
        <h3 className="font-bold text-lg text-gray-900 mb-4">
          Add a New Friend
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rafiul Hasan"
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
              placeholder="friend@email.com"
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
              placeholder="college, close friend"
              className="input input-bordered w-full mt-1 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="A short note about this friendship"
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
              Add Friend
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddFriendModal;
