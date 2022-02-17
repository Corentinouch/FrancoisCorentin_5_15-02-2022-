async function showarticles(){
    let data = await fetch("http://localhost:3000/api/products");
    return await data.json();
}

showarticles().then((produits) => {
    console.log(produits);
    let lesitems = document.getElementById("items");
    console.log(lesitems);
});


fetch("http://localhost:3000/api/products").then((res) => {
    console.log(res);
    return res.json().then((produits) => {
        console.log(produits);
        let lesitems = document.getElementById("items");
        console.log(lesitems);
    });
});


fetch("http://localhost:3000/api/products").then(async (res) => {
    console.log(res);
    const produits = await res.json();
    console.log(produits);
    let lesitems = document.getElementById("items");
    console.log(lesitems);
});



/*async function getarticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products");
    return await articlesCatch.json();
}
getarticles().then((produits) => {
    console.log(produits);
    let lesitems = document.getElementById("items");
    console.log(lesitems);

    // Faire une boucle sur les produits, utilisé for //

    for (let article of produits) {
        console.log(article);

        lesitems.innerHTML += `
          
          <a href="./product.html?id=${article._id}">
                  <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                  </article>
                </a>
                
          `;
    }
});*/