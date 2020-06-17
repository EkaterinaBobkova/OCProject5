
    console.log(document.getElementById('product'));

    

 
    class DetailController {
        constructor() {
            
            const api = new Api();
            api.details (
                function(oneProduct) {
            const itemView = new ItemView(oneProduct, "card");
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
        constructor(item,card) {
            super();
            this.item = item;
            this.card = card;
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
            itemContainer.setAttribute('class', `${this.card}`)
            const buttonView = new ButtonView( this.item._id);
            itemContainer.appendChild(buttonView.render());

           


        

           
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
