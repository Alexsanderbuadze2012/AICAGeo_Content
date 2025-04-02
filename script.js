document.getElementById("year").textContent = new Date().getFullYear();
const inputslogform = document.getElementById("inputslogform");
const goinform = document.getElementById("goinform");
const inputssignform = document.getElementById("inputssignform");
const containerlogcls = document.getElementById("containerlogcls");
const containersigncls = document.getElementById("containersigncls");
const signlink = document.getElementById("signlink");
history.pushState(null, "", "/home");

document.addEventListener("DOMContentLoaded", function() {
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
    containersigncls.style.display = "none";
}

function closeform(){
    history.pushState(null, "", "/home");
    goinform.style.display = "none";
}

signlink.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default navigation
    containerlogcls.style.display = "none";

    if (this.textContent === "Sign up instead...") {
        this.textContent = "Log in instead...";
        document.getElementById("inputslogform").style.display = "none"; 
        document.getElementById("inputssignform").style.display = "block";
        history.pushState(null, "", "/signin"); // Change URL to /signin
    } else {
        this.textContent = "Sign up instead...";
        document.getElementById("inputslogform").style.display = "block"; 
        document.getElementById("inputssignform").style.display = "none";
        history.pushState(null, "", "/"); // Change URL back to /
    }
});
