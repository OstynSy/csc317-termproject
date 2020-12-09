var length = 0;

function fadeOut(event) {
    var fadeEffect = setInterval(function () {
        if (!event.style.opacity) {
            event.style.opacity = 1;
        }
        if (event.style.opacity > 0) {
            event.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            event.remove();
            length -= 1;
            document.getElementById('items-count').innerHTML = `There are ${length} photo(s) being shown`;
        }
    }, 50);
}

function createPhotoCard(data, containerDiv) {
    containerDiv.innerHTML += `<div id=photo- ${data.id} onclick="fadeOut(this);" class = "fadeOut"><img src= ${data.url} width="465" height="465" /><h1 id="title">${data.title}</h1></div>`;
}

let mainDiv = document.getElementById("container");

if (mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        document.getElementById('items-count').innerHTML = `There are ${photos.length} photo(s) being shown`;
        length = photos.length;
    })
}