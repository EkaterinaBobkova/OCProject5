console.log(document.getElementById('productCommand'));

    

 
class PanierController {
    constructor() {
        
        const api = new Api();
        api.details (
            function(oneProduct) {
        const itemViewPanier = new ItemViewPanier(oneProduct, "command");
        const itemElement = itemViewPanier.render();
        document.getElementById('productCommand').appendChild(itemElement);
            }
        )
        
    }
}


class View {
 render()    {
     
 }

}


class ItemViewPanier { 
    constructor(item,command) { 
        this.item = item; 
        this.command = command;
    }
    render() { 
        const price = new PriceView(this.item.price).render(); 
        const itemContainer = document.createElement("div"); 
        itemContainer.innerHTML = `<p>${this.item.name} (${price} €)</p>`;  

        itemContainer.setAttribute('class', `${this.command}`);
        // button to delete item
        const buttonPanier = document.createElement("button"); 
        buttonPanier.setAttribute("class", "btn w-25");
        buttonPanier.textContent = "Retirer cet article"; 
        itemContainer.appendChild(buttonPanier); 
        const productId = this.item._id; 
        buttonPanier.addEventListener("click", function(event){ 
            localStorage.removeItem(productId); 
            window.history.go(); 
            event.stopPropagation(); 
            });
           

        return itemContainer; 
    } 
}



class ItemPanierView {
    constructor(listeCommande, onSubmit=()=>{}) { 
        this.listeCommande = listeCommande; 
        this.form = document.getElementById("form"); 
        this.form.addEventListener("submit" , function(event){ 
            const contact= {};
            contact.firstName = form.elements.firstName.value;
            contact.lastName = form.elements.lastName.value;
            contact.address = form.elements.address.value;
            contact.city = form.elements.city.value;
            contact.email = form.elements.email.value;
            event.preventDefault(); 
            event.stopPropagation();
            onSubmit(contact); 
            
        });
    }
    render() { 
        const itemPanierContainer = document.createElement("div"); 
                itemPanierContainer.setAttribute("class", "card mb-3 text-center panier"); 
        const prixTotalItemContainer = document.createElement("div"); 
        prixTotalItemContainer.setAttribute("class", "mb-3 text-center");
        const prixTotal = []; 
        for (let item of this.listeCommande){ 
            itemPanierContainer.appendChild(new ItemViewPanier(item).render()); 
                prixTotal.push(item.price);  
              
            };
        if (prixTotal.length >0){
            const reducer = (accumulator, currentValue)=> accumulator + currentValue; 
            const totalCommande = prixTotal.reduce(reducer); 
            
            const totalPrice = new PriceView(totalCommande).render();
            prixTotalItemContainer.innerHTML = `Total de la commande = ${totalPrice} €`; 
            itemPanierContainer.appendChild(prixTotalItemContainer); 
        } else {
            itemPanierContainer.textContent="Votre panier est vide"; 
            const form = document.getElementById("form");
            form.style.display="none";
        };

        return itemPanierContainer; 
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
