"use client";

import React, { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { IComplaint } from '@/complaints';
import DetailModal from '@/complaints/components/DetailModal';

const ComplaintList: React.FC = () => {
    const [complaints, setComplaints] = useState<IComplaint[]>([]);
    const [selectedComplaint, setSelectedComplaint] = useState<IComplaint | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint';

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(data);
            setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    // Function to format `dateFiled`
    const formatDateFiled = (date: string): string => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    };

    // Function to format `createdAt` and `updatedAt`
    const formatRelativeDate = (date: string): string => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    const handleOpenModal = (complaint: IComplaint) => {
        setSelectedComplaint(complaint);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedComplaint(null);
    };

    return (
        <div className="p-8 bg-white m-8 rounded-lg shadow-md">
            {/* Breadcrumb */}
            <nav className="text-gray-600 mb-4">
                <span>Dashboard </span> /
                <span> Complaints Channel </span> /
                <span> Complaints</span>
            </nav>

            <h1 className="text-2xl font-semibold mb-4">Complaints</h1>

            {/* Filters */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-cyan-600">
                        <span className="text-lg font-medium">Filters</span>
                    </button>
                    <button className="text-cyan-600 font-medium">Add Filter</button>
                </div>
                <div className="flex space-x-4">
                    <select className="border rounded px-3 py-2">
                        <option value="2024">2024</option>
                    </select>
                    <input type="text" placeholder="Filter by month" className="border rounded px-3 py-2" />
                </div>
            </div>

            {/* Complaints Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="p-3 border-b">Complaint ID</th>
                            <th className="p-3 border-b">Title</th>
                            <th className="p-3 border-b">Description</th>
                            <th className="p-3 border-b">Complainant</th>
                            <th className="p-3 border-b">Defendant</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Assigned To</th>
                            <th className="p-3 border-b">Date Filed</th>
                            <th className="p-3 border-b">Created</th>
                            <th className="p-3 border-b">Updated</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id} className="hover:bg-gray-100">
                                <td className="p-3 border-b">{complaint.idComplaint}</td>
                                <td className="p-3 border-b">{complaint.title}</td>
                                <td className="p-3 border-b">{complaint.description}</td>
                                <td className="p-3 border-b">{complaint.complainant}</td>
                                <td className="p-3 border-b">{complaint.defendant}</td>
                                <td className="p-3 border-b">
                                    <span className={`flex items-center space-x-2 ${complaint.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        <span className={`h-3 w-3 rounded-full ${complaint.status === 'resolved' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                        <span>{complaint.status}</span>
                                    </span>
                                </td>
                                <td className="p-3 border-b">{complaint.assignedTo}</td>
                                <td className="p-3 border-b">{formatDateFiled(complaint.dateFiled)}</td>
                                <td className="p-3 border-b">{formatRelativeDate(complaint.createdAt)}</td>
                                <td className="p-3 border-b">{formatRelativeDate(complaint.updatedAt)}</td>
                                <td className="p-3 border-b text-center">
                                    <button
                                        onClick={() => handleOpenModal(complaint)}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <IoEllipsisVerticalSharp />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
                <button className="bg-cyan-600 text-white py-2 px-6 rounded-md">Download Complaints</button>
                <div className="text-cyan-600 cursor-pointer flex items-center space-x-1">
                    <span>Sort by Default</span>
                </div>
            </div>

            {/* Modal */}
            {selectedComplaint && (
                <DetailModal
                    complaint={selectedComplaint}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ComplaintList;
