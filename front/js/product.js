const str = window.location.href;
console.log(str);
const url = new URL(str);
console.log(url);
const id = url.searchParams.get("id");
console.log(id);


fetch("http://localhost:3000/api/products/" + id).then(async (res) =>{
    const produit = await res.json();
    console.log(produit);

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

let colors = produit.colors;
console.log(colors);

for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    console.log(color);
    item.querySelector("#colors").innerHTML +=
        `<option value="${produit.colors[i]}">${produit.colors[i]}</option>`;
}

let objJson = {
    id : produit._id,
    color : produit.colors,
    nombre : 170
}
let objLinea = JSON.stringify(objJson);
localStorage.setItem("obj",objLinea);

});

