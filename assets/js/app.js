var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
today = yyyy + '-' + mm + '-' + dd;
let currentMonth = months[+mm - 1];
var last2 = yyyy.toString().slice(-2);
let todayF = dd + ' ' + currentMonth + ' ' + last2;

document.getElementById('checkin').value = today;
document.getElementById('checkout').value = today;
document.getElementById('checkindate').innerText = today;
document.getElementById('checkindatelong').innerText = today;
document.getElementById('checkoutdate').innerText = today;
document.getElementById('checkoutdatelong').innerText = today;
console.log(todayF);
