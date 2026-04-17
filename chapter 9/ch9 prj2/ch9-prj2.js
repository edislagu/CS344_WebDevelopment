document.addEventListener("DOMContentLoaded", function() {

    const painting = JSON.parse(content);
    const details = document.querySelector('#details');
    const list = document.querySelector('#paintings ul');
    const figure = document.querySelector('#details figure');

    generateThumbList(list, paintings);

    // use event delegation to handle clicks in list
    list.addEventListener('click', function(e) {
        if(e.target && e.target.nodeName == "IMG") {
            displayPaintingLarge(e.target);
        }

    });

    function generateThumbList(list, paintings) {
        // loop thru lists of paintings
        
        for(p of paintings) {
            const item = document.createElement('li');
            const thumb = document.createElement('img');
            thumb.src = "images/small" + p.id + ".jpg";
            thumb.alt = p.title;
            thumb.dataset.id = p.id;
            item.appendChild(thumb);
            list.appendChild(item);
        }
        
    }

    function displayPaintingLarge(clickedThumbImage) {
        let id = clickedThumbImage.dataset.id;

        const painting = paintings.find( function (p) { return p.id == id;});

        document.querySelector("#title").textContext = painting.title;
        document.querySelector("#artist").textContext = "By " + painting.artist;

        let image = "images/large/" + painting.id + ".jpg";

        figure.innerHTML = "";

        displayFeatures(painting.features);

        figure.appendChild(image);
    }

    function displaySingleFeatureRectangle(feature) {
        let rect = document.createElement('div');
        rect.className = "box";
        rect.style.position = "absolute";
        rect.style.left = feature.upperLeft[0] + "px";
        rect.style.top = feature.upperleft[1] = "px";
        rect.style.width = (feature.lowerRight[0] - feature.upperLeft[0]) + "px";
        rect.style.width = (feature.lowerRight[1] - feature.upperLeft[1]) + "px";

        rect.addEventListener('mouseover', function(e) {
            document.querySelector("#description").textContent = "";
        });

        rect.addEventListener('mouseout', function(e) {
            document.querySelector("#description").textContent = "";
        });

        figure.appendChild(rect);
    }
})