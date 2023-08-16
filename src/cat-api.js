import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_OifKfWzwpyzw60PCwG4hC9cKVwXLSrqAvkmOO6UEtFeJxncX0tPjjc6QZnRJvo5j';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};