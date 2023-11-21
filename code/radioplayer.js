const parentElement = document.getElementById("channels");
const radioUrl = "https://api.sr.se/api/v2/channels/?format=json";
/* fetch(radioUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
 */
async function getRadio() {
  const answer = await fetch(radioUrl);
  const data = await answer.json();
  console.log(data);

  data.channels.forEach((radioInfo) => {
    console.log(radioInfo);
    const audioTag = document.createElement("div");
    audioTag.className = "bild";
    audioTag.innerHTML = `<img class= "image" src="${radioInfo.image}"/>
<div>
<h2>${radioInfo.name}</h2>
<audio controls>
<source src= "${radioInfo.liveaudio.url}" type="audio/mpeg" />
</audio>
</div>`;
    audioTag.style.backgroundColor = `#${radioInfo.color}`;
    
    parentElement.appendChild(audioTag);
  });
}
getRadio();




