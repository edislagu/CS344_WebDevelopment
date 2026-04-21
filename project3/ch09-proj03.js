document.addEventListener("DOMContentLoaded", function() {
    // process the two JSON files
    const users = JSON.parse(userContent);
    const stocks = JSON.parse(stockContent);

    generateUserList(users, stocks);

    // set up event handlers for form buttons
    document.querySelector('#btnSave').addEventListener('click', function (e) {
        // we don't want the form to submit (since we will lose form state)
        e.preventDefault();

        // find the user object in our data
        const id = document.querySelector('#userID').value;

        for (let i=0; i<users.length; i++) {
            // found relevant user, so update object at this index and redisplay
            if (users[i].id == id) {

                users[i].user.firstname = document.querySelector('#firstname').value;
                users[i].user.lastname = document.querySelector('#lastname').value;
                users[i].user.address = document.querySelector('#address').value;
                users[i].user.city = document.querySelector('#city').value;
                users[i].user.email = document.querySelector('#email').value;     

                generateUserList(users, stocks);
            }
        }
    });

    document.querySelector('#btnDelete').addEventListener('click', function (e) {
        // we don't want the form to submit (since we will lose form state)
        e.preventDefault();

        // find the user object in our data
        const id = document.querySelector('#userID').value;
        for (let i=0; i<users.length; i++) {
            // found relevant user, so delete object at this index and redisplay
            if (users[i].id == id) {
                users.splice(i,1);
                generateUserList(users, stocks);
            }
        }
        });

});


function generateUserList(users, stocks) {
    // begin by hiding the user details area until a user is selected
    const details = document.querySelector('section.Details');
    details.style.display = "none";

    // loop through users array and output an item for each user
    const list = document.querySelector('section.UserList ul');
    list.innerHTML = "";
    for (let u of users) {
        const item = document.createElement('li');
        item.textContent = u.user.lastname + ', ' + u.user.firstname;
        item.dataset.id = u.id;
        list.appendChild(item); 
    }

   // use event delegation to handle clicks in list
   list.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName == "LI") {
            displayUserDetails(e.target.dataset.id, users, stocks);
        }
    });    

}

function displayUserDetails(id, users, stocks) {
    // begin by hiding the stock area until a stock is viewed
    const stockArea = document.querySelector('#singleStock');
    if (stockArea) stockArea.style.display = "none";

    // display the user details section
    const details = document.querySelector('section.Details');
    details.style.display = "grid";
    // find the user portfolio object for this id
    const userPortfolio = users.find( function (p) { return p.id == id;});
    if (userPortfolio) {
        // populate the user form
        populateUserForm(id, userPortfolio.user);
        // populate the portfolio area
        populatePortfolio(userPortfolio.portfolio, stocks);
    }

}

function populateUserForm(id, user) {
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
}

function populatePortfolio(portfolio, stocks) {
    const area = document.querySelector('#listPortfolio');
    area.innerHTML = "";
    for (let p of portfolio) {
        const p1 = document.createElement('p');
        p1.textContent = p.symbol;
        const p2 = document.createElement('p');
        p2.textContent = p.owned;    
        const b1 = document.createElement('button');
        b1.textContent = 'View';   
        b1.dataset.symbol = p.symbol;
        
        area.appendChild(p1);
        area.appendChild(p2);
        area.appendChild(b1);
    }

    // use event delegation to handle clicks for view buttons
    area.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName == "BUTTON") {
            displayStock(e.target.dataset.symbol,stocks);
        }
    });     
}

function displayStock(symbol, stocks) {
    // begin by hiding the stock area until a stock is viewed
    const stockArea = document.querySelector('#singleStock');
    if (stockArea) {
        stockArea.style.display = "grid";

        // find the stock object for this symbol
        const stck = stocks.find( function (s) { return s.symbol == symbol;});

        document.querySelector('#stockName').textContent = stck.name;
        document.querySelector('#stockSector').textContent = stck.sector;
        document.querySelector('#stockIndustry').textContent = stck.subIndustry;
        document.querySelector('#stockAddress').textContent = stck.address;

        document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
}

