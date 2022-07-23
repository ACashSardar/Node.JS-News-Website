let body = document.getElementById("body");
let nav = document.getElementById("my-nav");
let navLinks = document.getElementsByClassName("nav-link");
let brandName = document.getElementById("brand");
let themeBtn = document.getElementsByClassName("btn text-light toggle");
let cardText = document.getElementsByClassName("card-text");
let cardTitle = document.getElementsByClassName("card-title");
let cardBody = document.getElementsByClassName("card-body");
let cardBodyLwr = document.getElementsByClassName("card-body lower");
let info = document.getElementsByClassName("info");
let icon = document.querySelectorAll(".info span i");

function setWhiteTheme() {
  localStorage.setItem("Theme", "White");
  body.style.background = "white";
  nav.style.background = "white";
  brandName.style.color = "black";

  Array.from(navLinks).forEach((e) => {
    e.style.color = "#333";
    e.style.transition = "0.5s";
  });

  Array.from(cardText).forEach((e) => {
    e.style.color = "black";
    e.style.transition = "0.5s";
  });
  Array.from(cardTitle).forEach((e) => {
    e.style.color = "black";
    e.style.transition = "0.5s";
  });
  Array.from(info).forEach((e) => {
    e.style.color = "black";
    e.style.transition = "0.5s";
  });
  Array.from(cardBody).forEach((e) => {
    e.style.background = "#eeeeee";
    e.style.transition = "0.5s";
  });
  Array.from(cardBodyLwr).forEach((e) => {
    e.style.background = "white";
    e.style.transition = "0.5s";
  });
  Array.from(icon).forEach((e) => {
    e.style.color = "darkcyan";
    e.style.transition = "0.5s";
  });
  Array.from(themeBtn).forEach((e) => {
    e.innerHTML = `<i class="fa fa-moon"></i> Dark`;
    e.style.background = "#333";
    e.style.transition = "0.5s";
  });
  console.log(localStorage.getItem("Theme"));
}

function setBlackTheme() {
  localStorage.setItem("Theme", "Black");
  body.style.background = "black";
  nav.style.background = "black";
  brandName.style.color = "white";

  Array.from(navLinks).forEach((e) => {
    e.style.color = "white";
    e.style.transition = "0.5s";
  });

  Array.from(cardText).forEach((e) => {
    e.style.color = "white";
    e.style.transition = "0.5s";
  });
  Array.from(cardTitle).forEach((e) => {
    e.style.color = "white";
    e.style.transition = "0.5s";
  });
  Array.from(info).forEach((e) => {
    e.style.color = "white";
    e.style.transition = "0.5s";
  });
  Array.from(cardBody).forEach((e) => {
    e.style.background = "#333";
    e.style.transition = "0.5s";
  });
  Array.from(cardBodyLwr).forEach((e) => {
    e.style.background = "black";
    e.style.transition = "0.5s";
  });
  Array.from(icon).forEach((e) => {
    e.style.color = "greenyellow";
    body;
    e.style.transition = "0.5s";
  });
  Array.from(themeBtn).forEach((e) => {
    e.innerHTML = `<i class="fa fa-asterisk"></i> Light`;
    e.style.background = "lightseagreen";
    e.style.transition = "0.5s";
  });
  console.log(localStorage.getItem("Theme"));
}

Array.from(themeBtn).forEach((elem) => {
  elem.addEventListener("click", () => {
    if (localStorage.getItem("Theme") == "Black") {
      setWhiteTheme();
    } else {
      setBlackTheme();
    }
  });
});

if (
  localStorage.getItem("Theme") != null &&
  localStorage.getItem("Theme") == "Black"
) {
  setBlackTheme();
} else if (
  localStorage.getItem("Theme") != null &&
  localStorage.getItem("Theme") == "White"
) {
  setWhiteTheme();
} else {
  setBlackTheme();
}
