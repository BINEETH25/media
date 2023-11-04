document.addEventListener("DOMContentLoaded", function () {
    const mediaForm = document.getElementById("mediaForm");
    const mediaItemsGrid = document.getElementById("mediaItemsGrid");
    const mediaFilesInput = document.getElementById("mediaFiles");

    // Event listener for form submission
    mediaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(mediaForm);

        // Send a POST request to the server to add the media items
        fetch("/addMediaItem", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            // Refresh the media list to include the newly added items
            refreshMediaList();
        })
        .catch((error) => console.error("Error adding media items:", error));
    });

    // Event listener for media file input change
    mediaFilesInput.addEventListener("change", function () {
        if (this.files.length > 0) {
            const mediaFiles = this.files;
            for (const mediaFile of mediaFiles) {
                createAndAppendMediaCard(mediaFile);
            }
        }
    });

    function createAndAppendMediaCard(mediaFile) {
        const card = document.createElement("div");
        card.className = "media-card";

        if (mediaFile.type.startsWith("audio/")) {
            const audioElement = createMediaElement("audio", mediaFile);
            const playButton = createPlayButton(audioElement);
            card.appendChild(audioElement);
            card.appendChild(playButton);
        } else if (mediaFile.type.startsWith("video/")) {
            const videoElement = createMediaElement("video", mediaFile);
            const playButton = createPlayButton(videoElement);
            card.appendChild(videoElement);
            card.appendChild(playButton);
        }

        mediaItemsGrid.appendChild(card);
    }

    function createMediaElement(mediaType, mediaFile) {
        const mediaElement = document.createElement(mediaType);
        mediaElement.controls = true;
        mediaElement.src = URL.createObjectURL(mediaFile);
        return mediaElement;
    }

    function createPlayButton(mediaElement) {
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.addEventListener("click", function () {
            mediaElement.play();
        });
        return playButton;
    }

    function refreshMediaList() {
        // You can implement your logic for displaying media items here
    }
});
