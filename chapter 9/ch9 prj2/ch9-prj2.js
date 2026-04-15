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
        
    }
})