const str = window.location.href;
console.log(str,"location");

const url = new URL(str);
console.log(url,"URL");

let regexname = /[a-zA-Z0-9 -]+$/;

const id = url.search;
console.log(id,"ID");

let result = id.match(regexname);
console.log(result);

let num = document.getElementById('orderId');
num.innerHTML = result;