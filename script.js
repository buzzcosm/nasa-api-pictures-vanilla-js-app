

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    // displayNasaPictures();
    console.log(resultsArray);
  } catch (error) {
    // Catch Error Here
    console.error(error);
  }
}

// On Load
// const dummyData = {
//   date: "2002-09-01",
//   explanation: "Galaxies like colorful pieces of candy fill the Hubble Deep Field - one of humanity's most distant optical views of the Universe. The dimmest, some as faint as 30th magnitude (about four billion times fainter than stars visible to the unaided eye), are very distant galaxies and represent what the Universe looked like in the extreme past, perhaps less than one billion years after the Big Bang. To make the Deep Field image, astronomers selected an uncluttered area of the sky in the constellation Ursa Major (the Big Bear) and pointed the Hubble Space Telescope at a single spot for 10 days accumulating and combining many separate exposures. With each additional exposure, fainter objects were revealed. The final result has been used to explore the mysteries of galaxy evolution and the infant Universe.",
//   hdurl: "https://apod.nasa.gov/apod/image/0007/deepfield_hst_big.jpg",
//   media_type: "image",
//   service_version: "v1",
//   title: "The Hubble Deep Field",
//   url: "https://apod.nasa.gov/apod/image/0007/deepfield_hst.jpg",
// }
// getNasaPictures();