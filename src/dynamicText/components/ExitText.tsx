"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";

export const ExitText = () => {

    const [title, setTitle] = useState("Canal de Denuncias");
    const [message, setMessage] = useState("Ha completado su denuncia");
    const [description, setDescription] = useState("Nuestro protocolo de seguimiento de denuncias de Ley Karin...");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, message, description });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-10 w-full lg:w-8/12">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-8">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-2xl lg:text-3xl font-bold w-full border-none focus:ring-0"
                    />
                    <CiEdit className="text-gray-500 ml-2" size={24} />
                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="text-xl lg:text-2xl font-semibold w-full border-none focus:ring-0"
                    />
                    <CiEdit className="text-gray-500 ml-2" size={24} />
                </div>

                <div className="flex items-center mb-6">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-gray-600 w-full border-none focus:ring-0"
                        rows={5}
                    />
                    <CiEdit className="text-gray-500 ml-2" size={24} />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-cyan-500 text-white py-2 px-6 rounded-md"
                    >
                        Guardar
                    </button>
                    <Link href="/portal">
                        <button className="bg-cyan-500 text-white py-2 px-6 rounded-md ml-4">
                            Volver
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
