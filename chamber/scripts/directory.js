document.addEventListener("DOMContentLoaded", () => {
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

const url = './data/data.json'

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
  const response = await fetch(url);
  const directories = await response.json();
  
  console.log(directories)

  displayCategories(directories);
}



getDirectories();