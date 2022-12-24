const apiURL = 'https://api.agify.io'; // it's good practice to have a const value as the api url...

let name = '';
let age = 0; 

function getage(){
    const userName = document.getElementById('username').value;
    const country = document.getElementById('country').value;
    const modalWindowOverlay = document.getElementById("modal-overlay");
    const errorMessage =  document.getElementById('error-message'); 
    const closeModalButton = document.getElementById("close-modal");

    const hideModalWindow = () => {
        modalWindowOverlay.style.display = 'none';
    }
    
    closeModalButton.addEventListener("click", hideModalWindow);

    errorMessage.innerHTML = ''; // clearing it everytime.. in case it already has a message inside
    errorMessage.style = 'display:none'; 

    console.log(isUserNameValid(userName));
    console.log(isCountryValid(country));

    if(isDataValid(userName,country) == true && checkIfCountryExists(country) == true){  // if statement that pulls the API and then calls a function should the conditions be met. It then pushes the repsonse placed within the input boxes as well as predicting the age of said user.
        fetch(apiURL + '?name=' + userName + '&country_id=' + country)
        .then(res => res.json() ) 
        .then(response => {
            console.log(response);
            modalWindowOverlay.style.display = 'flex';
            document.getElementById('result').innerHTML = getModalMessage(response.name, response.age, response.country_id);
        })
        .catch(error => console.error('Error:', error));
    }else{
        if(isUserNameValid(userName) == true){
            fetch(apiURL + '?name=' + userName)
            .then(res => res.json() ) 
            .then(response => {
                console.log(response);
                modalWindowOverlay.style.display = 'flex';
                document.getElementById('result').innerHTML = getModalMessageNoCountry(response.name, response.age);
            })
            .catch(error => console.error('Error:', error));
        }else{
            // does something to tell the user that the data is invalid
            console.log("Data is invalid");
            errorMessage.innerHTML = whatsWrong(userName,country); // clearing it everytime.. in case it already has a message inside
            errorMessage.style = 'display: block'; 
        }
    }
}    

// HELPER FUNCTIONS

// I have assumed that a normal persons name has more than 3 letters, no one is called b or ba .... 
// Every country code must be 2 chars min so it's in valid if its greater or smaller..

function isUserNameValid(userName){
   return (userName != null || userName == ''|| userName.length >= 3 );
}

function isCountryValid(country){
   return (country != null  || country == ''||country.length == 2);
}

function isDataValid(userName,country){
    return(isUserNameValid(userName) == true && isCountryValid(country) == true);
}


// Addtional check to see if the country code is real... you can remove this should it need to be
function checkIfCountryExists(entry){
    return (country_codes[entry.toUpperCase()] != null);
}


function whatsWrong(userName,country){ // This defines what is allowed to be inputted and what error code should show ! 

    if(userName == null || userName == '' && country == null || country == ''){
        return "Please enter a name and a country code"; 
    }

    if(userName == null || userName == '' || userName.length < 3 ){
        return "Please enter a name greater than 3 chars"; 
    }
    if(country == null || country == ''  ||  country.length < 2 || checkIfCountryExists(country) == false){
        return "Please enter a valid country code"
    }
}

function getModalMessage(name, age, country){  // this function is essentially what is printed out on the pop up
    let message = ''; 
    message += '<div>'; 
    message += '<h2>We predict that the age of <span class="orange">' + name.trim() + '</span> in <span class="orange">' + country + '</span> is: </h2>' ; 
    message += '<h3 class="big orange">'+age+'</h3>'
    message += '</div>'; 
    return message;
}

function getModalMessageNoCountry(name, age){
    let message = ''; 
    message += '<div>'; 
    message += '<h2>We predict that the age of <span class="orange">' + name.trim() + '</span> is: </h2>' ; 
    message += '<h3 class="big orange">'+age+'</h3>'
    message += '</div>'; 
    return message;
}

const showModalWindow = () => {
    modalWindowOverlay.style.display = 'flex';
}

const hideModalWindow = () => {
    modalWindowOverlay.style.display = 'none';
}

function ClearFields() {
    document.getElementById('error-message').innerHTML = ''; // clearing it everytime.. in case it already has a message inside
    document.getElementById('error-message').style = 'display:none'; 
    document.getElementById("username").value = "";
    document.getElementById("country").value = "";
}
