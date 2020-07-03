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
       
        this.total = Object.values(this.list).map(item=> item.product.price).reduce((acc,cur)=> acc+cur,0);
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

         if (this.total){
             
             totalCartPrice.innerHTML = `Total de votre commande = ${this.total / 100 } €`; 
             
         itemContainer.appendChild(totalCartPrice);
         }
        return itemContainer;
    }


    
}



new CartController()
