import React from 'react';

interface PaginationProps {
    complaintsPerPage: number;
    totalComplaints: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination = ({ complaintsPerPage, totalComplaints, paginate, currentPage }: PaginationProps) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalComplaints / complaintsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''} mx-1`}>
                        <button onClick={() => paginate(number)} className="page-link px-3 py-1 border rounded">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
