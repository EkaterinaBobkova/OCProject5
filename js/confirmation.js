class ConfirmController {
    constructor() {


        this.storage = new ListStorage();
        console.log(this.storage);
        const confirmView = new ConfirmView(this.storage, 'order');

        const items = confirmView.render();


        document.getElementById('confirm').appendChild(items);

        const orderConfirm = document.getElementById('thankYouNote')

        let firstName = JSON.parse(localStorage.getItem('firstName'));
        let lastName = JSON.parse(localStorage.getItem('lastName'));
        let orderId = JSON.parse(localStorage.getItem('orderId'));

        if (!firstName) {
            document.location.href = 'index.html';
        }

        orderConfirm.innerHTML += `<p>Merci ${firstName} ${lastName}  pour votre commande !</p><br><p> Le numéro de commande à conserver : ${orderId}</p> `



        const returnShop = document.getElementById('returnShop');
        returnShop.addEventListener('click', (event) => {

            localStorage.clear();
        });
    }

}



class ConfirmView extends View {
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


        /*Total cart : */

        const totalCartPrice = document.createElement("div");

        if (this.total) {

            totalCartPrice.innerHTML = `Total de vos achats = ${this.total / 100} €`;

            itemContainer.appendChild(totalCartPrice);
        }

        return itemContainer;
    }
}

new ConfirmController()