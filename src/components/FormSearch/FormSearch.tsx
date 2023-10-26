import { Component, FormEvent, ChangeEvent } from 'react';
import './FormSearch.css';

interface IFormSearchProps {
  search: string | '';
  updateSearchValue: (newValue: string) => void;
  handleSubmit: (newValue: string) => void;
}

interface IFormSearchState {
  error: boolean | null;
}

class FormSearch extends Component<IFormSearchProps, IFormSearchState> {
  constructor(props: IFormSearchProps) {
    super(props);

    this.state = {
      error: null,
    };
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchValueData = formData.get('search') as string;
    const searchValue = searchValueData.trim();
    this.props.handleSubmit(searchValue);
    localStorage.setItem('search', searchValue);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.props.updateSearchValue(newValue);
  };

  throwError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('This is a test error.');
    }
    return (
      <form className="form-search" name="search" onSubmit={this.handleSubmit}>
        <label className="form-search__label">
          <input
            className="form-search__input"
            type="text"
            value={this.props.search}
            placeholder="search"
            name="search"
            onChange={this.handleChange}
          />
        </label>
        <button className="form-search__button" type="submit">
          Search
        </button>
        <button
          className="form-search__button"
          type="button"
          onClick={this.throwError}
        >
          Throw Error
        </button>
      </form>
    );
  }
}

export default FormSearch;
