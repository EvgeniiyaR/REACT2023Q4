import { Component } from 'react';
import FormSearch from './components/FormSearch/FormSearch';
import Cards from './components/Cards/Cards';
import './App.css';
import { getArtworks, getArtworksSearch, getArtwork } from './utils/api';
import {
  IArtworksResponse,
  IArtworksSearchResponse,
  IArtwork,
} from './types/interfaces';
import Loader from './components/Loader/Loader';

interface IAppProps {}

interface IAppState {
  data: IArtwork[];
  search: string | '';
  loading: boolean;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          link: '',
          title: '',
          date: '',
          author: '',
          description: '',
          imageId: '',
        },
      ],
      search: localStorage.getItem('search') || '',
      loading: false,
    };
  }

  componentDidMount() {
    if (this.state.search) {
      this.handleSubmit(this.state.search);
    } else {
      this.handleGetArtworks();
    }
  }

  handleGetArtworks = () => {
    this.setState({
      loading: true,
    });
    getArtworks().then((res: IArtworksResponse) => {
      if (res.data) {
        const array: IArtwork[] = res.data.map((item) => ({
          id: item.id,
          link: item.api_link,
          title: item.title,
          date: item.date_display,
          author: item.artist_display,
          description: item.description,
          imageId: item.image_id,
        }));

        this.setState({
          data: array,
          loading: false,
        });
      }
    });
  };

  handleSubmit = (newValue: string) => {
    this.setState({
      loading: true,
    });
    if (newValue) {
      getArtworksSearch(newValue).then((res: IArtworksSearchResponse) => {
        if (res.data) {
          const arrayLink = res.data.map((item) => getArtwork(item.api_link));
          Promise.all(arrayLink).then((res) => {
            const array: IArtwork[] = res.map((item) => ({
              id: item.data.id,
              link: item.data.api_link,
              title: item.data.title,
              date: item.data.date_display,
              author: item.data.artist_display,
              description: item.data.description,
              imageId: item.data.image_id,
            }));

            this.setState({
              data: array,
              loading: false,
            });
          });
        }
      });
    } else {
      this.handleGetArtworks();
    }
  };

  updateSearchValue = (newValue: string) => {
    this.setState({
      search: newValue,
    });
  };

  render() {
    return (
      <main className="main">
        <h1 className="main__title">ArtWorks</h1>
        <a href="https://api.artic.edu/docs/" target="_blank" rel="noreferrer">
          Art Institute of Chicago API
        </a>
        <FormSearch
          search={this.state.search}
          updateSearchValue={this.updateSearchValue}
          handleSubmit={this.handleSubmit}
        />
        <div className={`${this.state.loading ? 'content' : ''}`}>
          {this.state.loading ? (
            <Loader />
          ) : this.state.data.length > 0 ? (
            <Cards data={this.state.data} />
          ) : (
            <p>Nothing was found for the keyword</p>
          )}
        </div>
      </main>
    );
  }
}

export default App;
