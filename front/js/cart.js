let storage = JSON.parse(localStorage.getItem('cart'));
console.log(storage);
let carts = document.getElementById('cart__items');
//console.log(carts);

fetch("http://localhost:3000/api/products").then(async (res) => {
  //console.log(res);
  const produits = await res.json();
  console.log(produits);

  if (storage != null) {
    storage.forEach((item) => {
      console.log(item);
      let produit = produits.find(element => element._id === item.id);
      item.altTxt = produit.altTxt;
      item.description = produit.description;
      item.imageUrl = produit.imageUrl;
      item.price = produit.price;
      item.name = produit.name;

      /*console.log(item.price);
      console.log(item.quantity);
      let totalitem = item.price * item.quantity;
      console.log(totalitem);*/

      console.log(produit);
    })

    console.log(storage);
    let quantitytotal = 0;
    let pricetotal = 0;
    for (let i = 0; i < storage.length; i++) {
      pricetotal += storage[i].price * storage[i].quantity;
      quantitytotal += storage[i].quantity;
      /*console.log(storage[i].price, storage[i].quantity,"start");
      
      let totalprice = storage[i].price * storage[i].quantity;
      console.log(totalprice,"multiplication");*/


      carts.innerHTML +=
        `<article class="cart__item" data-id="${storage[i].id}" data-color="${storage[i].color}">
  <div class="cart__item__img">
    <img src="${storage[i].imageUrl}" alt="${storage[i].description}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${storage[i].name}</h2>
      <p>${storage[i].color}</p>
      <p>${storage[i].price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storage[i].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
    }
    console.log(pricetotal);
    console.log(quantitytotal);

    document.getElementById('totalQuantity').innerHTML +=
      `${quantitytotal}`;
    document.getElementById('totalPrice').innerHTML +=
      `${pricetotal}`;
  }else{
    let cartprice = document.querySelector(".cart__price");
    let cartform = document.querySelector(".cart__order");
    cartprice.remove();
    cartform.remove()
    document.getElementById('cart__items').innerHTML +=
      `<h2 style="text-align:center;">Le panier est vide !<br> Ajoutez des articles à partir de <a href="index.html">l'écran d'accueil</a></h2>`;
  }

  let panierQuantity = document.querySelectorAll('.itemQuantity');
  console.log(panierQuantity);

  for (let i = 0; i < panierQuantity.length; i++) {

    panierQuantity[i].addEventListener("change", function(event) {
      let quantity = parseInt(event.target.value);
      if(quantity <= 0 || quantity > 100){
        alert("Veuillez entrer un nombre entre 1 et 100")
        return;
    }
      console.log("panierQuantity");
      let id_suppr = panierQuantity[i].closest('.cart__item').dataset.id;
      let color_suppr = panierQuantity[i].closest('.cart__item').dataset.color;
      storage= storage.map((item)=>{
        if(item.id === id_suppr && item.color === color_suppr){
          return {
            ...item,
          //spread operator
            quantity
          }
        }else{
          return item;
        }
      })
      localStorage.setItem("cart", JSON.stringify(storage));
      window.location.reload();
      //let cart = [];
      //localStorage.setItem("cart",JSON.stringify(cart));
      //changement sur le local storage
    });
  }
  
  let suppr = document.querySelectorAll('.deleteItem');
  console.log(suppr);

  
  for (let i = 0; i < suppr.length; i++) {
    console.log(storage[i],"test")
    suppr[i].addEventListener("click", function() {
      let id_suppr = suppr[i].closest('.cart__item').dataset.id;
      let color_suppr = suppr[i].closest('.cart__item').dataset.color;
      storage = storage.filter((item) =>{
        if(item.id !== id_suppr || item.color !== color_suppr){
          return item;
        }
      })
      //suppr[i].closest('.cart__item').remove();
      //remove du localStorage
      console.log(storage);
     if (storage.length < 1){
       localStorage.removeItem("cart");
     }else{
        localStorage.setItem("cart", JSON.stringify(storage)); 
     }
     window.location.reload();
     
     
    });
  }
});

//Prénom
let prenom = document.getElementById('firstName');
let regexname = /^[A-Za-z -]+$/;
let regexmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;

let prenomerror = document.getElementById('firstNameErrorMsg')
console.log(prenom);


function verifprenom(){
  console.log(prenom.value,"valeur apres changemenent");
  let result = prenom.value.match(regexname);
  console.log(result, "resultat");

  if (result){
    prenom.style.cssText += 'border:2px green solid';
    prenomerror.innerHTML = 'ok'
    return true;
  }else{
    prenom.style.cssText += 'border:2px red solid';
    prenomerror.innerHTML = 'pas ok'
    return false;
  }
};
prenom.addEventListener("change", verifprenom);

//Nom
let nom = document.getElementById('lastName');
let nomerror = document.getElementById('lastNameErrorMsg')

function verifnom(){
  console.log(nom.value,"valeur apres changemenent");
  let result = nom.value.match(regexname);
  console.log(result, "resultat");

if (result){
  nom.style.cssText += 'border:2px green solid';
  nomerror.innerHTML = 'ok'
  return true
}else{
  nom.style.cssText += 'border:2px red solid';
  nomerror.innerHTML = 'pas ok'
  return false
}
}
nom.addEventListener("change", verifnom);
  

//adresse
let adresse = document.getElementById('address');
let adresserror = document.getElementById('addressErrorMsg')
console.log(adresse);

function verifadresse(){
  console.log(adresse.value,"valeur apres changemenent");
  let result = adresse.value;
  console.log(result, "resultat");

if (result){
  adresse.style.cssText += 'border:2px green solid';
  adresserror.innerHTML = 'ok'
  return true
}else{
  adresse.style.cssText += 'border:2px red solid';
  adresserror.innerHTML = 'pas ok'
  return false
}
}
adresse.addEventListener("change", verifadresse);

//ville
let ville = document.getElementById('city');
let villerror = document.getElementById('cityErrorMsg')

function verifville(){
  console.log(ville.value,"valeur apres changemenent");
  let result = ville.value.match(regexname);
  console.log(result, "resultat");

if (result){
  ville.style.cssText += 'border:2px green solid';
  villerror.innerHTML = 'ok'
  return true
}else{
  ville.style.cssText += 'border:2px red solid';
  villerror.innerHTML = 'pas ok'
  return false
}
}
ville.addEventListener("change", verifville);

//ville
let email = document.getElementById('email');
let emailerror = document.getElementById('emailErrorMsg')

function verifmail(){
  console.log(email.value,"valeur apres changemenent");
  let result = email.value.match(regexmail);
  console.log(result, "resultat");

if (result){
  email.style.cssText += 'border:2px green solid';
  emailerror.innerHTML = 'ok'
  return true
}else{
  email.style.cssText += 'border:2px red solid';
  emailerror.innerHTML = 'pas ok'
  return false
}
}
email.addEventListener("change", verifmail);


let commande = document.getElementById('order');
function order(event){
  event.preventDefault();
  if(verifprenom() && verifnom() && verifadresse() && verifville() && verifmail()){
    console.log("form ok");

    const products = []
    storage.forEach((item) =>{
      products.push(item.id)
    });

    const data = {
      contact:{
        firstName:prenom.value,
        lastName:nom.value,
        address:adresse.value,
        city:ville.value,
        email:email.value
      },
      products
    }
    console.log(data);

    fetch("http://localhost:3000/api/products/order",{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(result => {
      console.log(result);
    })

  } else {
    console.log("form pas ok");
    return
  }
  
}
commande.addEventListener("click", order);


/*Object.keys(storage).map((key) => {
    console.log(storage[key])
    Object.keys(storage[key].color).map((k) => {
        console.log(k,storage[key].color[k]);
    })
})*/



/*cards.innerHTML += Object.keys(storage).map((key) => {
fetch("http://localhost:3000/api/products/").then(async (res) =>{
        const produit = await res.json();
});
    return Object.keys(storage[key].color).map((k) => {
        return `<article class="cart__item" data-id="${key}" data-color="${k}">
                    <div class="cart__item__img">
                        <img src="${storage[key].imageUrl}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${storage[key].name}</h2>
                            <p>${k}</p>
                            <p>${storage[key].price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            <!--<div>${k} : ${storage[key].color[k]}</div>-->
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;
            }).join('');
        }).join('');*/