"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { IComplaint } from '../interfaces/complaints';

interface Props {
    complaint: IComplaint;
}

export const ViewStatusPanel = ({complaint}: Props) => {

    const [complaintInfo, setComplaintInfo] = useState(complaint);
    console.log(complaintInfo);
    return (
        <div className="bg-white rounded-lg shadow-md p-10 w-full lg:w-8/12 mt-12">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold">Canal de Denuncias</h1>
            </div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">Estado de la denuncia: <span className='text-cyan-700'>{complaintInfo.status}</span></h2>

            <div className="border-l-4 border-gray-300 pl-4">
                {/* Línea de tiempo */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <div className="bg-black h-4 w-4 rounded-full mr-4"></div>
                        <div className="text-sm text-gray-600">
                            <p>{complaintInfo.createdAt}</p>
                            <p>Denuncia recibida</p>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <div className="bg-black h-4 w-4 rounded-full mr-4"></div>
                        <div className="text-sm text-gray-600">
                            <p>{complaintInfo.updatedAt}</p>
                            <p>Ultima actualización</p>
                        </div>
                    </div>
                </div>
                {/* Añadir más pasos aquí */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <div className="bg-cyan-600 h-4 w-4 rounded-full mr-4"></div>
                        <div className="text-sm text-cyan-600">
                            <p>ddmmyyyy hh:mm:ss</p>
                            <p>Resolución emitida</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <button className="bg-cyan-500 text-white py-2 px-6 rounded-md">
                    Adjuntar + Evidencia
                </button>
                <Link href="/portal">
                    <button className="bg-cyan-500 text-white py-2 px-6 rounded-md">
                        Cerrar
                    </button>
                </Link>
            </div>
        </div>)
}
