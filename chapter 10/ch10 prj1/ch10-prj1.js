document.addEventListener("DOMContentLoaded", function() {
    loadColors();
});

async function loadColors() {
    document.querySelector("#loader").style.display = "block";
    document.querySelector("main").style.display = "none";
    document.querySelector("aside").style.display = "none";

    const url = "http://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";

    const response = await fetch(url);
    const data = await response.json();

    document.querySelector("#loader").style.display = "none";
    document.querySelector("main").style.display = "block"; 
    document.querySelector("aside").style.display = "block";       

    // got data now display it
    
    generateSchemeList(data);

    setupViewHandler(data);
}

function generateSchemeList(data) {
    const schemeGroup = document.querySelector('article.scheme-group');

    data.forEach(d => {
        const h3 = document.createElement('h3');
        h3.textContent = d.title;
        const section = document.createElement('section');
        section.classList.add('scheme');

        const previewDiv = document.createElement('div');
        previewDiv.classList.add('preview');
        d.scheme.forEach( s => {
            const boxDiv = document.createElement('div');
            boxDiv.classList.add('color-box');
            boxDiv.style.backgroundColor = s.web;
            previewDiv.appendChild(boxDiv);
        });
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('actions');
        const btn = document.createElement('button');
        btn.setAttribute('data-id', d.id);
        btn.textContent = 'View';
        actionDiv.appendChild(btn);

        section.appendChild(previewDiv);
        section.appendChild(actionDiv);

        schemeGroup.appendChild(h3);
        schemeGroup.appendChild(section);
    });
}


function setupViewHandler(data) {
    // use event delegation
    document.querySelector("main").addEventListener('click', (e) => {
        if (e.target && e.target.nodeName == "BUTTON") {
            const id = e.target.getAttribute('data-id');
            const color = data.find( d => d.id == id);
            displaySchemeDetails(color);
        }
    });
}

function displaySchemeDetails(details) {
    const fieldset = document.querySelector('fieldset');
    fieldset.innerHTML = "";
    document.querySelector('aside h2').textContent = details.title;
    details.scheme.forEach( s => {
        const divRow = document.createElement('div');
        divRow.classList.add('colorRow'); 
        
        const divBox = document.createElement('div');
        divBox.classList.add('detailBox');
        divBox.style.backgroundColor = s.web;

        const span1 = document.createElement('span');
        span1.textContent = s.web;

        const span2 = document.createElement('span');
        span2.textContent = `rgb(${s.color.red},${s.color.green},${s.color.blue})`;

        const label = document.createElement('label');
        label.textContent = s.name;

        divRow.appendChild(divBox);
        divRow.appendChild(span1);
        divRow.appendChild(span2);
        divRow.appendChild(label);

        fieldset.appendChild(divRow);
    });


}