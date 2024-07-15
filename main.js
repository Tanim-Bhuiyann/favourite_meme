import "./style.css";
const setAPI = document.getElementById("setapiBtn");
const memesContainer = document.getElementById("memesContainer");

let baseUrl;
let userId;



setAPI.addEventListener("click", async () => {
  userId = document.getElementById("userId").value;
  if (userId) {
    baseUrl = `https://api.humorapi.com/memes/search?number=3&keywords=rocket&api-key=${userId}`;
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    document.getElementById("homePage").style.display = "none";
    console.log("working");
   
  } else {
    alert("not working");
    console.log("not working");
  }
});

function getMemes(memes) {
    memesContainer.innerHTML = ""; // Clear previous memes
    memes.forEach((meme) => {
      const memeDiv = document.createElement('div');
      memeDiv.classList.add("meme");

      const img = document.createElement('img');
      img.src = meme.url;
      img.alt = `Meme ${meme.id}`;
      img.classList.add("w-full", "h-auto");

      memeDiv.appendChild(img);
      memesContainer.appendChild(memeDiv);
    });
  }
