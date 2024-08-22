"use client";

import React, { useState } from 'react';
import CreateUserModal from './CreateUserModal';

const UserTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const usuarios = [
    { email: 'juan@example.com', name: 'Juan Pérez', roles: ['comite'] },
    { email: 'ana@example.com', name: 'Ana Gómez', roles: ['usuario', 'administrador'] },
    { email: 'pedro@example.com', name: 'Pedro López', roles: ['usuario'] },
  ];

  const handleCreateUser = () => {
    setShowModal(true);
  };

  return (
    <div className="m-8 p-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Usuarios</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Nombre</th>
              <th className="p-2 border-b">Roles</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border-b">{usuario.email}</td>
                <td className="p-2 border-b">{usuario.name}</td>
                <td className="p-2 border-b">{usuario.roles.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button 
          onClick={handleCreateUser} 
          className="bg-cyan-600 text-white py-2 px-6 rounded-md">
          Crear Usuario
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
