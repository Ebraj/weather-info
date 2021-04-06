/**
 * Getting the DOM Element...
 */
const inputField = document.getElementById("input-field");
const submitBtn = document.getElementById("submit-btn");
const resultSection = document.querySelector(".result-section");
const cardInfo = document.querySelectorAll(".result-section--card-info");
const success = document.querySelector(".result-success");
const failure = document.querySelector(".result-failure");
let exactLocation, temperature, description;

/**
 * Adding the Event/Handling the Event...
 */
submitBtn.addEventListener("click", showSearch);

//Event Listener
function showSearch(e) {
  let inputVal = inputField.value;
  e.preventDefault();
  getData(inputVal);
  inputField.value = "";
}

// Creating the function
async function getData(location) {
  let reqURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a70ed3736f3e0abf89e7ee1131dcd676`;
  let response = await fetch(reqURL);
  if (response.status >= 200 && response.status < 400) {
    //Do the operations
    let datas = await response.json();
    //Assigning the data
    exactLocation = datas.name;
    temperature = datas.main.temp;
    description = datas.weather[0].description;

    //Displaying the success message
    cardInfo[0].textContent = exactLocation;
    cardInfo[1].textContent = `${temperature}°C`;
    cardInfo[2].textContent = description;

    resultSection.classList.add(".open");
    // resultSection.hidden = false;
    success.hidden = false;
    setTimeout(() => {
      success.hidden = true;
    }, 2000);
  } else {
    //Updating the value...
    //Displaying the success message
    cardInfo[0].textContent = "";
    cardInfo[1].textContent = "";
    cardInfo[2].textContent = "";

    //Displaying the error message
    failure.hidden = false;
    setTimeout(() => {
      failure.hidden = true;
    }, 2000);
  }
}
