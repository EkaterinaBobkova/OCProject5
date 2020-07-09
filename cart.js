console.log(document.getElementById('productOrder'));




class CartController {
    constructor() {


        this.storage = new ListStorage();
        console.log(this.storage);
        const cartView = new CartView(this.storage, 'order');

        const items = cartView.render();

        let tt = this;
        items.addEventListener('click', function (e) {
            var elem = e.target;
            if (elem.tagName.toLowerCase() === 'button') {
                elem.textContent = 'Article supprimé';
                e.stopPropagation();

                tt.storage.delete(elem.value);
                document.location.href = 'cart.html';
            }
        })
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const validForm = document.getElementById('validForm');
            const contact = { lastName: validForm['lastName'].value, firstName: validForm['firstName'].value, address: validForm['address'].value, city: validForm['city'].value, email: validForm['email'].value }
            console.log(contact);
            const products = Object.keys(this.storage.list);
            console.log(products);
            
            const api = new Api();
            api.save((result) => {
                console.log(result);
            }, {
                contact,
                products
            }
            );

            // form verification
            let erreur;
            let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (this.list === '' || validForm['lastName'].value === '' || validForm['firstName'].value === '' || validForm['address'].value === '' || validForm['city'].value === '' || validForm['email'].value === '') {
                erreur = "Veuillez renseigner tous les champs";
            } else if (!regex.test(validForm['email'].value)) { erreur = "Format de l'email n'est pas valide" }
            else if (this.storage === null) {
                erreur = 'Veuillez faire vos achats';
            }

            if (erreur) {


                document.getElementById("erreur").innerHTML = erreur;
                return false;
            } else {

                document.location.href = 'confirmation.html'
                
            }
        });

        document.getElementById('productOrder').appendChild(items);
    }

}


class View {
    render() { }

}



class CartView extends View {
    constructor(storage, order) {
        super();
        this.list = storage.list || [];
        this.order = order;

        this.total = Object.values(this.list).map(item => item.product.price).reduce((acc, cur) => acc + cur, 0);
        console.log(Object.values(this.list));
        console.log(this.total);



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






            /*Delete product button : */

            let button = document.createElement('button');
            button.setAttribute('class', 'btn');
            button.textContent = 'Retirer cet article';
            button.value = item.product._id;
            itemNode.appendChild(button);

            itemContainer.appendChild(itemNode);

        }
        /*Total cart : */

        const totalCartPrice = document.createElement("div");

        if (this.total) {

            totalCartPrice.innerHTML = `Total de votre commande = ${this.total / 100} €`;

            itemContainer.appendChild(totalCartPrice);
        }


        if (this.total == 0) {
            itemContainer.textContent = "Votre panier est vide";
        }
        return itemContainer;
    }



}



new CartController()
