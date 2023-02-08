const signin = document.getElementById("signin");
signin.addEventListener("click", () => {
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (accounts.signIn(name, password)) {
        location.href = "../index.html";
    } else {
        console.log("Invalid Sign-in information.  Please try again (unless you are trying to steal information, then please don't try again.");
    }
},)