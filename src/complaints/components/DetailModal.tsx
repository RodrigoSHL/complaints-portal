import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { IComplaint } from '@/complaints'; // Ajusta la ruta según tu estructura de proyecto
import { IoChevronDown } from 'react-icons/io5'; // Ícono para el dropdown

interface DetailModalProps {
    complaint: IComplaint;
    isOpen: boolean;
    onClose: () => void;
    updateComplaintStatus: (idComplaint: string, newStatus: string) => void;
}

const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint';

const DetailModal: React.FC<DetailModalProps> = ({ complaint, isOpen, onClose, updateComplaintStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState<string>(complaint.status);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    if (!isOpen) return null;

    const handleUpdate = async () => {
        try {
            await fetch(`${endpoint}/${complaint.idComplaint}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: selectedStatus }),
            });
            updateComplaintStatus(complaint.idComplaint, selectedStatus);
            onClose();
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Complaint Details</h2>
                <div className="space-y-4 text-sm md:text-base">
                    <p><strong>Complaint ID:</strong> {complaint.idComplaint}</p>
                    <p><strong>Email:</strong> {complaint.emailComplainant}</p>
                    <p><strong>Description:</strong> {complaint.description}</p>
                    <p><strong>Complainant:</strong> {complaint.fullNameComplainant}</p>
                    <p><strong>Defendant:</strong> {complaint.fullNameDefendant}</p>
                    <p><strong>Status:</strong> {complaint.status}</p>
                    <p><strong>Assigned To:</strong> {complaint.assignedTo}</p>
                    <p><strong>Date Filed:</strong> {format(new Date(complaint.dateFiled), 'dd/MM/yyyy HH:mm')}</p>
                    <p><strong>Created At:</strong> {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
                    <p><strong>Updated At:</strong> {formatDistanceToNow(new Date(complaint.updatedAt), { addSuffix: true })}</p>
                </div>
                <div className="relative mt-6">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-cyan-600 text-white py-2 px-4 rounded-md w-full flex justify-between items-center"
                    >
                        {selectedStatus ? `Change status (${selectedStatus})` : 'Change status'}
                        <IoChevronDown className="ml-2" />
                    </button>
                    {isDropdownOpen && (
                        <ul className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full z-10 shadow-lg">
                            {['open', 'in progress', 'closed', 'review'].map((status) => (
                                <li
                                    key={status}
                                    onClick={() => {
                                        setSelectedStatus(status);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`cursor-pointer py-2 px-4 hover:bg-gray-100 ${selectedStatus === status ? 'bg-gray-200' : ''}`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='flex justify-end space-x-4 mt-8'>
                    <button
                        onClick={handleUpdate}
                        className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Save changes
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
