console.log(document.getElementById('productOrder'));



 
class cartController {
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
        // const price = new PriceView(this.item.price).render(); 
        const itemContainer = document.createElement("div"); 
       
        itemContainer.innerHTML = `<p>${this.item.name} (${this.item.price} €)</p>`;  

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










new cartController()
