document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("visits")){
    const visits = JSON.parse(localStorage.getItem("visits"));
    document.getElementById("updated").innerHTML = JSON.parse(localStorage.getItem("visits"))[visits.length-1];
    const newVisits = visits.concat(new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
      new Date()
    ));
    localStorage.setItem("visits", JSON.stringify(newVisits));
  }else{
    localStorage.setItem("visits", JSON.stringify([new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
      new Date()
    )]));
    const visits = JSON.parse(localStorage.getItem("visits"));
    document.getElementById("updated").innerHTML = JSON.parse(localStorage.getItem("visits")[visits.length-1]);

  }
  document.querySelector("#year").innerHTML = new Date().getFullYear();
  let today = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
    new Date()
  );

});


const API_KEY = `6ab4e34bb4e3d065df470068e063f190`;
const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=Carlsbad&units=imperial&cnt=24`;

function convertToCelsius(fahrenheit) {
  return (fahrenheit - 32) / 1.8;
}

function extractWeatherInfo(weatherData){
  let weatherList = [];
  let dates = [];
  dates.push(weatherData.list[0].dt_txt.split(" ")[0]);
  weatherList.push(weatherData.list[0]);
  weatherData.list.forEach(data => {
    if(!dates.includes(data.dt_txt.split(" ")[0]) && (weatherList.length < 3)){
      dates.push(data.dt_txt.split(" ")[0]);
      weatherList.push(data);
    }
  });
 return {weatherList, dates};
}

function setWeatherValues(data) {
  data.weatherList.map((weatherData, index) => {
    const weatherIcon = document.querySelector("#weather-icon-"+index);
    const captionDesc = document.querySelector("#description-"+index);
    const temp = document.querySelector("#temperature-"+index);
    const humidity = document.querySelector("#humidity-"+index);

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    const capitalized = desc
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");

    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = capitalized;

    const tempCelsius = convertToCelsius(weatherData.main.temp).toFixed(0);
    temp.innerHTML = "Temp : " + tempCelsius;

    humidity.innerHTML = "Humidity : " + weatherData.main.humidity + "%";
    if(index==2){
      const forecastDate = document.querySelector("#forecast-date");
      forecastDate.innerHTML = new Intl.DateTimeFormat("en-UK", { dateStyle: "medium" }).format(
        new Date(weatherData.dt_txt)
      );
    }
  });
}

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // console.log(data); // this is for testing the call
      const cleanData = extractWeatherInfo(data);
      setWeatherValues(cleanData);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

const listOrders = () => {
  const orders = JSON.parse(localStorage.getItem("myOrders"));
  const orderElement = document.getElementById("orders");
  if(!orders || orders.length === 0){
    const message = document.createElement('p');
    message.classList.add('text-center');
    message.style.color = 'grey';
    message.textContent = 'No orders made click on the "Order" button or visit the fresh page';


    orderElement.append(message);
  }else{
    orders.forEach(order=>{
      const orderP = document.createElement('p');
      const orderImg = document.createElement('img');
      const orderFruits = document.createElement('span');
      // create order bullet
      orderImg.setAttribute('src', "./images/icons/glass-bold.svg");
      orderImg.setAttribute('alt', 'order bullet icon'); 
      // create order list content
      orderFruits.innerHTML = [...order.fruits];
      // add bullet and order content to paragraph
      orderP.append(orderImg);
      orderP.append(orderFruits);
      // add paragraph to order element
      orderElement.append(orderP);
    });
  }
}

listOrders();