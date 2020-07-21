console.log(document.getElementById('productOrder'));

/*  Logique métier, communication avec API */

class CartController {
    constructor() {


        this.storage = new ListStorage();
        console.log(this.storage);
        const cartView = new CartView(this.storage, 'order');

        const items = cartView.render();

        let tt = this;

        /*  Suppression de l'article du panier */
        items.addEventListener('click', function (e) {
            var elem = e.target;
            if (elem.tagName.toLowerCase() === 'button') {
                elem.textContent = 'Article supprimé';
                e.stopPropagation();

                tt.storage.delete(elem.value);
                document.location.href = 'cart.html';
            }
        })
        /*  A la soumission du formulaire on crée l'objet contact avec les données saisies et on récupère le tableau de produits appelé products*/
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const validForm = document.getElementById('validForm');
            const contact = {
                lastName: validForm['lastName'].value,
                firstName: validForm['firstName'].value,
                address: validForm['address'].value,
                city: validForm['city'].value,
                email: validForm['email'].value
            }
            console.log(contact);
            const products = Object.keys(this.storage.list);
            console.log(products);



            // form validation
            let erreur;
            let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (this.list === '' || validForm['lastName'].value === '' || validForm['firstName'].value === '' || validForm['address'].value === '' || validForm['city'].value === '' || validForm['email'].value === '') {
                erreur = "Veuillez renseigner tous les champs";
            } else if (!regex.test(validForm['email'].value)) {
                erreur = "Format de l'email n'est pas valide"
            } else if (this.storage === null) {
                erreur = 'Veuillez faire vos achats';
            }

            if (erreur) {

                document.getElementById("erreur").innerHTML = erreur;
                return false;
                // si le formulaire est bien rempli on envoie la requete post, on souvegarde les données dans localStorage et on est redirigé vers la page confirmation
            } else {
                const api = new Api();
                api.save((result) => {
                    console.log(result);

                    localStorage.setItem("orderId", JSON.stringify(result.orderId));
                    localStorage.setItem("firstName", JSON.stringify(result.contact.firstName));
                    localStorage.setItem("lastName", JSON.stringify(result.contact.lastName));
                    document.location.href = "confirmation.html";
                }, {
                    contact,
                    products
                });
            }
        });

        document.getElementById('productOrder').appendChild(items);
    }
}

class CartView extends View {
    constructor(storage, order) {
        super();
        this.list = storage.list || [];
        this.order = order;

        // calcul du prix total
        this.total = Object.values(this.list).map(item => item.product.price).reduce((acc, cur) => acc + cur, 0);
        console.log(Object.values(this.list));
        console.log(this.total);
    }
    render() {

        const itemContainer = document.createElement("table");
        itemContainer.setAttribute('class', `${this.order}`);

        // partie dynamique pour afficher le TB avec les infos produit depuis local Storage

        for (let key in this.list) {
            let item = this.list[key];

            let itemNode = document.createElement('tr');
            itemNode.innerHTML =
                `<th>Produit :</th>
               
                <td>${item.product.name}</td>

                <th>Objectif :</th>
               
                <td>${item.option}</td>
             
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