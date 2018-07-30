import { APP_ID } from '../../config/keys';

const BASE_URL = `https://api.unsplash.com/`;

const getRandomPhotoPromise = () => {
  return fetch(`${BASE_URL}/photos/random?client_id=${APP_ID}`).then(res =>
    res.json()
  );
};

const downloadImagePromise = imageURL => {
  return fetch(`${imageURL}?client_id=${APP_ID}`);
};

module.exports = { getRandomPhotoPromise, downloadImagePromise };
