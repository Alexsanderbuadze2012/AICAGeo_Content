document.getElementById("year").textContent = new Date().getFullYear();
const inputslogform = document.getElementById("inputslogform");
const goinform = document.getElementById("goinform");
const inputssignform = document.getElementById("inputssignform");
const containerlogcls = document.getElementById("containerlogcls");
const containersigncls = document.getElementById("containersigncls");
const signlink = document.getElementById("signlink");
let welcometext = document.getElementById("welcometext");
const createpostform = document.getElementById("createpostform");
const containerpostcls = document.getElementById("containerpostcls");
history.pushState(null, "", "/home");

document.addEventListener("DOMContentLoaded", function () {
    if (navigator.userAgent.toLowerCase().match(/mobile|android|iphone|ipad|ipod/)) {
        alert("Design of AICA Geo will be broken! Please enable 'Desktop Mode' on your phone");
    }
});

function displayTime() {
    const currentTime = new Date();
    document.getElementById("time").innerText = currentTime.toLocaleTimeString();
}

setInterval(displayTime, 1000);

function showlogform() {
    history.pushState(null, "", "/login");
    goinform.style.display = "flex";
    inputssignform.style.display = "none";
    inputslogform.style.display = "flex";
    containersigncls.style.display = "none";
    containerlogcls.style.display = "flex";
}

function closeform() {
    history.pushState(null, "", "/home");
    goinform.style.display = "none";
}

signlink.addEventListener("click", function (event) {
    event.preventDefault();
    inputssignform.style.display = "flex";
    inputslogform.style.display = "none";
    containerlogcls.style.display = "none";
    containersigncls.style.display = "flex";
    history.pushState(null, "", "/");
});

function signUp() {
    const username = document.getElementById("usernamesign").value;
    const password = document.getElementById("passwordsign").value;
    if (username && password) {
        fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "User signed up successfully") {
                    alert("You have been signed up!");
                    showlogform();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error("Error:", error));
    } else {
        alert("Please fill in both fields.");
    }
}

function logIn() {
    const username = document.getElementById("usernamelog").value;
    const password = document.getElementById("passwordlog").value;
    fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message.startsWith("Welcome back")) {
                alert(data.message);
                welcometext.textContent = data.message;
                document.getElementById("homeView").style.display = "block";
                document.getElementById("loginView").style.display = "none";
            } 
            else{
                alert("Invalid username or password!");
            }
        })
        .catch(error => console.error("Error:", error));
}

function checkLoginStatus() {
    const logoutBtn = document.getElementById("logoutbtn");
    const logBtn = document.getElementById("logbtn");
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.querySelector("header p").textContent = `Welcome, ${loggedInUser}!`;
        logoutBtn.style.display = "block";
        logBtn.style.display = "none";
        createpostbtn.style.display = "block";
    } else {
        logoutBtn.style.display = "none";
        logBtn.style.display = "block";
        createpostbtn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", checkLoginStatus);

function logout(){
    fetch("/api/logout", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            welcometext.textContent = "Welcome, Guest";
            window.location.href = "/home";
        })
        .catch(error => console.error("Error:", error));
}

function createPost() {
    goinform.style.display = "flex";
    createpostform.style.display = "flex";
    containerpostcls.style.display = "flex";
}
