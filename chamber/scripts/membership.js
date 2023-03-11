function showMemberBanner(level){
  document.getElementById("benefit-listing").innerHTML = "";
  if(level === 'gold'){
    document.getElementById("m-level").innerHTML = 'GOLD MEMBER';
    document.getElementById("pricing").innerHTML = '$29.99/mo';
    showBenefits(level);
  } else if(level === 'silver'){
    document.getElementById("m-level").innerHTML = 'SILVER MEMBER';
    document.getElementById("pricing").innerHTML = '$19.99/mo';
    showBenefits(level);
  } else if(level === 'bronze'){
    document.getElementById("m-level").innerHTML = 'BRONZE MEMBER';
    document.getElementById("pricing").innerHTML = '$9.99/mo';
    showBenefits(level);
  } else {
    document.getElementById("m-level").innerHTML = 'NP MEMBER';
    document.getElementById("pricing").innerHTML = '$0.00';
    showBenefits(level);
  }
}

function showAllowedBenefit(benefit){
  let span = document.createElement('span');
  span.classList.add('benefit');
  let childSpan = document.createElement('span');
  childSpan.classList.add('check');
  childSpan.append('✔');
  span.append(childSpan)
  span.append(benefit);
  document.getElementById("benefit-listing").append(span)
}

function showUnallowedBenefit(benefit){
  let span = document.createElement('span');
  span.classList.add('benefit');
  let childSpan = document.createElement('span');
  childSpan.classList.add('x');
  childSpan.append('✘');
  span.append(childSpan)
  span.append(benefit);
  document.getElementById("benefit-listing").append(span)
}

function showBenefits(level){
  const benefits = ['training', 'advertising', 'support 24/7', 'event discounts', 'business contacts', 'customer referrals', 'visibility in the community', 'funding opportunities'];
  if(level==='gold'){
    const allowed = ['training', 'advertising', 'support 24/7', 'event discounts', 'business contacts', 'customer referrals', 'visibility in the community', 'funding opportunities'];
    benefits.forEach(benefit=>{
      if(allowed.includes(benefit)){
        showAllowedBenefit(benefit);
      }
      else{
       showUnallowedBenefit(benefit);
      }
    })
  }else if(level==='silver'){
    const allowed = ['training', 'advertising', 'event discounts', 'business contacts', 'visibility in the community', 'funding opportunities'];
    benefits.forEach(benefit=>{
      if(allowed.includes(benefit)){
        showAllowedBenefit(benefit);
      }
      else{
       showUnallowedBenefit(benefit);
      }
    })
  }else if(level==='bronze'){
    const allowed = ['training', 'event discounts', 'visibility in the community', 'funding opportunities'];
    benefits.forEach(benefit=>{
      if(allowed.includes(benefit)){
        showAllowedBenefit(benefit);
      }
      else{
       showUnallowedBenefit(benefit);
      }
    })
  } else {
    const allowed = ['training', 'visibility in the community'];
    benefits.forEach(benefit=>{
      if(allowed.includes(benefit)){
        showAllowedBenefit(benefit);
      }
      else{
       showUnallowedBenefit(benefit);
      }
    })
  }
}

document.getElementById("membershipLevel").addEventListener("change", ()=>{
  document.getElementById("membership-banner").classList.remove("hidden");
  document.getElementById("membership-banner").classList.remove("flex-box");
  document.getElementById("membership-banner").classList.add("flex-box");
  let level = document.getElementById("membershipLevel").value;
  showMemberBanner(level);
});

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();
if(month < 10){
  month = "0" + month;
}

if(day < 10){
  day = "0" + day;
}
if(hours < 10){
  hours = "0" + hours;
}

if(minutes < 10){
  minutes = "0" + minutes;
}

if(seconds < 10){
  seconds = "0" + seconds;
}


const today = new Date().getFullYear() + "-" + month + "-" + day;
const time = hours + ":" + minutes + ":" + seconds;
document.getElementById("today").value = today;
document.getElementById("time").value = time;

console.log(document.getElementById("today").value)
console.log(document.getElementById("time").value)
