document.getElementById("year").textContent = new Date().getFullYear();
const inputslogform = document.getElementById("inputslogform");
const goinform = document.getElementById("goinform");
const inputssignform = document.getElementById("inputssignform");
const containerlogcls = document.getElementById("containerlogcls");
const containersigncls = document.getElementById("containersigncls");
const signlink = document.getElementById("signlink");
let welcometext = document.getElementById("welcometext");
history.pushState(null, "", "/home");

document.addEventListener("DOMContentLoaded", function(){
    if (navigator.userAgent.toLowerCase().match(/mobile|android|iphone|ipad|ipod/)){
        alert("Design of AICA Geo will be broken! Please enable 'Desktop Mode' on your phone");
    }
});

function displayTime(){
    const currentTime = new Date();
    document.getElementById("time").innerText = currentTime.toLocaleTimeString();
}

setInterval(displayTime, 1000);

function showlogform(){
    history.pushState(null, "", "/login");
    goinform.style.display = "flex";
    inputssignform.style.display = "none";
    inputslogform.style.display = "flex";
    containersigncls.style.display = "none";
    containerlogcls.style.display = "flex";
}

function closeform(){
    history.pushState(null, "", "/home");
    goinform.style.display = "none";
}

signlink.addEventListener("click", function(event){
    event.preventDefault();
    inputssignform.style.display = "flex";
    inputslogform.style.display = "none";
    containerlogcls.style.display = "none";
    containersigncls.style.display = "flex";
    history.pushState(null, "", "/");
});

function signUp(){
    const username = document.getElementById("usernamesign").value;
    const password = document.getElementById("passwordsign").value;

    if(username && password){
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        welcometext.content = "Welcome" + username;
        alert("Sign Up Successful!");
        showlogform();
    } 
    else{
        alert("Please fill in both fields.");
    }
}

function logIn(){
    const username = document.getElementById("usernamelog").value;
    const password = document.getElementById("passwordlog").value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        alert("Logged in as " + username);
        welcometext.content = "Welcome" + username;
        
        localStorage.setItem('loggedInUser', username);
        window.location.href = '/home';
    }
    else{
        alert("Invalid info!");
    }
}

function checkLoginStatus(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser){
        document.querySelector("header p").textContent = "Welcome, " + loggedInUser + "!";
    }
}

checkLoginStatus();
