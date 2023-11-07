import { useState, FormEvent, ChangeEvent } from 'react';
import './FormSearch.css';

interface IFormSearchProps {
  search: string | '';
  updateSearchValue: (newValue: string) => void;
  handleSubmit: (newValue: string, limit: number, page: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const FormSearch = ({
  search,
  updateSearchValue,
  handleSubmit,
  setPage,
  setLimit,
}: IFormSearchProps) => {
  const [error, setError] = useState(false);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchValueData = formData.get('search') as string;
    const searchValue = searchValueData.trim();
    setPage(1);
    setLimit(20);
    handleSubmit(searchValue, 20, 1);
    localStorage.setItem('search', searchValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    updateSearchValue(newValue);
  };

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('This is a test error.');
  }

  return (
    <form className="form-search" name="search" onSubmit={handleSubmitForm}>
      <label className="form-search__label">
        <input
          className="form-search__input"
          type="text"
          value={search}
          placeholder="search"
          name="search"
          onChange={handleChange}
        />
      </label>
      <button className="form-search__button" type="submit">
        Search
      </button>
      <button
        className="form-search__button"
        type="button"
        onClick={throwError}
      >
        Throw Error
      </button>
    </form>
  );
};

export default FormSearch;
