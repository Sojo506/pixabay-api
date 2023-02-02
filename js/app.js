const result = document.querySelector("#result");
const form = document.querySelector("#form");
const numberOfPages = 40;
let pages; 

window.onload = () => {
  form.addEventListener("submit", formValidate);
};

function formValidate(e) {
  e.preventDefault();

  const searchTerm = document.querySelector("#term").value;

  if (searchTerm === "") return showAlert("Add a search term");

  searghImages(searchTerm);
}

function showAlert(message) {
  const alertFound = document.querySelector(".bg-red-100");

  if (!alertFound) {
    const alert = document.createElement("P");
    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alert.innerHTML = `
      <span class="font-bold">Error!</span>
      <span class="block sm:inline">${message}</span>
    `;

    form.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function searghImages(searchTerm) {
  const key = "33306477-b09d02a7015541fa942019361";
  const url = `https://pixabay.com/api/?key=${key}&q=${searchTerm}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      pages = calculatePages(data.totalHits);
      console.log("🚀 ~ file: app.js:58 ~ .then ~ pages", pages)
      showImages(data.hits);
    });
}

function calculatePages(total) {
  return parseInt(Math.ceil(total / numberOfPages));
}

function showImages(images) {
  if (!images.length) return showAlert("There aren't coincidences");

  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }

  // go through images array and build HTML
  images.forEach((image) => {
    const { largeImageURL, tags, likes, views } = image;

    result.innerHTML += `
    <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 mb-2">
      <div class="bg-white">
        <img class="w-full" src="${largeImageURL}" alt="${tags}" />
        <div class="p-2">
          <p><strong>${likes}</strong> Likes</p>
          <p><strong>${views}</strong> Views</p>
          <a 
            class="block text-center w-full bg-blue-800 hover:bg-blue-700 text-white uppercase font-bold text-center rounded mt-5"
            href="${largeImageURL}" target="_blank" rel="noopener noreferrer">View Image</a>
        </div>
      </div>
    </div>
    `;
  });
}
