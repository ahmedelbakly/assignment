// components/Pagination.tsx
import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  className?: string;
  showPageNumbers?: boolean;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  showPrevNext = true,
  showPageNumbers = true,
  showInfo = false,
  totalItems,
  itemsPerPage,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = (): number[] => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * (itemsPerPage || 0) + 1;
  const endItem = Math.min(currentPage * (itemsPerPage || 0), totalItems || 0);

  const PaginationButton: React.FC<{
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    active?: boolean;
    className?: string;
  }> = ({ onClick, disabled = false, children, active = false, className = '' }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md
        transition-all duration-200 min-w-[2.5rem] h-10
        ${active
          ? 'bg-blue-600 text-white border border-blue-600 shadow-sm'
          : 'bg-white text-gray-700 border border-gray-300 '
        }
        ${disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:shadow-md cursor-pointer'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Page Info */}
      {showInfo && totalItems && itemsPerPage && (
        <div className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>
      )}

      {/* Pagination Controls */}
      <nav className="flex items-center gap-1">
        {/* First Page */}
        {showFirstLast && (
          <PaginationButton
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="rounded-l-md"
          >
            <span className="sr-only">First page</span>
            «
          </PaginationButton>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous page</span>
            ‹
          </PaginationButton>
        )}

        {/* Page Numbers */}
        {showPageNumbers && pageNumbers.map((page) => (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            active={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))}

        {/* Next Page */}
        {showPrevNext && (
          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next page</span>
            ›
          </PaginationButton>
        )}

        {/* Last Page */}
        {showFirstLast && (
          <PaginationButton
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="rounded-r-md"
          >
            <span className="sr-only">Last page</span>
            »
          </PaginationButton>
        )}
      </nav>
    </div>
  );
};

export default Pagination;