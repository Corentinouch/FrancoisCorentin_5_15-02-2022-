const str = window.location.href;
console.log(str);
const url = new URL(str);
console.log(url);
const id = url.searchParams.get("id");
console.log(id);

let storage = JSON.parse(localStorage.getItem("panier"));
console.log(storage);
let objJson = storage !== null ? storage : {};


    fetch("http://localhost:3000/api/products/" + id).then(async (res) =>{
        const produit = await res.json();
        console.log(produit);

//Remplacement des valeurs dans le .html 

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
        const color = colors[i];
        console.log(color);
        item.querySelector("#colors").innerHTML +=
            `<option value="${produit.colors[i]}">${produit.colors[i]}</option>`;
    }
    
//Storage au moment du click sur ajout

function storageAll(){
    let nombre = document.querySelector("#quantity");
    let couleur = item.querySelector("#colors");
    if(objJson[produit._id] !== undefined){
        objJson[produit._id].color[couleur.value] === undefined ? objJson[produit._id].color[couleur.value] = nombre.value 
            : objJson[produit._id].color[couleur.value] = parseInt(nombre.value) + parseInt(objJson[produit._id].color[couleur.value]);
    }else{
        objJson[produit._id] = {}
        objJson[produit._id].color = {}
        objJson[produit._id].color[couleur.value] = nombre.value;
        objJson[produit._id].name = produit.name;
        objJson[produit._id].price = produit.price;
        objJson[produit._id].imageUrl = produit.imageUrl;
        objJson[produit._id].description = produit.description;
    }
        
        let objLinea = JSON.stringify(objJson);
        localStorage.setItem("panier",objLinea);

}
    
    let addItem = document.getElementById('addToCart');
    addItem.addEventListener('click', function(){
        storageAll();
    });

});