const str = window.location.href;
console.log(str);
const url = new URL(str);
console.log(url);
const id = url.searchParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/" + id).then(async (res) =>{
    const produit = await res.json();
    console.log(produit);
});