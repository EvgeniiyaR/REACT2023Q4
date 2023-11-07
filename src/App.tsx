import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormSearch from './components/FormSearch/FormSearch';
import { Outlet } from 'react-router-dom';
import Cards from './components/Cards/Cards';
import './App.css';
import { getArtworks, getArtworksSearch, getArtwork } from './utils/api';
import {
  IArtworksResponse,
  IArtworksSearchResponse,
  IArtwork,
} from './types/interfaces';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: '',
      date: '',
      author: '',
      description: '',
      imageId: '',
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('search') || localStorage.getItem('search') || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetailedPage, setIsLoadingDetailedPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 20);
  const [id, setId] = useState(Number(searchParams.get('details')) || 0);
  const [isOpen, setIsOpen] = useState(searchParams.has('details'));
  const [card, setCard] = useState({
    id: 1,
    title: '',
    date: '',
    author: '',
    description: '',
    imageId: '',
  });

  useEffect(() => {
    if (search) {
      handleSubmit(search, limit, page);
    } else {
      handleGetArtworks(limit, page);
    }
  }, [page, limit]);

  useEffect(() => {
    if (id > 0) {
      setIsLoadingDetailedPage(true);
      setIsOpen(searchParams.has('details'));
      getArtwork(Number(id)).then((res) => {
        setCard({
          id: res.data.id,
          title: res.data.title,
          date: res.data.date_display,
          author: res.data.artist_display,
          description: res.data.description,
          imageId: res.data.image_id,
        });
        setIsLoadingDetailedPage(false);
      });
    }
  }, [id]);

  const handleGetArtworks = (limit: number, page: number) => {
    setIsLoading(true);
    getArtworks(limit, page).then((res: IArtworksResponse) => {
      if (res.data) {
        const array: IArtwork[] = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date_display,
          author: item.artist_display,
          description: item.description,
          imageId: item.image_id,
        }));
        setIsLoading(false);
        setData(array);
        setSearchParams({
          limit: limit.toString(),
          page: page.toString(),
        });
        if (id) {
          searchParams.set('details', id.toString());
          setSearchParams(searchParams);
        }
      }
      setTotalPages(res.pagination.total_pages);
    });
  };

  const handleSubmit = (newValue: string, limit: number, page: number) => {
    setIsLoading(true);
    if (newValue) {
      getArtworksSearch(newValue, limit, page).then(
        (res: IArtworksSearchResponse) => {
          if (res.data) {
            const arrayLink = res.data.map((item) => getArtwork(item.id));
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
              setIsLoading(false);
              setData(array);
            });
          }
          setTotalPages(res.pagination.total_pages);
          setSearchParams({
            search: newValue,
            limit: limit.toString(),
            page: page.toString(),
          });
          if (id) {
            searchParams.set('details', id.toString());
            setSearchParams(searchParams);
          }
          const searchParam = searchParams.get('search');
          if (localStorage.getItem('search') !== searchParam) {
            searchParam && localStorage.setItem('search', searchParam);
          }
        }
      );
    } else {
      handleGetArtworks(limit, page);
    }
  };

  const updateSearchValue = (newValue: string) => {
    setSearch(newValue);
  };

  const handleClose = () => {
    setIsOpen(false);
    setId(0);
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <>
      <main className="main">
        <h1 className="main__title">ArtWorks</h1>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        )}
        <a href="https://api.artic.edu/docs/" target="_blank" rel="noreferrer">
          Art Institute of Chicago API
        </a>
        <FormSearch
          search={search}
          updateSearchValue={updateSearchValue}
          handleSubmit={handleSubmit}
          setLimit={setLimit}
          setPage={setPage}
        />
        <div className={`${isLoading ? 'content' : ''}`}>
          {isLoading ? (
            <Loader />
          ) : data.length > 0 ? (
            <Cards data={data} setId={setId} />
          ) : (
            <p>Nothing was found for the keyword</p>
          )}
        </div>
      </main>
      <Outlet
        context={{
          handleClose,
          isLoadingDetailedPage,
          isOpen,
          card,
        }}
      />
    </>
  );
};

export default App;
