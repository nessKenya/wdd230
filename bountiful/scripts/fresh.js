const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json';

const populateSelect = async () => {
  const res = await fetch(url);

  const fruits = await res.json();

  const firstFruit = document.querySelector('#fruit1')
  const secondFruit = document.querySelector('#fruit2')
  const thirdFruit = document.querySelector('#fruit3')

  fruits.forEach((fruit, index) => {
    const option = document.createElement('option');
    option.value = fruit.name;
    option.innerText = fruit.name;
    firstFruit.add(option);
  });

  fruits.forEach((fruit, index) => {
    const option = document.createElement('option');
    option.value = fruit.name;
    option.innerText = fruit.name;
    secondFruit.add(option);
  });

  fruits.forEach((fruit, index) => {
    const option = document.createElement('option');
    option.value = fruit.name;
    option.innerText = fruit.name;
    thirdFruit.add(option);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  //populate select fields
  populateSelect();

  // form submission.
  const orderForm = document.getElementById("freshForm")
  orderForm.addEventListener("submit", (event) => {
   event.preventDefault();
   const formFruits = [
    document.querySelector("#fruit1").value,
    document.querySelector("#fruit2").value,
    document.querySelector("#fruit3").value,
   ];

   const selectedFruits = fruits.filter(fruit=>formFruits.includes(fruit.name));

   // compute total nutrients components
   const carbohydrates = selectedFruits.reduce((total, fruit)=>total+fruit.nutritions.carbohydrates,0);
   const protein = selectedFruits.reduce((total, fruit)=>total+fruit.nutritions.protein,0);
   const sugar = selectedFruits.reduce((total, fruit)=>total+fruit.nutritions.sugar,0);
   const calories = selectedFruits.reduce((total, fruit)=>total+fruit.nutritions.calories,0);
   const fat = selectedFruits.reduce((total, fruit)=>total+fruit.nutritions.fat,0);

   const formData = {
    firstName: document.querySelector("#firstName").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    fruits: selectedFruits,
    instructions: document.querySelector("#instructions").value,
    orderDate: new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
      new Date()
    ),
    nutritions: {
      carbohydrates,
      protein,
      sugar,
      calories,
      fat
    }
   }

   formData.fruits = formFruits;

   // order details
   document.getElementById("name_order").innerHTML = formData.firstName;
   document.getElementById("email_order").innerHTML = formData.email;
   document.getElementById("phone_order").innerHTML = formData.phone;
   document.getElementById("fruits_order").innerHTML = [...formData.fruits];
   document.getElementById("instructions_order").innerHTML = formData.instructions;
   document.getElementById("order_date").innerHTML = formData.orderDate;
   document.getElementById("carbohydrates").innerHTML = formData.nutritions.carbohydrates;
   document.getElementById("protein").innerHTML = formData.nutritions.protein;
   document.getElementById("fat").innerHTML = formData.nutritions.fat;
   document.getElementById("sugar").innerHTML = formData.nutritions.sugar;
   document.getElementById("calories").innerHTML = formData.nutritions.calories;
   
   // show order details
   const orderDetails = document.getElementById('orderDetails');
   
   orderDetails.classList.remove('hidden');

   window.location.hash = '#orderDetails';
   document.getElementById("orderDetails").scrollIntoView();

   let myOrders = JSON.parse(localStorage.getItem("myOrders"));
   if(myOrders){
    let updatedOrders = myOrders.concat(formData);
    localStorage.setItem("myOrders", JSON.stringify(updatedOrders));
   }else{
    localStorage.setItem("myOrders", [JSON.stringify([formData])])
   }
   
  });

});



