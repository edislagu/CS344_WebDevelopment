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
})