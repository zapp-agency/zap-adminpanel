import React from 'react';
import Button from '../Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="my-4 flex items-center justify-center space-x-2 font-sans">
      <Button onClick={handlePrev} disabled={currentPage === 1} variant="default" color="primary">
        &laquo; Previous
      </Button>

      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          variant="default"
          color={number === currentPage ? 'primary' : 'default'}
        >
          {number}
        </Button>
      ))}

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="default"
        color="primary"
      >
        Next &raquo;
      </Button>
    </div>
  );
};

export default Pagination;
