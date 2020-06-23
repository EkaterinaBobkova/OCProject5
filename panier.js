console.log(document.getElementById('productOrder'));

class ListStorage {
    constructor(listName = "list") {
        this.listName = listName;
        this.list = {}
        this.load();
    }
    add(key, value) {
        this.list[key] = value;
        this.save();
    }
    delete(key) {
        delete this.list[key]
        this.save();
    }
    save() {
        localStorage.setItem(this.listName, JSON.stringify(this.list));
    }
    load() {
        this.list = JSON.parse(localStorage.getItem(this.listName)) || {};
    }
}



 
class PanierController {
    constructor() {
        
        const api = new Api();
        api.details (
            function(oneProduct) {
        const itemViewPanier = new ItemViewPanier(oneProduct, "order");
        const itemElement = itemViewPanier.render();
        
        document.getElementById('productOrder').appendChild(itemElement);
            }
        )
        
    }
}


class View {
 render()    {
     
 }

}


class ItemViewPanier { 
    constructor(item,order) { 
        this.item = item; 
        this.order = order;
    }
    render() { 
        const price = new PriceView(this.item.price).render(); 
        const itemContainer = document.createElement("div"); 
       
        

        const listStorage = new ListStorage();
       

        // //USAGE
        // cart.add('item_id', item);
        // cart.delete('item_id');


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
        const num = this.prix;
        const numberToString = num.toString(); 
        const price = numberToString.replace("00", ",00"); 
        return price;
    }
}










new PanierController()
