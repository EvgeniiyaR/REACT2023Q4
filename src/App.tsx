import { useEffect, useState } from 'react';
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

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      link: '',
      title: '',
      date: '',
      author: '',
      description: '',
      imageId: '',
    },
  ]);
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      handleSubmit(search);
    } else {
      handleGetArtworks();
    }
  }, []);

  const handleGetArtworks = () => {
    setLoading(true);
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
        setLoading(false);
        setData(array);
      }
    });
  };

  const handleSubmit = (newValue: string) => {
    setLoading(true);
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
            setLoading(false);
            setData(array);
          });
        }
      });
    } else {
      handleGetArtworks();
    }
  };

  const updateSearchValue = (newValue: string) => {
    setSearch(newValue);
  };

  return (
    <main className="main">
      <h1 className="main__title">ArtWorks</h1>
      <a href="https://api.artic.edu/docs/" target="_blank" rel="noreferrer">
        Art Institute of Chicago API
      </a>
      <FormSearch
        search={search}
        updateSearchValue={updateSearchValue}
        handleSubmit={handleSubmit}
      />
      <div className={`${loading ? 'content' : ''}`}>
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <Cards data={data} />
        ) : (
          <p>Nothing was found for the keyword</p>
        )}
      </div>
    </main>
  );
};

export default App;
