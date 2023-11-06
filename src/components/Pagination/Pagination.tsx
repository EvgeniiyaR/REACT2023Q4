import { ChangeEvent, useEffect, useState } from 'react';
import './Pagination.css';

interface PaginationProps {
  totalPages: number;
  pageRange?: number;
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalPages,
  pageRange = 5,
  isLoading,
  page,
  setPage,
  limit,
  setLimit,
}: PaginationProps) => {
  const [pageNumbers, setPageNumbers] = useState(
    totalPages > pageRange ? [1, pageRange] : [1, totalPages]
  );

  useEffect(() => {
    setPageNumbers(totalPages > pageRange ? [1, pageRange] : [1, totalPages]);
  }, [totalPages]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const limit = Number(event.target.value);
    if (limit >= 10 && limit <= 50) {
      setLimit(limit);
      setPage(1);
    }
  };

  return (
    <>
      <ul className={`pagination ${isLoading ? 'pagination_disabled' : ''}`}>
        <li>
          <button
            className="pagination__button"
            disabled={page === 1}
            onClick={() => {
              setPage(1);
              setPageNumbers([1, 5]);
            }}
          >
            {'<<'}
          </button>
        </li>
        <li>
          <button
            className="pagination__button"
            disabled={page === 1}
            onClick={() => {
              if (
                page === totalPages ||
                page === totalPages - 1 ||
                page === totalPages - 2 ||
                page === totalPages - 3
              ) {
                setPageNumbers([totalPages - 4, totalPages]);
              } else {
                setPageNumbers([page - 1, page + 3]);
              }
              setPage(page - 1);
            }}
          >
            {'<'}
          </button>
        </li>
        {Array.from(
          { length: pageNumbers[1] - pageNumbers[0] + 1 },
          (_, index) => pageNumbers[0] + index
        ).map((number) => (
          <li key={number} className="pagination__item">
            <button
              className={`pagination__button ${
                number === page ? 'pagination__button_active' : ''
              }`}
              onClick={() => {
                if (number === 1) {
                  setPageNumbers([1, number + 4]);
                } else if (number === 2) {
                  setPageNumbers([1, number + 3]);
                } else if (
                  number === totalPages ||
                  number === totalPages - 1 ||
                  number === totalPages - 2 ||
                  number === totalPages - 3
                ) {
                  setPageNumbers([totalPages - 4, totalPages]);
                } else {
                  setPageNumbers([number, number + 4]);
                }
                setPage(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className="pagination__button"
            disabled={page === totalPages}
            onClick={() => {
              if (
                page === totalPages ||
                page === totalPages - 1 ||
                page === totalPages - 2 ||
                page === totalPages - 3 ||
                page === totalPages - 4
              ) {
                setPageNumbers([totalPages - 4, totalPages]);
              } else {
                setPageNumbers([page + 1, page + 5]);
              }
              setPage(page + 1);
            }}
          >
            {'>'}
          </button>
        </li>
        <li>
          <button
            className="pagination__button"
            disabled={page === totalPages}
            onClick={() => {
              setPage(totalPages);
              setPageNumbers([totalPages - 4, totalPages]);
            }}
          >
            {'>>'}
          </button>
        </li>
      </ul>
      <label
        className={`pagination__label ${
          isLoading ? 'pagination_disabled' : ''
        }`}
      >
        Amount Elements on Page:
        <input
          className="pagination__elements"
          type="number"
          name="amount-elements"
          max="50"
          min="10"
          onChange={handleChange}
          value={limit}
        />
      </label>
    </>
  );
};

export default Pagination;
