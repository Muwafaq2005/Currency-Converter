const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("#submit");
const fromCurr = document.querySelector("#currency1");
const toCurr = document.querySelector("#currency2");
const result = document.querySelector("#result");
const msg = document.querySelector("#msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.id === "currency1" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.id === "currency2" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (Element) => {
  const currCode = Element.value;
  const countryCode = countryList[currCode];
  const flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = Element.parentElement.querySelector("img");
  img.src = flag;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  let url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(exchangeRate);
  let convertedAmount = amtval * exchangeRate;
  msg.innerHTML = `${amtval} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`
};


