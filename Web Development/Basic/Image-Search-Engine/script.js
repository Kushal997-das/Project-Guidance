const accesskey = "YIrToF44KiZZvhSHhpvqpPoWuv2dy4_vYKi61nRrjEU";

const searchForm = document.getElementById("search-form");

const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
// we get function by Id here not with class
const photodesc = document.getElementById("photo");

const showMoreBtn = document.getElementById("show-more-btn");

const showLessBtn = document.getElementById("show-less-btn");

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  const results = data.results;
  console.log(results);

  if (page === 1) {
    searchResult.innerHTML = "";
    // photodesc.innerHTML=""
  }

  results.map((result) => {
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    console.log(result.links.html);
    imageLink.target = "_blank";

    const image = document.createElement("img");
    image.src = result.urls.small;
    console.log(result.urls.small);

    const desc = document.createElement("h6");
    desc.innerText = result.alt_description;
    desc.style.color = "white";
    desc.style.textAlign = "center";
    desc.style.marginTop = "10px";
    desc.style.fontSize = "20px";
    desc.style.fontWeight = "600";
    desc.style.textDecoration = "none";

    imageLink.appendChild(image);
    imageLink.appendChild(desc);
    searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "block";
  if (page >= 2) {
    showLessBtn.style.display = "block";
  } else {
    showLessBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});
showLessBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
  }
  searchImage();
});
