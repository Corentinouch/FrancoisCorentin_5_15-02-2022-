let storage = JSON.parse(localStorage.getItem('panier'));
let objJson = storage !== null ? storage : {};
console.log(storage);

/*Object.keys(storage).map((key) => {
    console.log(storage[key])
    Object.keys(storage[key].color).map((k) => {
        console.log(k,storage[key].color[k]);
    })
})*/


let cards = document.getElementById('cart__items');
console.log(cards);

cards.innerHTML += Object.keys(storage).map((key) => {

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
                                <input type="number" id="test" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storage[key].color[k]}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;

            }).join('');

        }).join('');
        let test = document.getElementById("test");
        test.addEventListener('change',(e) =>{
            console.log("changement");
        });