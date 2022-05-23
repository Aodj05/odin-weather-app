const form = document.querySelector(".top form");
const input = document.querySelector(".top input");
const msg = document.querySelector(".top .msg");
const list = document.querySelector(".api .cities");
const apiKey = "00fa8c3fd061d86c5772bedf4345a21b";

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal.value;
  const listItems = list.querySelectorAll(".api .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal  = inputVal.split(",")[0];
          content = el.querySelector(".city-name span").textContent.toLowerCase();
      } else {
        content = el.querySelector(".city-name").dataset.name.toLowerCase();
      }
    } else {
      content = el.querySelector(".city-name span").textContent.toLowerCase();
    }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You have already seen the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...or try providing the countey code as well`;
      form.reset();
      input.focus();
      return;
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
  weather[0]["icon"]
}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
      </div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search a valid city";
    });
    msg.textContent = "";
    form.reset();
    input.focus();
});