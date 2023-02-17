const daysDifference = (startDate, endDate) => {
  const difference = endDate.getTime() - startDate.getTime();
  const days = Math.floor(difference / (1000 * 3600 * 24));
  return days;
}

document.addEventListener("DOMContentLoaded", ()=>{
  const lastVisit = localStorage.getItem('@last-visit');
  if(!lastVisit){
    localStorage.setItem('@last-visit', new Date().toDateString());
    document.getElementById('last-visit').innerHTML = `Welcome!`
  } else {
    const days = daysDifference(new Date(lastVisit), new Date());
    document.getElementById('last-visit').innerHTML = `Welcome Back! Last visited: ${days === 0 ? "Today.": `${days} days ago.`}`
    localStorage.setItem('@last-visit', new Date().toDateString());
  }
});

const images = document.querySelectorAll("[data-src]");

const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
};

const loadImage = (img) => {
  const src = img.getAttribute("data-src");
  img.src = src;
  img.onload = () => {
    img.removeAttribute("data-src");
    img.parentElement.classList.remove("scale");

  };
}

const imageObserver = new IntersectionObserver((imgEntries, imageObserver)=>{
  imgEntries.forEach(imgEntry=>{
    if(!imgEntry.isIntersecting){
      return;
    } else {
      loadImage(imgEntry.target);
      imageObserver.unobserve(imgEntry.target);
    }
  })
}, imageOptions);

images.forEach(image=>imageObserver.observe(image));