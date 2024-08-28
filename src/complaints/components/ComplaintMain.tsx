"use client";

import React, { useState } from 'react';
import { IComplaint } from '../interfaces/complaints';
import ComplaintTable from './ComplaintTable';
import DetailModal from './DetailModal';
import Pagination from './Pagination';

interface Props {
    complaintList: IComplaint[];
}

export const ComplaintMain = ({ complaintList = [] }: Props) => {
    // Estados para cada filtro
    const [complaints] = useState<IComplaint[]>(complaintList);
    const [selectedComplaint, setSelectedComplaint] = useState<IComplaint | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [filterIdComplaint, setFilterIdComplaint] = useState('');
    const [filterFullNameComplainant, setFilterFullNameComplainant] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterAssignedTo, setFilterAssignedTo] = useState('');
    const complaintsPerPage = 5;

    // Función de filtrado
    const filteredComplaints = complaints
        .filter(complaint => complaint.idComplaint.includes(filterIdComplaint))
        .filter(complaint => complaint.fullNameComplainant.toLowerCase().includes(filterFullNameComplainant.toLowerCase()))
        .filter(complaint => complaint.status.includes(filterStatus));

    // Calcular índices para la paginación
    const indexOfLastComplaint = currentPage * complaintsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
    const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const handleOpenModal = (complaint: IComplaint) => {
        setSelectedComplaint(complaint);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedComplaint(null);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, filterSetter: React.Dispatch<React.SetStateAction<string>>) => {
        filterSetter(e.target.value);
        setCurrentPage(1); // Reiniciar la paginación cuando cambie el filtro
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, filterSetter: React.Dispatch<React.SetStateAction<string>>) => {
        filterSetter(e.target.value);
        setCurrentPage(1); // Reiniciar la paginación cuando cambie el filtro
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                    <input 
                        type="text" 
                        placeholder="Filter by id Complaint" 
                        className="border rounded px-3 py-2"
                        value={filterIdComplaint}
                        onChange={(e) => handleFilterChange(e, setFilterIdComplaint)}
                    />
                    <input 
                        type="text" 
                        placeholder="Filter by Complainant Name" 
                        className="border rounded px-3 py-2"
                        value={filterFullNameComplainant}
                        onChange={(e) => handleFilterChange(e, setFilterFullNameComplainant)}
                    />
                </div>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                    <select 
                        className="border rounded px-3 py-2"
                        value={filterStatus}
                        onChange={(e) => handleSelectChange(e, setFilterStatus)}
                    >
                        <option value="">All Status</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Filter by Assigned To" 
                        className="border rounded px-3 py-2"
                        value={filterAssignedTo}
                        onChange={(e) => handleFilterChange(e, setFilterAssignedTo)}
                    />
                </div>
            </div>

            {/* Complaints Table */}
            <ComplaintTable
                complaints={currentComplaints}
                onOpenModal={handleOpenModal}
            />

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
                <button className="bg-cyan-600 text-white py-2 px-6 rounded-md">Download Complaints</button>
                <div className="text-cyan-600 cursor-pointer flex items-center space-x-1">
                    <span>Sort by Default</span>
                </div>
            </div>

            {/* Pagination */}
            <Pagination
                complaintsPerPage={complaintsPerPage}
                totalComplaints={filteredComplaints.length}
                paginate={handlePageChange}
                currentPage={currentPage}
            />

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
