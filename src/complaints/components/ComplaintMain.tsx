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
    const [complaints] = useState<IComplaint[]>(complaintList);
    const [selectedComplaint, setSelectedComplaint] = useState<IComplaint | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterIdComplaint, setFilterIdComplaint] = useState(''); // Estado para el filtro de idComplaint
    const complaintsPerPage = 5;

    // Filtrar complaints basadas en el idComplaint
    const filteredComplaints = complaints.filter(complaint =>
        complaint.idComplaint.includes(filterIdComplaint)
    );

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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterIdComplaint(e.target.value);
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
                    <input 
                        type="text" 
                        placeholder="Filter by Complaint ID	" 
                        className="hidden md:block border rounded px-3 py-2"
                        value={filterIdComplaint}
                        onChange={handleFilterChange} // Manejar el cambio del filtro
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
                totalComplaints={filteredComplaints.length} // Usar la longitud de los complaints filtrados
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
