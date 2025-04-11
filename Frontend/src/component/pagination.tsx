import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // You could dispatch an action here to fetch events for the new page
      // dispatch(fetchEvents({ page }));
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        Previous
      </button>

      {/* Current Page Display */}
      <span className="text-lg font-semibold">
        {currentPage} / {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
