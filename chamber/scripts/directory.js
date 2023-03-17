document.addEventListener("DOMContentLoaded", () => {
  const day = new Date().getDay();

  if (day === 1 || day === 2) {
    document.getElementById("banner").classList.remove("hidden");
  }

  document.querySelector("#year").innerHTML = new Date().getFullYear();
  document.getElementById("updated").innerHTML = new Date();
  let today = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
    new Date()
  );
  document.querySelector("#today").innerHTML = today;

  const gridBtn = document.getElementById("grid");
  gridBtn.addEventListener('click', ()=>{
    document.getElementById("directory").classList.remove('list');
    document.getElementById("directory").classList.add('grid');
    listBtn.classList.remove('btn-active');
    gridBtn.classList.add('btn-active');
  });
  const listBtn = document.getElementById("list");
  listBtn.addEventListener('click', ()=>{
    document.getElementById("directory").classList.remove('grid');
    document.getElementById("directory").classList.add('list');
    listBtn.classList.add('btn-active');
    gridBtn.classList.remove('btn-active');
  });
});

function openMenu() {
  document.querySelector(".page-links").classList.remove("hidden");
  document.querySelector("#open-btn").classList.add("hidden");
  document.querySelector("#close-btn").classList.remove("hidden");
}

function closeMenu() {
  document.querySelector(".page-links").classList.add("hidden");
  document.querySelector("#open-btn").classList.remove("hidden");
  document.querySelector("#close-btn").classList.add("hidden");
}

const uri = './data/data.json'

const displayCategories = (data) => {
  data.directories.forEach(directory => {
    const card = document.createElement('div');
    card.classList.add('directory-card');

    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', directory.logo);
    logoImg.setAttribute('alt', `${directory.name} logo`);

    const span1 = document.createElement('span');
    span1.textContent = `${directory.name}`;

    const span2 = document.createElement('span');
    span1.textContent = `${directory.address}`;

    const span3 = document.createElement('span');
    span3.textContent = `${directory.phoneNumber}`;
    
    const span4 = document.createElement('span');
    span4.textContent = `${directory.name.toUpperCase()}`;

    const link = document.createElement('a');
    link.setAttribute('href', `${directory.websiteUrl}`);
    link.setAttribute('target', '_blank');
    link.innerHTML = 'visit website &rarrhk;';

    card.append(logoImg);
    card.append(span4)
    card.append(span1);
    card.append(span2);
    card.append(span3);
    card.append(link);

    const directoryContainer = document.getElementById('directory');
    directoryContainer.append(card);
  });
}

const getDirectories = async () => {
  const response = await fetch(uri);
  const directories = await response.json();

  displayCategories(directories);
}



getDirectories();