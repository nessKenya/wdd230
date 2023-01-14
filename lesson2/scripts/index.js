document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year").innerHTML = new Date().getFullYear();
  document.getElementById("updated").innerHTML = new Date()
});