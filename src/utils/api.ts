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

export const getArtworks = (limit = 20, page = 1) => {
  return fetch(`${BASE_URL}?limit=${limit}&page=${page}`, {
    headers,
  }).then((res) => handleResponse(res));
};

export const getArtworksSearch = (search: string, limit = 20, page = 1) => {
  return fetch(`${BASE_URL}search?q=${search}&limit=${limit}&page=${page}`, {
    headers,
  }).then((res) => handleResponse(res));
};

export const getArtwork = (id: number) => {
  return fetch(`${BASE_URL}${id}`, {
    headers,
  }).then((res) => handleResponse(res));
};
