import "./style.css";


//const apiError = document.getElementById("apiError");



function hasUrlKey(key) {
  const urlParams = new URLSearchParams(window.location.search);
 
  console.log(key);
  return urlParams.has(key);

}

if (hasUrlKey("demo")) {
  
  let url = "/mock/search/search.json";
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("homePage").style.display = "none";
      getMemes(data.memes);
    })
    .catch((error) => {
      console.error("Error fetching demo data:", error);
    });
} else {
  console.log("The key 'demo' is not present in the URL.");
}




//----------1
/* setAPI.addEventListener("click", async (event) => {
  
  userId = document.getElementById("userId").value;
  localStorage.setItem("apiKey", userId);
  //document.getElementById("homePage").style.display = "none";
  if (userId) {
   baseUrl = `https://api.humorapi.com/memes/search?number=30&api-key=${userId}`;
   //document.getElementById("homePage").style.display = "none";
   
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("You are not authorized. Please read https://humorapi.com/docs/#Authentication");
      }
      const data = await response.json();
      console.log(data);
      const homePage =document.getElementById("homePage");
      homePage.className="hidden";
      localStorage.setItem("apiKey", JSON.stringify(userId));
     getMemes(data.memes);
      
    } catch (error) {
      console.error("Fetch error:", error);
      apiError.innerText = error.message;
    }
  } else {
    alert("Please enter an API key");
    console.log("API key not provided");
  }
}); */


//-----------2

/* setAPI.addEventListener("click", async (event) => {
  const userId = document.getElementById("userId").value;
  const baseUrl = `https://api.humorapi.com/memes/search?number=30&api-key=${userId}`;
  const homePage = document.getElementById("homePage");
  const apiError = document.getElementById("apiError"); // Make sure this element exists in your HTML

  if (userId) {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("You are not authorized. Please read https://humorapi.com/docs/#Authentication");
      }
      const data = await response.json();
      console.log(data);
      homePage.className = "hidden";
      localStorage.setItem("apiKey", JSON.stringify(userId));
      getMemes(data.memes);
    } catch (error) {
      console.error("Fetch error:", error);
      apiError.innerText = error.message;
    }
  } else {
    alert("Please enter an API key");
    console.log("API key not provided");
  }
}); */

//-----------3
let baseUrl;
let userId;
const homePage = document.getElementById("homePage");
const apiError = document.getElementById("apiError"); 
const setAPI = document.getElementById("setapiBtn");
const memesContainer = document.querySelector(".memesContainer");

const fetchMemes = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("You are not authorized. Please read https://humorapi.com/docs/#Authentication");
    }
    const data = await response.json();
    console.log(data);
    homePage.classList.add("hidden");
    getMemes(data.memes);
  } catch (error) {
    console.error("Fetch error:", error);
    apiError.innerText = error.message;
  }
};

setAPI.addEventListener("click", async () => {
  userId = document.getElementById("userId").value;
  console.log(userId);
  if (userId) {
    baseUrl = `https://api.humorapi.com/memes/search?number=30&api-key=${userId}`;
    console.log(baseUrl);
    localStorage.setItem("apiKey", JSON.stringify(userId));
    await fetchMemes(baseUrl);
  } else {
    alert("Please enter an API key");
    console.log("API key not provided");
  }
});

const storedApiKey = JSON.parse(localStorage.getItem("apiKey"));
if (storedApiKey) {
  baseUrl = `https://api.humorapi.com/memes/search?number=30&api-key=${storedApiKey}`;
  fetchMemes(baseUrl);
  console.log(storedApiKey);
}

const searchMemes = document.getElementById("searchMemes");
searchMemes.addEventListener('keydown', async (event) => {
  if (event.key === "Enter") {
    const searchValue = event.target.value;
    console.log(searchValue);
    const apiKey = JSON.parse(localStorage.getItem("apiKey"));
    if (!apiKey) {
      console.log("API key not available");
      // my_modal_3.showModal(); 
    } else {
      const url = `https://api.humorapi.com/memes/search?api-key=${apiKey}&keywords=${searchValue}&number=30`;
      await fetchMemes(url);
    }
  }
});





async function getMemes(memes) {
  memesContainer.innerHTML = "";

  if (!memes || memes.length === 0) {
    memesContainer.innerHTML = "<p>No memes found.</p>";
    return;
  }

  const memeTitle= document.getElementById("meme-title");
  memeTitle.innerHTML=`<h1 class="text-3xl p-4">Memes</h1>`

  // const memeTitle = document.createElement("div");
  // memeTitle.innerHTML = ;
  // memesContainer.appendChild(memeTitle);

  memes.forEach((meme) => {
    if (meme.type === "image/jpeg" || meme.type === "image/png"){
      const memeDiv = document.createElement("div");
      memeDiv.className = "flex justify-center items-center rounded-lg shadow-xl overflow-hidden transition-all duration-300  hover:shadow-3xl focus:shadow-2xl relative group";
      console.log(meme.url);
      memeDiv.innerHTML = `
        <img
          src="${meme.url}"
          alt="${meme.description}"
          class="object-cover w-full h-96 transform transition-transform duration-300 hover:scale-105 focus:scale-105"
        />
        <div class="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button class="addbtn " data-id="${meme.id}" data-url="${meme.url}" data-description="${meme.description}">
            <svg
              fill="#FF0000"
              height="40px"
              width="40px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 471.701 471.701"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                  c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                  l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                  C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                  s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                  c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                  C444.801,187.101,434.001,213.101,414.401,232.701z"
                />
              </g>
            </svg>
          </button>
        </div>
      `;
      
      memesContainer.appendChild(memeDiv);
    }
  });

  document.querySelectorAll(".addbtn").forEach(button => {
    button.addEventListener("click", () => {
      let val = prompt("Save meme as");
      memelistArray.push({
        id: button.dataset.id,
        description: val,
        url: button.dataset.url
      });
      savememData();
      saveMemes();
    });
  });
}


let memelistArray = [];

function savememData() {
  localStorage.setItem("memelistArray", JSON.stringify(memelistArray));
}

function getmemeData() {
  const storedMemes = JSON.parse(localStorage.getItem("memelistArray"));
  if (storedMemes) {
    memelistArray = storedMemes;
  }
}


function saveMemes() {
  const memelist = document.getElementById("table");
  const memeSidelist = document.getElementById("sidebar");
  memeSidelist.innerHTML ="";
  memelist.innerHTML = "";

  memelistArray.forEach((meme) => {
    const tbody = document.createElement("tbody");
    const ulBody = document.createElement("li");
    tbody.innerHTML = `
    <tr>
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img src="${meme.url}" alt="${meme.description}" />
            </div>
          </div>
          <div class="font-bold">${meme.description}</div>
        </div>
      </td>
       </tr>
    `;
    ulBody.innerHTML =`<a class="">${meme.description}</a>`;
    memelist.appendChild(tbody);
    memeSidelist.appendChild(ulBody);
  });
}



function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme); 
}


function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }
}


document.querySelectorAll('[data-set-theme]').forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-set-theme');
    setTheme(theme);
  });
});





loadTheme();
getmemeData();
saveMemes();



