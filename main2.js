//select elements
let Countries = document.getElementById("Countries");
let inputAmount = document.getElementById("inputAmount");
let inputTo = document.getElementById("to");
let button = document.getElementsByTagName("button")[0];
let equalBtn = document.getElementsByClassName("equal")[0];
fetch(
  `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=9159a3a986584dc9887ef4670f7755a9`
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    const allCountries = Object.keys(data.rates); // Array
    allCountries.forEach((e) => {
      const option = createOptions(e);
      Countries.appendChild(option);
    });

    function checkIsCorrect() {
      return allCountries.includes(inputTo.value);
    }

    function convertCurrency() {
      if (inputAmount.value !== "" && checkIsCorrect()) {
        equalBtn.innerHTML =
          (inputAmount.value * data.rates[inputTo.value]).toFixed(2) +
          " ~ " +
          Math.round(inputAmount.value * data.rates[inputTo.value]);
      } else {
        equalBtn.innerHTML =
          inputAmount.value === ""
            ? "Please fill in the amount"
            : "Please choose a valid currency";
      }
    }

    button.onclick = convertCurrency;

    inputAmount.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        convertCurrency();
      }
    });

    inputTo.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        convertCurrency();
      }
    });
  })
  .catch(function (err) {
    equalBtn.innerHTML = "Error fetching data";
    console.error("Network response was not ok", err);
  });

function createOptions(e) {
  let option = document.createElement("option");
  let optionText = document.createTextNode(e);
  option.appendChild(optionText);
  option.setAttribute("value", e);

  return option;
}
