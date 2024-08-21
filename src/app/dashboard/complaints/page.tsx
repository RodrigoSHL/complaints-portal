"use client";

import React, { useState, useEffect } from 'react';
import { IComplaint } from '@/complaints';
import DetailModal from '@/complaints/components/DetailModal';
import ComplaintTable from '@/complaints/components/ComplaintTable';

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
            setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
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
                    <input type="text" placeholder="Filter by month" className="hidden md:block border rounded px-3 py-2" />
                </div>
            </div>

            {/* Complaints Table */}
            <ComplaintTable
                complaints={complaints}
                onOpenModal={handleOpenModal}
            />

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
