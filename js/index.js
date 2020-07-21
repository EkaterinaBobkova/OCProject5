console.log(document.getElementById('app'));

/*  Logique métier, communication avec API  */

class ListController {
    constructor() {

        const api = new Api();
        api.list(
            function (listProducts) {
                const listView = new ListView(listProducts, 'listPhotos');
                const listElement = listView.render();
                document.getElementById('app').appendChild(listElement);
            })
    }
}

/*  Classe qui sert à la récupération et affichage des éléments  */

class ListView extends View {
    constructor(list, listPhotos) {
        super();
        this.list = list;
        this.listPhotos = listPhotos;
    }
    render() {
        const listContainer = document.createElement('div');
        this.list.forEach(item => {
            const itemView = new ItemView(item, "card");

            const childElement = itemView.render();

            console.log(childElement);
            listContainer.appendChild(childElement);
            listContainer.setAttribute('class', `${this.listPhotos}`)
        })
        return listContainer;
    }
}

/*  Récupération des éléments titre, image, description, prix, bouton  */

class ItemView extends View {
    constructor(item, card) {
        super();
        this.item = item;
        this.card = card;
    }
    render() {
        console.info('section')
        const itemContainer = document.createElement('div');


        const titleView = new TitleView(this.item.name);
        itemContainer.appendChild(titleView.render());

        const imageView = new ImageView(this.item.imageUrl, this.item.description, 'classImg');
        itemContainer.appendChild(imageView.render());


        const descriptionView = new DescriptionView(this.item.description);
        itemContainer.appendChild(descriptionView.render());

        const priceView = new PriceView(this.item.price / 100 + ' €');
        itemContainer.appendChild(priceView.render());

        const buttonView = new ButtonView(this.item._id);
        itemContainer.appendChild(buttonView.render());

        itemContainer.setAttribute('class', `${this.card}`)
        return itemContainer;
    }
}

class ButtonView extends View {
    constructor(_id) {
        super();
        this._id = _id;
    }
    /*  récupération de l'id du produit séléctionné  */
    render() {
        const buttonContainer = document.createElement('a');
        buttonContainer.id = "link";
        buttonContainer.href = 'produit.html?&id=' + this._id;
        buttonContainer.textContent = "Acheter";
        return buttonContainer;
    }
}

class TitleView extends View {
    constructor(name) {
        super();
        this.name = name;
    }

    render() {
        const titleContainer = document.createElement('h1');
        titleContainer.innerHTML = `<span>${this.name}</span>`;
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
    constructor(contenu) {
        super();
        this.contenu = contenu;
    }

    render() {
        const descriptionContainer = document.createElement('p');
        descriptionContainer.innerHTML = `<span>${this.contenu}</span>`;
        return descriptionContainer;
    }
}

class PriceView extends View {
    constructor(prix) {
        super();
        this.prix = prix;
    }

    render() {
        const priceContainer = document.createElement('p');
        priceContainer.innerHTML = `<span>${this.prix}</span>`;
        return priceContainer;
    }
}


new ListController()