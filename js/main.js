import * as APOD from './modules/nasa-apod-api.js';

/* ################################################ */
/* GUI Elements                                     */
/* ################################################ */

const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const badRequest = document.querySelector('.bad-request');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

/* ################################################ */
/* Global Config                                    */
/* ################################################ */

const count = 10;
const apiKey = 'DEMO_KEY';

let resultsArray = [];
let favorites = {};

/* ################################################ */
/* DOM Renderer                                     */
/* ################################################ */

function showContent(page) {
  window.scrollTo({top: 0, behavior: 'instant'});
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
}

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Link
    const link = document.createElement('a');
    link.href = result.link;
    link.title = 'View Full Image';
    link.target = '_blank';
    
    // Image
    const image = document.createElement('img');
    image.src = result.image;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if (page === 'results') {
      saveText.textContent = 'Add To Favorites';
      saveText.setAttribute('onclick', `saveFavorites('${result.image}')`);
    } else {
      saveText.textContent = 'Remove Favorite';
      saveText.setAttribute('onclick', `removeFavorite('${result.image}')`);
    }
    
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : `© ${result.copyright}`;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;
    
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  const nasaFavoritesObject = JSON.parse(localStorage.getItem('nasaFavorites'));
  // Get Favorites from localStorage
  if (nasaFavoritesObject) { // If there are favorites not empty object
    favorites = nasaFavoritesObject;
  }
  imagesContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

/* ################################################ */
/* Loader                                           */
/* ################################################ */
function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

/* ################################################ */
/* NASA Favorites Storage                           */
/* ################################################ */

// Add results to Favorites
function saveFavorites(image) {
  // Loop trough Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.image.includes(image) && !favorites[image]) {
      favorites[image] = item;
      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in Local Storage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(image) {
  if (favorites[image]) {
    delete favorites[image];
    // Set Favorites in Local Storage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
}

/* ################################################ */
/* NASA Pictures API                                */
/* ################################################ */
async function loadPictures() {
  showLoader();
  const result = await APOD.getNasaPictures({ apiKey, count });
  resultsArray = await result.pictures;
  hideLoader();

  if (result.state === 'success') {
    updateDOM('results');
  } else {
    let errorMessage;
    if (result.errorCode === 429) {
      errorMessage = 'Too Many Requests';
    } else {
      errorMessage = 'Something went wrong. Could not fetch NASA pictures';
    }

    updateDOM('favorites');

    badRequest.hidden = false;
    const label = badRequest.getElementsByTagName('h1')[0];
    label.textContent = errorMessage;
      setTimeout(() => {
        badRequest.hidden = true;
      }, 2000);
  }
}

// Call Functions from DOM
document.updateDOM = updateDOM;
document.saveFavorites = saveFavorites;
document.removeFavorite = removeFavorite;
document.loadPictures = loadPictures;

// Event Listener
document.addEventListener('DOMContentLoaded', loadPictures);