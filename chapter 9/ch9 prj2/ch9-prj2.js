document.addEventListener("DOMContentLoaded", function() {

   fetch('paintings.json')
    .then(response => response.json())
    .then(function(paintings) {
   const details = document.querySelector("#details");
   const list = document.querySelector("#paintings ul");
   const figure = document.querySelector("#details figure");

   generateThumbList(list, paintings);

   // use event delegation to handle clicks in list
   list.addEventListener('click', function(e) {
      if (e.target && e.target.nodeName == "IMG") {
         displayPaintingLarge(e.target);
      }
   });


   function generateThumbList(list, paintings) {
      // loop thru list of paintings and create <li><img></li>
      for (p of paintings) {
         const item = document.createElement('li');
         const thumb = document.createElement('img');
         thumb.src = "images/small/" + p.id + ".jpg";
         thumb.alt = p.title;
         thumb.dataset.id = p.id;
         item.appendChild(thumb);
         list.appendChild(item);
      }
   
   }

   function displayPaintingLarge(clickedThumbImage) {
      // retrieve the painting id from data-id attribute
      let id = clickedThumbImage.dataset.id;
      // find that painting in array
      const painting = paintings.find( function (p) { return p.id == id;});
      // display the found painting
      document.querySelector("#title").textContent = painting.title;
      document.querySelector("#artist").textContent = "By " + painting.artist;
      let image = document.createElement('img');
      image.src = "images/large/" + painting.id + ".jpg";
      // clear previous features
      figure.innerHTML = "";
      // display all features for this painting
      displayFeatures(painting.features);
      // add painting to image
      figure.appendChild(image);
   }


   function displayFeatures(features) {
      for (let f of features) {
         displaySingleFeatureRectangle(f);
      }
   }


   function displaySingleFeatureRectangle(feature) {
      let rect = document.createElement('div');
      rect.className = "box";
      rect.style.position = "absolute";
      rect.style.left = feature.upperLeft[0] + "px";
      rect.style.top = feature.upperLeft[1] + "px";
      rect.style.width = (feature.lowerRight[0] - feature.upperLeft[0]) + "px";
      rect.style.height = (feature.lowerRight[1] - feature.upperLeft[1]) + "px";
      
      // add event handlers for the feature rectangle
      rect.addEventListener('mouseover', function (e) {
         document.querySelector("#description").textContent = feature.description;
      });
      rect.addEventListener('mouseout', function (e) {
         document.querySelector("#description").textContent = "";
      });         
      // add the feature rectangle to the <figure> parent
      figure.appendChild(rect);
        }
        
    });
});
