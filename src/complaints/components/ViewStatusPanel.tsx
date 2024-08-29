"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { IComplaint } from '../interfaces/complaints';

interface Props {
    complaint: IComplaint;
}

export const ViewStatusPanel = ({ complaint }: Props) => {
    const [complaintInfo, setComplaintInfo] = useState(complaint);
    const [showFilePanel, setShowFilePanel] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [description, setDescription] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const handleFileUpload = async () => {
        setUploading(true);
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append('file', file));

            const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/files/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload files');
            }

            const data = await response.json();
            const fileId = data.id;

            // Ahora asociamos el archivo con la denuncia
            await linkFileToComplaint(fileId, complaintInfo.idComplaint, description);

            alert('Files uploaded and linked successfully');
            setFiles([]); // Clear files after successful upload
            setDescription(""); // Clear description
        } catch (error) {
            console.error(error);
            alert('An error occurred while uploading files');
        } finally {
            setUploading(false);
        }
    };

    const linkFileToComplaint = async (fileId: string, complaintId: string, description: string) => {
        try {
            const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint/evidence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idFile: fileId,
                    idComplaint: complaintId,
                    description: description,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to link file to complaint');
            }
        } catch (error) {
            console.error('Error linking file to complaint:', error);
        }
    };

    const handleFileRemove = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-10 w-full lg:w-8/12 mt-12 mx-4">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold">Canal de Denuncias</h1>
            </div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                Estado de la denuncia: <span className='text-cyan-700'>{complaintInfo.status}</span>
            </h2>

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
                <button
                    className="bg-cyan-500 text-white py-2 px-6 rounded-md"
                    onClick={() => setShowFilePanel(!showFilePanel)}
                >
                    Adjuntar + Evidencia
                </button>
                <Link href="/portal">
                    <button className="bg-cyan-500 text-white py-2 px-6 rounded-md">
                        Cerrar
                    </button>
                </Link>
            </div>

            {showFilePanel && (
                <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Subir Archivos</h3>
                    <textarea
                        placeholder="Descripción del archivo (opcional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4 block w-full p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mb-4 block"
                    />
                    <button
                        onClick={handleFileUpload}
                        className="bg-cyan-600 text-white py-2 px-6 rounded-md mb-4"
                        disabled={uploading || files.length === 0}
                    >
                        {uploading ? 'Subiendo...' : 'Subir Archivos'}
                    </button>
                    {files.length > 0 && (
                        <div className="space-y-4">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{file.name}</p>
                                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <button
                                        onClick={() => handleFileRemove(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
