"use client";
import React, { useState, FormEvent } from 'react';
import { redirect } from 'next/navigation';

export const TrackComplaintForm: React.FC = () => {
    const [idComplaint, setComplaintId] = useState<string>('');
    const [passComplaint, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                id: idComplaint,
                pass: passComplaint,
            }),
        });

        
        if (response.ok) {
            console.log(response);

        } else {
            // Manejar error de validación
            console.error('Error al validar la denuncia');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Revisa el estado de tu denuncia</h2>
            <input
                type="text"
                placeholder="Número de denuncia"
                value={idComplaint}
                onChange={(e) => setComplaintId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <input
                type="password"
                placeholder="Clave"
                value={passComplaint}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-6"
            />
            <button type="submit" className="w-full bg-cyan-500 text-white py-3 rounded-md">
                Continuar
            </button>
        </form>
    );
};
