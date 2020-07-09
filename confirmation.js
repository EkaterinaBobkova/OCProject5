

class ConfirmController {
        constructor() {
            
            
            this.storage = new ListStorage();
            console.log(this.storage);
            const confirmView = new ConfirmView(this.storage, 'order');
    
            const items = confirmView.render();
            
    
            
    
            document.getElementById('confirm').appendChild(items);
            const returnShop = document.getElementById('returnShop');
            returnShop.addEventListener('click', (event) => {
            
            localStorage.clear();
        } );
        }
        
    }
    
    
    class View {
        render() { }
    
    }
    
    
    
    
    
    
    
    
    class ConfirmView extends View {
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
    
           
         /*Total cart : */
    
         const totalCartPrice = document.createElement("div");
    
             if (this.total){
                 
                 totalCartPrice.innerHTML = `Total de votre commande = ${this.total / 100 } €`; 
                 
             itemContainer.appendChild(totalCartPrice);
             }
    
    
             
            return itemContainer;
        }
    
    
        
    }
    
    
    
    new ConfirmController()