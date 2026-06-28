import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { useFriendsContext } from '../context/FriendsContext';

const DeleteFriendModal = ({ friend }) => {
  const { deleteFriend } = useFriendsContext();
  const navigate = useNavigate();

  const closeModal = () => {
    document.getElementById('delete_friend_modal').close();
  };

  const handleDelete = () => {
    if (!friend) return;
    deleteFriend(friend.id);
    toast.success(`${friend.name} has been removed`);
    closeModal();
    navigate('/');
  };

  if (!friend) return null;

  return createPortal(
    <dialog id="delete_friend_modal" className="modal">
      <div className="modal-box rounded-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl mx-auto mb-4">
          <MdDelete />
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2">
          Delete {friend.name}?
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          This will permanently remove {friend.name} from your friends list.
          This action cannot be undone.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-ghost rounded-full px-6"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn bg-red-500 hover:bg-red-600 text-white rounded-full border-none px-6"
          >
            Delete
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body,
  );
};

export default DeleteFriendModal;
