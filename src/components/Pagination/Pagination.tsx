import { ChangeEvent } from 'react';
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
  const calculatePageNumbers = () => {
    if (totalPages <= pageRange) {
      return [1, totalPages];
    }

    if (page <= pageRange - 2) {
      return [1, pageRange];
    }

    if (page >= totalPages - (pageRange - 2)) {
      return [totalPages - (pageRange - 1), totalPages];
    }

    return [page - (pageRange - 2), page + 1];
  };

  const pageNumbers = calculatePageNumbers();

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
              calculatePageNumbers();
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
              calculatePageNumbers();
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
                calculatePageNumbers();
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
              calculatePageNumbers();
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
              calculatePageNumbers();
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
