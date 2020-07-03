// console.log(document.getElementById('validForm'));



document.forms['validForm'].addEventListener("submit", function (e) {
    api.save(
        (result) => {
            const response = JSON.parse(result); 
            localStorage.setItem("orderId", JSON.stringify(response.orderId)); 
            localStorage.setItem("firstName", JSON.stringify(response.contact.firstName)); 
            localStorage.setItem("lastName", JSON.stringify(response.contact.lastName)); 
            
       }
   )

    let erreur;


    let inputs = this;



    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            erreur = "Veuillez renseigner tous les champs";
        }
    }

    if (erreur) {
        e.preventDefault();

        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {

        let orderId = localStorage.getItem("orderId"); 
                let totalPrice = localStorage.getItem("totalPrice"); 
                document.getElementById("costOrder").textContent = totalPrice + "€"; 
                document.getElementById("idOrder").textContent = orderId;

                document.location.href="confirmation.html"; 
                localStorage.clear();
      
        
    }



});
















// class ConfirmController {
//     constructor() {

//         this.storage = new ListStorage();
//         const confirmView = new ConfirmView(this.storage, 'order');

//         const items = confirmView.render();

//         let tt = this;
//         items.addEventListener('click', function (e) {
//             var elem = e.target;
//             if (elem.tagName.toLowerCase() === 'button') {
//                 elem.textContent = 'Votre panier est vide';
//                 e.stopPropagation(); 

//                 tt.storage.delete(elem.value);
//                 document.location.href = 'confirmation.html';
//             }
//         })

//         document.getElementById('validForm').appendChild(items);
//     }
// }


// class View {
//     render() { }

// }








// class ConfirmView extends View {
//     constructor(storage, order) {
//         super();
//         this.list = storage.list;
//         this.order = order;

//     }
//     render() {

//         const itemContainer = document.createElement("table");
//         itemContainer.setAttribute('class', `${this.order}`);

//         for (let key in this.list) {
//             let item = this.list[key];

//             let itemNode = document.createElement('tr');




//         /*Total cart : */

//         const totalCartPrice = document.createElement("div");
//         const priceTotal = [];
//         for (let key in this.list) {
//             let item = this.list[key];
//             priceTotal.push(item.product.price)};

//             if (priceTotal.length >0){
//                 const reducer = (accumulator, currentValue)=> accumulator + currentValue; 
//                 const totalOrder = priceTotal.reduce(reducer); 
//                 totalCartPrice.innerHTML = `Total de votre commande = ${totalOrder / 100 } €`; 
//             itemContainer.appendChild(totalCartPrice);




//             itemContainer.appendChild(itemNode);
//         }
//     }
//         return itemContainer;
//     }
// }



// new ConfirmController()
