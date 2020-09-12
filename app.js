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

      // api call
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

      // use fetch, a getRequest on api call, then run the response
      fetch(api)
        .then((response) => {
          // convert info into JSON
          return response.json();
        })
        .then((data) => {
          // pull out data
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { name } = data;
          const { icon } = data.weather[0];
          // Set DOM elements from the API
          temperatureDegree.textContent = Math.floor(temp);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = name;

          //set icon
          document.getElementById("icon-id").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        });
    });
  } else {
    h1.textContent = "This browser does not support geolocation.";
  }
});
