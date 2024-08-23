"use client";

import React, { useState } from 'react';
import CreateUserModal from './CreateUserModal';
import { IUser } from '../interfaces/user';

interface Props {
  users: IUser[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  const [showModal, setShowModal] = useState(false);
  const [usersList, setUsersList] = useState(users);
  const handleCreateUser = () => {
    setShowModal(true);
  };

  return (
    <div className="m-8 p-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Roles</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.role.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button 
          onClick={handleCreateUser} 
          className="bg-cyan-600 text-white py-2 px-6 rounded-md">
          Create
        </button>
      </div>

      {showModal && (
        <CreateUserModal 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default UserTable;
