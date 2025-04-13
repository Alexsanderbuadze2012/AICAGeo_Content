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
        alert("Design of AICA Geo may be broken! Please enable 'Desktop Mode' on your phone");
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

function logIn() {
    const username = document.getElementById("usernamelog").value;
    const password = document.getElementById("passwordlog").value;
    console.log("Logging in with:", username, password);  // Debug log
    fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Login response:", data);  // Debug log
        if (data.message.startsWith("Welcome back")) {
            document.cookie = `authToken=${data.token}; path=/; max-age=3600`;  // Store token in cookies
            alert(data.message);
            window.location.href = '/home'; // Redirect to home after login
        } else {
            alert("Invalid username or password!");
        }
    })
    .catch(error => console.error("Login error:", error));
}

function checkLoginStatus() {
    const token = document.cookie.split('=')[1];
    if (!token) {
        return;  // No token found, the user is not logged in
    }

    fetch("/api/protected", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}` // Get token from cookies
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "You are logged in!") {
            document.querySelector("header p").textContent = `Welcome, ${data.user.username}!`;
            document.getElementById("logoutbtn").style.display = "block";
            document.getElementById("logbtn").style.display = "none";
            document.getElementById("createpostbtn").style.display = "block";
        } else {
            document.getElementById("logoutbtn").style.display = "none";
            document.getElementById("logbtn").style.display = "block";
            document.getElementById("createpostbtn").style.display = "none";
        }
    })
    .catch(error => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", checkLoginStatus);

function logout() {
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

function submitPost() {
    const token = document.cookie.split('=')[1];
    const postContent = document.getElementById("postContent").value;

    fetch("/api/createPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Send token in header
        },
        body: JSON.stringify({ content: postContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Post created successfully") {
            alert(data.message);
            window.location.href = "/home";  // Redirect or update UI accordingly
        }
    })
    .catch(error => console.error("Error:", error));
}
