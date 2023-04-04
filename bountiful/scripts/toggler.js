const toggler = document.getElementById('toggler');
toggler.addEventListener('click', ()=>{
  const icon = document.getElementById('toggle-icon');
  if(icon.src.split('/').pop() === 'humburger.svg'){
    icon.setAttribute('src', './images/icons/close.svg');
    document.getElementById("dropdown-menu").classList.remove('hidden');
  }else{
    icon.setAttribute('src', './images/icons/humburger.svg');
    document.getElementById("dropdown-menu").classList.add('hidden');
  } 
});