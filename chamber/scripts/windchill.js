function convertToF(celsius) {
  let fahrenheit = celsius * 9/5 + 32
  return fahrenheit;
};

function convertKphToMph(kph) {
  return kph * 0.6214;
};

function computeWindChillFactor(temp, windspeed){
  return 35.75 + (0.6215 * temp) + (0.4275 * temp * (Math.pow(windspeed, 0.16))) - (35.75*(Math.pow(windspeed,0.16)))
}

document.addEventListener("DOMContentLoaded", () => {
  const temperature = convertToF(
    parseFloat(document.getElementById("temperature").innerHTML)
  );
  const windSpeed = convertKphToMph(
    parseFloat(document.getElementById("wind-speed").innerHTML)
  );
  if(temperature <= 50 && windSpeed > 3){
    const windChillFactor = computeWindChillFactor(temperature, windSpeed);
    document.getElementById("wind-chill").innerHTML =  windChillFactor.toFixed(2);
  }else{
    document.getElementById("wind-chill").innerHTML = "N/A";
  }
});

