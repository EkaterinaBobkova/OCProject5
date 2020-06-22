
    console.log(document.getElementById('product'));

        
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

TEST = new ListStorage();

//USAGE
// TEST.add('item_id', item)
// TEST.delete('item_id')

 
    class DetailController {
        constructor() {
            
            const api = new Api();
            api.details (
                function(oneProduct) {
            const itemView = new ItemView(oneProduct, "card", (forms) => {
                const optionValue = forms.selectOption.value;
                console.log(optionValue)
            });
            const itemElement = itemView.render();
            document.getElementById('product').appendChild(itemElement);
                }
            )
            
        }
    }


    class View {
     render()    {
         
     }

    }

    class ItemView extends View{
        constructor(item,card,onSubmit) {
            super();
            this.item = item;
            this.card = card;
            this.onSubmit = onSubmit;
        }
        render()    {
            console.info('section')
            const itemContainer = document.createElement('div');
        

            const titleView = new TitleView( this.item.name);
            itemContainer.appendChild(titleView.render());

            const imageView = new ImageView(this.item.imageUrl, this.item.description, 'classImg');
            itemContainer.appendChild(imageView.render());
            

            const descriptionView = new DescriptionView( this.item.description);
            itemContainer.appendChild(descriptionView.render());

            const priceView = new PriceView( this.item.price/100 + ' €');
            itemContainer.appendChild(priceView.render());
            itemContainer.setAttribute('class', `${this.card}`);
            



            // lenses choise
        const labelOption = document.createElement("label"); 
        labelOption.setAttribute("for","option_select"); 
        labelOption.textContent = "Choisissez l'objectif :"; 
        const selectOption = document.createElement("select"); 
        selectOption.setAttribute("name","option_select"); 
        selectOption.setAttribute("class","form-control mb-3 w-25");
        for (let lense of this.item.lenses){ 
            var newOption = document.createElement("option"); 
            var newContent = document.createTextNode(lense); 
            newOption.appendChild(newContent);
            selectOption.appendChild(newOption); 
        };



        const formContainer = document.createElement('form')


      

          
            const buttonContainer = document.createElement('button')
            buttonContainer.addEventListener('click', () => {
                this.onSubmit({
                    form:formContainer,
                    selectOption: selectOption,
                })
            })







            

            itemContainer.appendChild(labelOption); 
            itemContainer.appendChild(selectOption); 


        

            const buttonView = new ButtonView( this.item._id);
            itemContainer.appendChild(buttonView.render());

            const idLS = this.item._id; 
        const priceLS = this.item.price; 
        itemContainer.addEventListener("click", function(event){ 
            localStorage.setItem(idLS,priceLS);
         
        });
           
            return itemContainer;
        }
    }











    class TitleView extends View {
        constructor( name) {
            super();
            this.name = name;
            
        }

        render() {
            const titleContainer = document.createElement('h1');
            titleContainer.innerHTML =  `<span>${this.name}</span>`;
           
        return titleContainer;
    
    }
    }


    
    class ImageView extends View {
        constructor(url, description, classImg) {
            super();
            this.url = url;
            this.description = description;
            this.classImg = classImg;
        }

        render() {
            const imageContainer = document.createElement('img');

            
         
        imageContainer.setAttribute('src', this.url)   
        imageContainer.setAttribute('alt', this.description);
        imageContainer.setAttribute('class', `${this.classImg}`)
        return imageContainer;
    
    }
    }


    class DescriptionView extends View {
        constructor( contenu) {
            super();
            this.contenu = contenu;
            
        }

        render() {
            const descriptionContainer = document.createElement('p');
            descriptionContainer.innerHTML =  `<span>${this.contenu}</span>`;
           
        return descriptionContainer;
    
    }
    }


    class PriceView extends View {
        constructor( prix) {
            super();
            this.prix = prix;
            
        }

        render() {
            const priceContainer = document.createElement('p');
            priceContainer.innerHTML =  `<span>${this.prix}</span>`;
           
        return priceContainer;
    
    }
    }

    class ButtonView extends View {
        constructor(_id) {
            super();
            this._id = _id;
            
        }

        render() {
            const buttonContainer = document.createElement('a');
            
            buttonContainer.id = "linkProduct";
            buttonContainer.href = 'panier.html?&id=' + this._id;
         
            buttonContainer.textContent = "Ajouter au panier";

            


            
          
           
        return buttonContainer;
    
    }
    }




    
    

  

    new DetailController()
