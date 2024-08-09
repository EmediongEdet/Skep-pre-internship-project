const requestURL = 'https://github.com/Greenz081081/Skep-pre-internship-project/blob/main//data.';
// const discoveryCards = document.querySelector('.cards');

async function getData () {
  let response = await fetch(requestURL);
  if (response.ok) {
    let data = await response.json();
    console.log(`Received Data:${data}`);
    // buildCompanyCards(data);
  } else {
    throw Error(response.statusText);
  }
}

// function buildCompanyCards(data) {

// }

getData();

// const gridButton = document.querySelector("#grid");
// const listButton = document.querySelector("#list");
// const display = document.querySelector("article");

// gridButton.addEventListener("click", () => {
//   display.classList.add("grid");
//   display.classList.remove("list");
// });

// listButton.addEventListener("click", showList);

// function showList() {
//   display.classList.add("list");
//   display.classList.remove("grid");
// }