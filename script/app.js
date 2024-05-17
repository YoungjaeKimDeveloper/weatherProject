const form = document.querySelector(".top-part");
const searchBar = document.querySelector(".searchBar");
const updateUI = document.querySelector(".bottom-part");
const details = document.querySelector(".details");
const imagePart = document.querySelector(".image-part");
const icon = document.querySelector(".icon");
const background = document.querySelector(".background");

const uiUpdate = (data) => {
  const { cityDets, weather } = data;
  const iconSrc = `img/icons${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  details.innerHTML = ` <div class="details">
    <p class="location csspart">${cityDets.EnglishName}</p>
    <p class="weather">${weather.WeatherText}</p>
    <p class="temperature">${weather.Temperature.Metric.Value}<span>&deg;</span></p>
  </div>`;

  icon.innerHTML = `<img src="img/icons/${weather.WeatherIcon}.svg" alt="Icon" />`;
  const backgroundUrl = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  background.setAttribute("src", backgroundUrl);
};
//update the night/day & icon images

const updateCity = async (data) => {
  const cityDets = await getCity(data);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };
};

form.addEventListener("submit", (e) => {
  // prevent Default Action
  e.preventDefault();
  // get city value
  const cityName = searchBar.value.trim();
  form.reset();
  if (updateUI.classList.contains("hidden")) {
    updateUI.classList.remove("hidden");
  }
  //update the ui with new city
  updateCity(cityName)
    .then((data) => uiUpdate(data))
    .catch((err) => {
      console.log(err);
    });
});
