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

  } else {
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

    panierQuantity[i].addEventListener("change", function() {
      console.log("panierQuantity");
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
      //suppr[i].closest('.cart__item').remove();
      console.log(suppr[i].closest('.cart__item').dataset.id,suppr[i].closest('.cart__item').dataset.color);
      //remove du localStorage
      
      localStorage.removeItem(storage[i]);
    });
  }
});

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