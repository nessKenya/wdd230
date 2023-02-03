document.addEventListener("DOMContentLoaded", () => {
  const day = new Date().getDay();

  if(day === 1 || day === 2){
    document.getElementById("banner").classList.remove('hidden');
  }

  document.querySelector("#year").innerHTML = new Date().getFullYear();
  document.getElementById("updated").innerHTML = new Date();
  let today = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(new Date());
  document.querySelector("#today").innerHTML = today;
});

function openMenu(){
  document.querySelector(".page-links").classList.remove("hidden");
  document.querySelector("#open-btn").classList.add("hidden");
  document.querySelector("#close-btn").classList.remove("hidden");
}

function closeMenu() {
  document.querySelector(".page-links").classList.add("hidden");
  document.querySelector("#open-btn").classList.remove("hidden");
  document.querySelector("#close-btn").classList.add("hidden");
}
