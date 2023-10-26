import { Component } from 'react';
import FormSearch from './components/FormSearch/FormSearch';
import Cards from './components/Cards/Cards';
import './App.css';
import { getArtworks } from './utils/api';
import { IArtworksResponse, IArtwork } from './types/interfaces';

interface IAppProps {}

interface IAppState {
  data: IArtwork[];
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
        },
      ],
    };
  }

  componentDidMount() {
    this.handleGetArtworks();
  }

  handleGetArtworks = () => {
    getArtworks().then((res: IArtworksResponse) => {
      if (res.data) {
        const array: IArtwork[] = res.data
          .filter((item) => item.description)
          .map((item) => ({
            id: item.id,
            link: item.api_link,
            title: item.title,
            date: item.date_display,
            author: item.artist_display,
            description: item.description,
          }));

        this.setState({
          data: array,
        });
      }
      console.log(res);
    });
  };

  render() {
    return (
      <>
        <h1>ArtWorks</h1>
        <FormSearch />
        <Cards data={this.state.data} />
      </>
    );
  }
}

export default App;
