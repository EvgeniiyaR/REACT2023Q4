import { Component } from 'react';
import './FormSearch.css';

interface IFormSearchProps {}

class FormSearch extends Component {
  constructor(props: IFormSearchProps) {
    super(props);
  }

  render() {
    return (
      <form className="form-search" name="search">
        <label className="form-search__label">
          <input
            className="form-search__input"
            type="text"
            placeholder="search"
          />
        </label>
        <button className="form-search__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default FormSearch;
