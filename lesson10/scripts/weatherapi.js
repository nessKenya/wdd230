// create HTML elements in the document
const h1Element = document.createElement('h1');
h1Element.innerText = 'OpenWeatherMap.org API Test';

const pElement = document.createElement('p');
pElement.innerText = 'The current temperature in Fairbanks, Alaska is ';

const currentTemp = document.createElement('span');
currentTemp.setAttribute('id', 'current-temp');

const degreesTextNode = document.createTextNode(' \u00B0F');

const h2Element = document.createElement('h2');
h2Element.innerText = 'Current Condition Icon';

const figureELement = document.createElement('figure');
const weatherIcon = document.createElement('img');
weatherIcon.setAttribute('id', 'weather-icon');

const captionDesc = document.createElement('figcaption');

/* organize html */
const body = document.querySelector('body');
// add h1 element to body
body.append(h1Element);
// add span to p element
pElement.append(currentTemp);
// append degrees text node to p element
pElement.append(degreesTextNode);
// add p element to body
body.append(pElement);
//add h2 element to body
body.append(h2Element);
// add image to figure element
figureELement.append(weatherIcon);
// add figcaption to figure element
figureELement.append(captionDesc)
// figure element to body
body.append(figureELement);

const API_KEY = `6ab4e34bb4e3d065df470068e063f190`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=${API_KEY}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(weatherData){
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  

  weatherData.weather.map((weather, index)=>{
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[index].icon}.png`;
    const desc = weather.description;
    const capitalized = desc.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ")
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', capitalized);
    captionDesc.textContent = desc;
  });
}

apiFetch();
