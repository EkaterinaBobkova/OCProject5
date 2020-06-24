console.log(document.getElementById('productOrder'));



 
class CartController {
    constructor() {
        
       this.storage = new ListStorage();
       console.log(this.storage.list);
       
    
        const cartView = new CartView(this.storage.list, 'order');
        
        const itemElement = cartView.render();
        
        document.getElementById('productOrder').appendChild(itemElement);
            
        
        
    }
}


class View {
 render()    {
     
 }

}








class CartView extends View{ 
    constructor(item, order) { 
        super();
        this.item = item; 
        this.order = order; 
        
    }
    render() { 
       
        const itemContainer = document.createElement("div"); 

        itemContainer.innerHTML= '';
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            
        const name = this.list[i].name;
		const lenses = this.list[i].lenses;
		const price = this.list[i].price;
		const _id = this.list[i]._id;
          }
       
        itemContainer.innerHTML = 
        `<tr>
        <td>${name}</td>
        <td>${lenses}</td>
        <td>${price}€</td>`
        

        itemContainer.setAttribute('class', `${this.order}`);
        // button to delete item
        const buttoncart = document.createElement("button"); 
        buttoncart.setAttribute("class", "btn w-25");
        buttoncart.textContent = "Retirer cet article"; 
        itemContainer.appendChild(buttoncart); 
        const productId = this.item._id; 
        buttoncart.addEventListener("click", function(event){ 
            localStorage.removeItem(productId); 
            // window.history.go(); 
            itemContainer.textContent="Votre panier est vide"; 
            event.stopPropagation(); 
            });
           
            

        return itemContainer; 
    } 
}



// class PriceView {
//     constructor (prix) {
//         this.prix = prix; 
//     }
//     render(){
//         const number = this.prix;
//         const numberToString = number.toString(); 
//         const price = numberToString.replace("00", ",00"); 
//         return price;
//     }
// }










new CartController()
