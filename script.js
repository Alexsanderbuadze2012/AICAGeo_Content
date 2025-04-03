document.getElementById("year").textContent = new Date().getFullYear();
const inputslogform = document.getElementById("inputslogform");
const goinform = document.getElementById("goinform");
const inputssignform = document.getElementById("inputssignform");
const containerlogcls = document.getElementById("containerlogcls");
const containersigncls = document.getElementById("containersigncls");
const signlink = document.getElementById("signlink");
let welcometext = document.getElementById("welcometext");
const createpostform = document.getElementById("createpostform");
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

    if (username && password){
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.username === username);
        if (userExists){
            alert("Username already exists. Please choose another.");
            return;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        welcometext.textContent = "Welcome " + username;
        alert("You have been signed up!");
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

    if (user){
        alert("Logged in as " + username);
        welcometext.textContent = "Welcome " + username;
        localStorage.setItem('loggedInUser', username);
        window.location.href = '/home';
    }
    else{
        alert("Either account does not exist or invalid inputs! | ან ანგარიში არ არსებობს ან თქვენი შეყვანილი ინფორმაცია არასწორია!");
    }
}

function checkLoginStatus(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    const logoutBtn = document.getElementById("logoutbtn");
    const logBtn = document.getElementById("logbtn");

    if (loggedInUser){
        document.querySelector("header p").textContent = "Welcome, " + loggedInUser + "!";
        logoutBtn.style.display = "block";
        logBtn.style.display = "none";
        createpostbtn.style.display = "block";
    } 
    else{
        logoutBtn.style.display = "none";
        logBtn.style.display = "block";
        createpostbtn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", checkLoginStatus);

function logout(){
    localStorage.removeItem("loggedInUser");
    welcometext.textContent = "Welcome, Guest";
    alert("You have been logged out.");
    window.location.href = "/home";
}

function createPost(){
    goinform.style.display = "flex";
    createpostform.style.display = "flex";
}
