
//Récupération des données de l'API
fetch("http://localhost:3000/api/products").then(async (res) => {
    console.log(res);
    const produits = await res.json();
    console.log(produits);
    let lesitems = document.getElementById("items");

//Boucle sur les items et ajout en html avec les variables
    for (let i = 0; i < produits.length; i++) {
        const produit = produits[i];
        console.log(produit);
        lesitems.innerHTML +=
            `<a href="./product.html?id=${produit._id}">
                <article>
                    <img src="${produit.imageUrl}" alt=${produit.altTxt}>
                    <h3 class="productName">${produit.name}</h3>
                    <p class="productDescription">${produit.description}</p>
                </article>
            </a>`;
    }
});