import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { IComplaint } from '@/complaints'; // Ajusta la ruta según tu estructura de proyecto

interface DetailModalProps {
    complaint: IComplaint;
    isOpen: boolean;
    onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ complaint, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
                <div className="space-y-4">
                    <p><strong>Complaint ID:</strong> {complaint.idComplaint}</p>
                    <p><strong>Title:</strong> {complaint.title}</p>
                    <p><strong>Description:</strong> {complaint.description}</p>
                    <p><strong>Complainant:</strong> {complaint.complainant}</p>
                    <p><strong>Defendant:</strong> {complaint.defendant}</p>
                    <p><strong>Status:</strong> {complaint.status}</p>
                    <p><strong>Assigned To:</strong> {complaint.assignedTo}</p>
                    <p><strong>Date Filed:</strong> {format(new Date(complaint.dateFiled), 'dd/MM/yyyy HH:mm')}</p>
                    <p><strong>Created At:</strong> {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
                    <p><strong>Updated At:</strong> {formatDistanceToNow(new Date(complaint.updatedAt), { addSuffix: true })}</p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 bg-cyan-600 text-white py-2 px-4 rounded-md"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailModal;
