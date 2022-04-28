//Recuperation de l'id du produit sur lequel l'utilisateur a cliqué
const str = window.location.href;
console.log(str,"location");
const url = new URL(str);
console.log(url,"URL");
const id = url.searchParams.get("id");
console.log(id,"ID");

let item = document.querySelector(".item");
    fetch("http://localhost:3000/api/products/" + id).then(async (res) =>{
        const produit = await res.json();
        console.log(produit);

//Remplacement des valeurs dans le html 

    
    
        item.querySelector(".item__img").innerHTML +=
        `<img src="${produit.imageUrl}" alt=${produit.altTxt}>
        `;

        item.querySelector("#title").innerHTML +=
        `<h1 class="productName">${produit.name}</h1>
        `;

        item.querySelector("#price").innerHTML +=
        `<span id="price">${produit.price}</span>
        `;

        item.querySelector("#description").innerHTML +=
        `<p id="description">${produit.description}</p>
        `;

//Menu déroulent des couleurs de chaque produit

    let colors = produit.colors;

    for (let i = 0; i < colors.length; i++) {
        item.querySelector("#colors").innerHTML +=
            `<option value="${produit.colors[i]}">${produit.colors[i]}</option>`;
    }

//Fonction storage au moment du clique sur "ajout au panier"

function storageAll(){
    let quantity = document.querySelector("#quantity").value;
    let color = item.querySelector("#colors").value;
    let storage = localStorage;
    console.log(storage);

    //Vérification nombre et couleur
    if(quantity <= 0 || quantity > 100){
        alert("Veuillez entrer un nombre entre 1 et 100")
        return;
    }

    if(!color){
        alert("Veuillez selectionner une couleur")
        return;
    }

    //Vérification présence ou non d'une item identique
    item["quantity"] = quantity;
    item["color"] = color;
    console.log(quantity,color);
    let cart = [];

    const storageCart = JSON.parse(storage.getItem("cart"));

    //Si l'id de l'item existe on regarde si sa couleur existe
    if (storageCart && storageCart.length ) {
        cart = JSON.parse(storage.getItem("cart"));

        const hasColor = cart.filter(
            (x) => x.color === color && x.id === id
        );

                // Si la couleur existe déjà on ajoute la quantité ajoutée à celle dejà présente
                if (hasColor && hasColor.length){
                    hasColor[0].quantity = parseInt(quantity) + parseInt(hasColor[0].quantity);
                    console.log(hasColor[0].quantity);
                // Sinon on ajoute un nouveau produit
                }else {
                    cart.push({id: produit._id, quantity: parseInt(item.quantity), color: item.color});
                }

        storage.setItem("cart",JSON.stringify(cart));

    //Si l'item n'existe pas on la créer 
    } else {
        cart.push({id: produit._id, quantity: parseInt(item.quantity), color: item.color});
        storage.setItem("cart", JSON.stringify(cart));
    }
    alert("Votre article a été ajouté au panier");

}
    
    let addItem = document.getElementById('addToCart');
    addItem.addEventListener('click', function(){
        storageAll();
    });

}).catch((error) => { 
    item.innerHTML =
    `<h3> Oups.. nous avons un problème sur le serveur </h3>`;
    console.log(error,"There is an error")
  });

