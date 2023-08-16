import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const showError = () => {
  error.style.display = 'block';
};

const hideError = () => {
  error.style.display = 'none';
};

const hideCatInfo = () => {
  catInfo.style.display = 'none';
};

const showCatInfo = () => {
  catInfo.style.display = 'block';
};

const createCatInfoElements = (catData) => {
  catInfo.innerHTML = ''; 

  const catContainer = document.createElement('div');
  catContainer.classList.add('cat-container');
  catContainer.style.display = 'flex';

  const catImage = document.createElement('img');
  catImage.src = catData[0].url;
  catImage.style.maxWidth = '100%'; // Максимальна ширина 100%
  catImage.style.height = '500px'; 
  catImage.style.marginRight = '20px';
  catImage.style.marginTop = '20px';

  const catTextContainer = document.createElement('div');
  catTextContainer.style.flexGrow = '1';

  const catName = document.createElement('p');
  catName.textContent = `Breed: `;
  const catNameSpan = document.createElement('span');
  catNameSpan.textContent = catData[0].breeds[0].name;
  catNameSpan.style.fontWeight = 'bold';
  catName.appendChild(catNameSpan);

  const catDescription = document.createElement('p');
  catDescription.textContent = `Description: ${catData[0].breeds[0].description}`;
   catDescription.style.marginRight = '50px';


  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${catData[0].breeds[0].temperament}`;
 
  catTextContainer.appendChild(catName);
  catTextContainer.appendChild(catDescription);
  catTextContainer.appendChild(catTemperament);

  catContainer.appendChild(catImage);
  catContainer.appendChild(catTextContainer);

  catInfo.appendChild(catContainer);
};

const populateBreedSelect = async () => {
  try {
    showLoader();
    hideError();
    hideCatInfo();

    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    showError();
  } finally {
    hideLoader();
    breedSelect.style.display = 'block';
  }
};

breedSelect.addEventListener('change', async (event) => {
  const selectedBreedId = event.target.value;
  showLoader();
  hideError();
  hideCatInfo();

  try {
    const catData = await fetchCatByBreed(selectedBreedId);
    if (catData.length === 0) {
      showError();
    } else {
      createCatInfoElements(catData);
    }
  } catch (err) {
    showError();
  } finally {
    hideLoader();
    showCatInfo();
  }
});


populateBreedSelect();