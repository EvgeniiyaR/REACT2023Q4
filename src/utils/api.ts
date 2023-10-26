const BASE_URL = 'https://api.artic.edu/api/v1/artworks/';

const headers = {
  'Content-Type': 'application/json',
};

const handleResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const getArtworks = () => {
  return fetch(`${BASE_URL}?limit=20`, {
    headers,
  }).then((res) => handleResponse(res));
};

export const getArtworksSearch = (search: string) => {
  return fetch(`${BASE_URL}search?q=${search}&limit=20`, {
    headers,
  }).then((res) => handleResponse(res));
};

export const getArtwork = (link: string) => {
  return fetch(link, {
    headers,
  }).then((res) => handleResponse(res));
};
