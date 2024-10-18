// nasa-apod-api.js
// APOD: Astronomy Picture of the Day
const IMAGE_PLACEHOLDER = 'https://placehold.co/600x400?text=NO+PICTURE+AVAILABLE';

// Function to fetch NASA APOD pictures
async function getNasaPictures({ apiKey = 'DEMO_KEY', count = 1 } = {}) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

  try {
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      const error = new Error('Failed to fetch NASA pictures');
      // throw new Error('Failed to fetch NASA pictures');
      error.code = response.status;
      throw error;
    }

    const data = await response.json();

    // Map the API data to our desired format
    const pictures = data.map((picture) => ({
      image: picture.media_type === 'image' ? picture.url : IMAGE_PLACEHOLDER,
      link: picture.media_type === 'image' ? picture.hdurl || picture.url : picture.url,
      title: picture.title,
      explanation: picture.explanation,
      date: picture.date,
      copyright: picture.copyright,
    }));

    return {
      state: 'success',
      pictures,
    };
  } catch (error) {
    return {
      state: 'error',
      errorCode: error.code,
      message: error.message,
      pictures: [],
    };
  }
}

export { getNasaPictures };