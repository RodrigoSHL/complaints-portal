"use client";

import React from 'react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { format, formatDistanceToNow } from 'date-fns';
import { IComplaint } from '@/complaints';

interface ComplaintTableProps {
    complaints: IComplaint[];
    onOpenModal: (complaint: IComplaint) => void;
}

const ComplaintTable: React.FC<ComplaintTableProps> = ({ complaints, onOpenModal }) => {
    const formatDateFiled = (date: string): string => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    };

    const formatRelativeDate = (date: string): string => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="text-left bg-gray-200">
                        <th className="p-3 border-b">Complaint ID</th>
                        <th className="p-3 border-b">Email</th>
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
                            <td className="p-3 border-b">{complaint.emailComplainant}</td>
                            <td className="p-3 border-b">{complaint.description}</td>
                            <td className="p-3 border-b">{complaint.fullNameComplainant}</td>
                            <td className="p-3 border-b">{complaint.fullNameDefendant}</td>
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
                                    onClick={() => onOpenModal(complaint)}
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
    );
};

export default ComplaintTable;
