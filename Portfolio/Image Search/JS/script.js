const accessKey = "Mqu_XkiYskCjYpwObGL1dGQbHJIGxnbRS94PuI-Aol8";
const formElement = document.getElementById("search-form");
const inputElement = document.getElementById("Search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;




async function searchImage() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
console.log(response)
     const data = await response.json();
console.log(data)
    const results = data.results;
console.log(results)

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    searchImage();
});

showMore.addEventListener("click", () => {
    searchImage();
});
