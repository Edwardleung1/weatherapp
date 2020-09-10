// Runs and GET info when the page is loaded
window.addEventListener("load", () => {
  // Get latitude and longitude units
  let long;
  let lat;
  let key;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  // if exists, find the location of the user
  if (navigator.geolocation) {
    // get user location
    navigator.geolocation.getCurrentPosition((position) => {
      // get position values
      long = position.coords.longitude;
      lat = position.coords.latitude;
      key = "030be1451c803b10097d32ebdadbec04";

      // allow you to make request from local host, acting like a proxy
      const proxy = "https://cors-anywhere.herokuapp.com/";
      // api call
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

      // use fetch, a getRequest on api call, then run the response
      fetch(api)
        .then((response) => {
          // convert info into JSON
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // pull out data
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { name } = data;
          // Set DOM elements from the API
          temperatureDegree.textContent = Math.ceil(temp - 273.15);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = name;
        });
    });
  }
});
