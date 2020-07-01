console.log(document.getElementById('productOrder'));




class CartController {
    constructor() {

        this.storage = new ListStorage();
        const cartView = new CartView(this.storage, 'order');

        const items = cartView.render();

        let tt = this;
        items.addEventListener('click', function (e) {
            var elem = e.target;
            if (elem.tagName.toLowerCase() === 'button') {
                elem.textContent = 'Votre panier est vide';
                e.stopPropagation(); 

                tt.storage.delete(elem.value);
                document.location.href = 'cart.html';
            }
        })

        document.getElementById('productOrder').appendChild(items);
    }
}


class View {
    render() { }

}








class CartView extends View {
    constructor(storage, order) {
        super();
        this.list = storage.list;
        this.order = order;

    }
    render() {

        const itemContainer = document.createElement("table");
        itemContainer.setAttribute('class', `${this.order}`);

        for (let key in this.list) {
            let item = this.list[key];

            let itemNode = document.createElement('tr');
            itemNode.innerHTML =
                `<th>Produit :</th>
               
                <td>${item.product.name}</td>
                <th>Prix :</th>
 
        <td>${item.product.price / 100 + ' €'}</td>`;


        /*Total cart : */

        const totalCartPrice = document.createElement("div");
        const priceTotal = [];
        for (let key in this.list) {
            let item = this.list[key];
            priceTotal.push(item.product.price)};

            if (priceTotal.length >0){
                const reducer = (accumulator, currentValue)=> accumulator + currentValue; 
                const totalOrder = priceTotal.reduce(reducer); 
                totalCartPrice.innerHTML = `Total de votre commande = ${totalOrder / 100 } €`; 
            itemContainer.appendChild(totalCartPrice);


               /*Delete product button : */

            let button = document.createElement('button');
            button.setAttribute('class', 'btn');
            button.textContent = 'Retirer cet article';
            button.value = item.product._id;
            itemNode.appendChild(button);

            itemContainer.appendChild(itemNode);
        }
    }
        return itemContainer;
    }
}



new CartController()
