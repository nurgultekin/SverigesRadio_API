// The answer that ChatGPT suggests.

/* Add an event listener so that the ensure that the JavaScript code will execute only after the HTML document is fully loaded. 
This is important when you're interacting with or modifying elements on the page, 
as it guarantees that the elements you're trying to access are available.*/

document.addEventListener("DOMContentLoaded", async function () {
    const radioURL = "https://api.sr.se/api/v2/channels/?format=json";

    async function parseData() {
        try {
            const response = await fetch(radioURL);
            const radio = await response.json();
            console.log('API Response:', radio);
            displayChannelInfo(radio.channels);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    // We are creating a container where where information about radio channels will be displayed.

    function displayChannelInfo(channels) {
        const channelInfoContainer = document.querySelector(".channels");

        // Clear any existing content
        /*By setting channelInfoContainer.innerHTML to an empty string (""), 
        you effectively remove all the existing HTML content inside the element. 
        This is a common and straightforward way to clear the content of an element
        before dynamically populating it with new content.*/ 
        channelInfoContainer.innerHTML = "";

        // Loop through each channel and display information
        channels.forEach(channel => {
            const channelContainer = document.createElement("div");
            channelContainer.className = "picture";

            // Log channel information for debugging
            console.log('Channel Information:', channel);

            // Check if an image object exists for the channel
            if (channel?.image) {
                const imgTag = document.createElement("img");
                imgTag.src = channel.image;
                channelContainer.appendChild(imgTag);
            }

            // Set the background color if the channel has a color property
            if (channel?.color) {
                channelContainer.style.backgroundColor = channel.color;
            }

            // Add a heading for the channel name
            const channelHeading = document.createElement("h2");
            channelHeading.textContent = channel.name || "Unknown Name";
            channelContainer.appendChild(channelHeading);

            // Add an audio tag for live audio if liveaudio.url exists
            if (channel?.liveaudio?.url) {
                const audioTag = document.createElement("audio");
                audioTag.controls = true;
                const sourceTag = document.createElement("source");
                sourceTag.src = channel.liveaudio.url;
                sourceTag.type = "audio/mpeg";
                audioTag.appendChild(sourceTag);
                channelContainer.appendChild(audioTag);
            }

            channelInfoContainer.appendChild(channelContainer);
        });
    }

    await parseData();
});
