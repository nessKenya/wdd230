const images = document.querySelectorAll("[data-src]");

const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px -500px 0px",
};

const loadImage = (img) => {
  const src = img.getAttribute("data-src");
  img.src = src;
  img.onload = () => {
    img.removeAttribute("data-src");
    img.classList.remove("scale");
    console.log(img)
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