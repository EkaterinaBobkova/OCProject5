
    console.log(document.getElementById('product'));

    

 
    class DetailController {
        constructor() {
            
            const api = new Api();
            api.details (
                function(id) {
            const listView = new ListView(id);
            const listElement = listView.render();
            document.getElementById('product').appendChild(listElement);
                }
            )
            
        }
    }



    class View {
     render()    {
         
     }

    }



    class ListView extends View {
        constructor(list) {
            super();
            this.list = list;
        }
        render() {
            const listContainer = document.createElement('div');
            this.list.forEach(item => {
                const itemView = new ItemView(item);
               
                const childElement = itemView.render();
               
                console.log(childElement);
                listContainer.appendChild(childElement);
            })
            return listContainer;
        }
    }

    class ItemView extends View{
        constructor(item) {
            super();
            this.item = item;
        }
        render()    {
            console.info('section')
            const itemContainer = document.createElement('div');
            itemContainer.className = 'box';

            const titleView = new TitleView( this.item.name);
            itemContainer.appendChild(titleView.render());

            const imageView = new ImageView(this.item.imageUrl, this.item.description, 'classImg');
            itemContainer.appendChild(imageView.render());
            

            const descriptionView = new DescriptionView( this.item.description);
            itemContainer.appendChild(descriptionView.render());

            const priceView = new PriceView( this.item.price/100 + ' €');
            itemContainer.appendChild(priceView.render());

           


        

           
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


    
    

  

    new DetailController()
