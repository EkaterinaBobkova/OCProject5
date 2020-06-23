console.log(document.getElementById('productOrder'));



 
class PanierController {
    constructor() {
        
       this.storage = new ListStorage();
       console.log(this.storage.list);
        const api = new Api();
        api.details (
            (item) => {
    
        const panierView = new PanierView(item, this.storage.list);
        const itemElement = panierView.render();
        
        document.getElementById('productOrder').appendChild(itemElement);
            }
        )
        
    }
}


class View {
 render()    {
     
 }

}








class PanierView { 
    constructor(item) { 
        this.item = item; 
        
    }
    render() { 
        const price = new PriceView(this.item.price).render(); 
        const itemContainer = document.createElement("div"); 
       
        itemContainer.innerHTML = `<p>${this.item.name} (${price} €)</p>`;  

        itemContainer.setAttribute('class', `${this.order}`);
        // button to delete item
        const buttonPanier = document.createElement("button"); 
        buttonPanier.setAttribute("class", "btn w-25");
        buttonPanier.textContent = "Retirer cet article"; 
        itemContainer.appendChild(buttonPanier); 
        const productId = this.item._id; 
        buttonPanier.addEventListener("click", function(event){ 
            localStorage.removeItem(productId); 
            // window.history.go(); 
            itemContainer.textContent="Votre panier est vide"; 
            event.stopPropagation(); 
            });
           
            

        return itemContainer; 
    } 
}



class PriceView {
    constructor (prix) {
        this.prix = prix; 
    }
    render(){
        const number = this.prix;
        const numberToString = number.toString(); 
        const price = numberToString.replace("00", ",00"); 
        return price;
    }
}










new PanierController()
