
const str = window.location.href;
console.log(str,"location");
const url = new URL(str);
console.log(url,"URL");
const id = url.searchParams.get("id");
console.log(id,"ID");


    fetch("http://localhost:3000/api/products/" + id).then(async (res) =>{
        const produit = await res.json();
        console.log(produit);

//Remplacement des valeurs dans le html 

    let item = document.querySelector(".item");
    
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
    console.log(colors);

    for (let i = 0; i < colors.length; i++) {
        //const color = colors[i];
        //console.log(color);
        item.querySelector("#colors").innerHTML +=
            `<option value="${produit.colors[i]}">${produit.colors[i]}</option>`;
    }
    console.log(produit._id);

//Fontion storage au moment du click sur ajout

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

    item["quantity"] = quantity;
    item["color"] = color;
    console.log(quantity);
    let cart = [];

    const storageCart = JSON.parse(storage.getItem("cart"));

    if (storageCart && storageCart.length ) {
        cart = JSON.parse(storage.getItem("cart"));

        const hasColor = cart.filter(
            (x) => x.color === color && x.id === id
        );
        console.log(cart,"CARTE");
            
            console.log(quantity);

                if (hasColor && hasColor.length){
                    hasColor[0].quantity = parseInt(quantity) + parseInt(hasColor[0].quantity);
                    console.log(hasColor[0].quantity);

                }else {
                    cart.push({id: produit._id, quantity: parseInt(item.quantity), color: item.color});
                }

        storage.setItem("cart",JSON.stringify(cart));

    } else {
        cart.push({id: produit._id, quantity: parseInt(item.quantity), color: item.color});
        storage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    }
    alert("Ajouté au panier");

}
    
    let addItem = document.getElementById('addToCart');
    addItem.addEventListener('click', function(){
        storageAll();
    });

});

