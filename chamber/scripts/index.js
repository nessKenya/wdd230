document.addEventListener("DOMContentLoaded", () => {
  const day = new Date().getDay();

  if(day === 1 || day === 2){
    document.getElementById("banner").classList.remove('hidden');
  }

  document.querySelector("#year").innerHTML = new Date().getFullYear();
  document.getElementById("updated").innerHTML = new Date();
  let today = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(new Date());
  document.querySelector("#today").innerHTML = today;
});

function openMenu(){
  document.querySelector(".page-links").classList.remove("hidden");
  document.querySelector("#open-btn").classList.add("hidden");
  document.querySelector("#close-btn").classList.remove("hidden");
}

function closeMenu() {
  document.querySelector(".page-links").classList.add("hidden");
  document.querySelector("#open-btn").classList.remove("hidden");
  document.querySelector("#close-btn").classList.add("hidden");
}

const API_KEY = `6ab4e34bb4e3d065df470068e063f190`;
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=Mombasa&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      setWeatherValues(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function convertToCelsius(fahrenheit) {
  return (fahrenheit - 32) / 1.8;
};

function convertMPHtoKPH(mph) {
  return mph * 1.60934;
}

function setWeatherValues(weatherData){
  const weatherIcon = document.querySelector("#weather-icon");
  const captionDesc = document.querySelector("#description");
  const temp = document.querySelector("#temperature");
  const windSpeed = document.querySelector("#wind-speed");

  weatherData.weather.map((weather, index)=>{
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[index].icon}.png`;
    const desc = weather.description;
    const capitalized = desc.split(" ").map(word=>word[0].toUpperCase()+word.substring(1)).join(" ")
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capitalized;
    windSpeed.textContent = convertMPHtoKPH(weatherData.wind.speed).toFixed(1);

    const tempCelsius = convertToCelsius(weatherData.main.temp).toFixed(0);
    temp.innerHTML = tempCelsius;
  });
}

apiFetch();