// Runs and GET info when the page is loaded
window.addEventListener("load", () => {
  // Get latitude and longitude units
  let long;
  let lat;
  let key;

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
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

      // use fetch, a getRequest on api call, then run the response
      fetch(api)
        .then((response) => {
          // convert info into JSON
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  }
});
