let storage = JSON.parse(localStorage.getItem('cart'));
let carts = document.getElementById('cart__items');
let AllBasket = document.getElementById('cartAndFormContainer');

fetch("http://localhost:3000/api/products").then(async (res) => {
  const produits = await res.json();
  console.log(produits);

  // Si il y a des items dans le panier..Pour chaque item du storage on viens ajouter les infos correspondantes dans l'api en fonction de l'id
  if (storage != null) {
    storage.forEach((item) => {
      console.log(item);
      let produit = produits.find(element => element._id === item.id);
      item.altTxt = produit.altTxt;
      item.description = produit.description;
      item.imageUrl = produit.imageUrl;
      item.price = produit.price;
      item.name = produit.name;
    })
  // Calcul du prix total et du nombre d'item total
    let quantitytotal = 0;
    let pricetotal = 0;
    for (let i = 0; i < storage.length; i++) {
      pricetotal += storage[i].price * storage[i].quantity;
      quantitytotal += storage[i].quantity;


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

    document.getElementById('totalQuantity').innerHTML +=
      `${quantitytotal}`;
    document.getElementById('totalPrice').innerHTML +=
      `${pricetotal}`;

  // Sinon on affiche un message 
  } else {
    let cartprice = document.querySelector(".cart__price");
    let cartform = document.querySelector(".cart__order");
    cartprice.remove();
    cartform.remove()
    document.getElementById('cart__items').innerHTML +=
      `<h2 style="text-align:center;">Le panier est vide !<br> Ajoutez des articles à partir de <a href="index.html">l'écran d'accueil</a></h2>`;
  }
  // Modification du nombre dans la panier
  let panierQuantity = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < panierQuantity.length; i++) {

    panierQuantity[i].addEventListener("change", function (event) {
      let quantity = parseInt(event.target.value);
      if (quantity <= 0 || quantity > 100) {
        alert("Veuillez entrer un nombre entre 1 et 100")
        return;
      }
      let id_suppr = panierQuantity[i].closest('.cart__item').dataset.id;
      let color_suppr = panierQuantity[i].closest('.cart__item').dataset.color;
      storage = storage.map((item) => {
        if (item.id === id_suppr && item.color === color_suppr) {
          return {
            ...item,
            //spread operator
            quantity
          }
        } else {
          return item;
        }
      })
      localStorage.setItem("cart", JSON.stringify(storage));
      window.location.reload();
    });
  }

  //Suppresion d'une item dans le panier
  let suppr = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < suppr.length; i++) {
    suppr[i].addEventListener("click", function () {
      let id_suppr = suppr[i].closest('.cart__item').dataset.id;
      let color_suppr = suppr[i].closest('.cart__item').dataset.color;
        storage = storage.filter((item) => {
          if (item.id !== id_suppr || item.color !== color_suppr) {
            return item;
          }
        })
        if (storage.length < 1) {
          localStorage.removeItem("cart");
        } else {
          localStorage.setItem("cart", JSON.stringify(storage));
        }
        window.location.reload();
    });
  }
})
.catch((error) => { 
  AllBasket.innerHTML =
  `<h3 style="text-align:center"> Oups.. nous avons un problème sur le serveur </h3>`;
  console.log(error,"There is an error")
});


//Vérification du formulaire grâce au regex
function verifyInput(input, regex, errorTag, errorMessage){
  let result = input.value.match(regex);
  if (result) {
    input.style.cssText += 'border:0px red solid';
    errorTag.innerHTML = ''
    emptyform.innerHTML = ''
    return true;
  } else {
    input.style.cssText += 'border:1px red solid';
    errorTag.innerHTML = errorMessage
    return false;
  }
}



let prenom = document.getElementById('firstName');
let regexname = /^[A-Za-z - éèàùîûôê]+$/;
let regexmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
let regexadresse = /^[A-Za-z1-9 - éèàùîûôê]+$/;

//Prénom

let prenomerror = document.getElementById('firstNameErrorMsg')

function verifprenom() {
  return verifyInput(prenom, regexname, prenomerror, "Erreur ! Le prenom ne peux contenir que des lettres")
};
prenom.addEventListener("change", verifprenom);

//Nom

let nom = document.getElementById('lastName');
let nomerror = document.getElementById('lastNameErrorMsg')

function verifnom() {
  return verifyInput(nom, regexname, nomerror, "Erreur ! Le nom ne peux contenir que des lettres")

}
nom.addEventListener("change", verifnom);


//adresse

let adresse = document.getElementById('address');
let adresserror = document.getElementById('addressErrorMsg')

function verifadresse() {
  return verifyInput(adresse, regexadresse, adresserror,"Erreur ! Le champ adresse est vide")
  /*let result = adresse.value;

  if (result) {
    adresse.style.cssText += 'border:0px red solid';
    adresserror.innerHTML = ''
    emptyform.innerHTML = ''
    return true
  } else {
    adresse.style.cssText += 'border:1px red solid';
    adresserror.innerHTML = 'Erreur ! Le champ adresse est vide'
    return false
  }*/
}
adresse.addEventListener("change", verifadresse);

//ville

let ville = document.getElementById('city');
let villerror = document.getElementById('cityErrorMsg')

function verifville() {
  return verifyInput(ville, regexname, villerror, "Erreur ! La ville ne peux contenir que des lettres")
}
ville.addEventListener("change", verifville);

//email

let email = document.getElementById('email');
let emailerror = document.getElementById('emailErrorMsg')

function verifmail() {
  return verifyInput(email, regexmail, emailerror,"Erreur ! Le champ email est incorrecte")
  /*let result = email.value.match(regexmail);

  if (result) {
    email.style.cssText += 'border:0px red solid';
    emailerror.innerHTML = ''
    emptyform.innerHTML = ''
    return true
  } else {
    email.style.cssText += 'border:1px red solid';
    emailerror.innerHTML = 'Erreur ! Le champ email est incorrecte'
    return false
  }*/
}
email.addEventListener("change", verifmail);


let commande = document.getElementById('order');
let emptyform = document.getElementById('emptyForm');


// Fonction commander
function order(event) {
  event.preventDefault();
  // Si tous les champs sont bon..
  if (verifprenom() && verifnom() && verifadresse() && verifville() && verifmail()) {

    //Création de l'objet data avec le contact et le ou les produits
    const products = []
    storage.forEach((item) => {
      products.push(item.id)
    });

    const data = {
      contact: {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value
      },
      products
    }
    console.log(data, "data");

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(result => {
      console.log(result, "result");

      window.location.replace(`./confirmation.html?id=${result.orderId}`);
    }).catch((error) =>{
      console.log(error, "there is an error");
    });
    // Sinon message d'erreur
  } else {
    emptyform.style.cssText += 'text-align:center; margin:5px;color:#fbbcbc'
    emptyform.innerHTML = "Erreur ! <br>Veillez a bien compléter les informations afin de finaliser votre commande"
    console.log("form pas ok");
    return
  }

}
commande.addEventListener("click", order);
