const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

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
  return fetch(BASE_URL, {
    headers,
  }).then((res) => handleResponse(res));
};
