"use client";

import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function CreateUserModal({ onClose }: Props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);

  const handleRoleChange = (role: string) => {
    setRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, roles });

    const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role : roles }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('data', data);
    } else {
        console.error('Error al validar la denuncia');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/3">
        <h2 className="text-2xl mb-4">Create User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Roles</label>
          <div className="flex space-x-4">
            {['commission', 'administrator'].map((role) => (
              <label key={role} className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  value={role} 
                  checked={roles.includes(role)} 
                  onChange={() => handleRoleChange(role)} 
                  className="form-checkbox h-5 w-5 text-cyan-600"
                />
                <span className="ml-2 text-gray-700">{role}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};