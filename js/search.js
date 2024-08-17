document.addEventListener("DOMContentLoaded", function () {

    const requestURL = 'https://greenz081081.github.io/DataFiles/data/data.json';
    const searchHTML = document.querySelector("#searchItem");
  
  
    async function getData() {
      let response = await fetch(requestURL);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
  
        searchHTML.addEventListener("input", () => searchItem(event));
      } else {
        throw Error(response.statusText);
      }
    }
  
    getData();



function searchItem (event) {
    // Code here to search for a product
    const searchTerm = ""
    searchTerm = event.target.value;
    console.log(searchTerm);
};

searchItem();
})