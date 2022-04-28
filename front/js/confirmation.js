const str = window.location.href;
console.log(str,"location");

const url = new URL(str);
console.log(url,"URL");

const id = url.searchParams.get("id");
console.log(id,"ID");

let num = document.getElementById('orderId');
localStorage.removeItem("cart");
num.innerHTML = id;