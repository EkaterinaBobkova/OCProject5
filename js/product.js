console.log(document.getElementById('product'));

/*  Logique métier, comminication avec l'API, souvegarde des éléments dans Local Storage  */
class DetailController {
    constructor() {
        this.storage = new ListStorage();
        const api = new Api();

        /* recuperation de l'id produit*/
        let params = new URLSearchParams(document.location.search);
        console.log(params);
        let id = params.get("id");
        console.log('id= ' + id);

        api.details(id).then(
            (oneProduct) => {
                const itemView = new ItemView(oneProduct, "card", (forms) => {
                    const optionValue = forms.selectOption.value;
                    console.log(oneProduct)
                    this.storage.add(oneProduct._id, {
                        product: oneProduct,
                        option: optionValue
                    })
                    document.location.href = "cart.html";
                });
                const itemElement = itemView.render();
                document.getElementById('product').appendChild(itemElement);
            })
    }
}

/*  Affichage des éléménts  */

class ItemView extends View {
    constructor(item, card, onSubmit) {
        super();
        this.item = item;
        this.card = card;
        this.onSubmit = onSubmit;
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
        itemContainer.setAttribute('class', `${this.card}`);

        // lenses choise
        const labelOption = document.createElement("label");
        labelOption.setAttribute("for", "option_select");
        labelOption.textContent = "Choisissez l'objectif :";
        const selectOption = document.createElement("select");
        selectOption.setAttribute("name", "option_select");
        selectOption.setAttribute("class", "form-control mb-3 w-25");
        for (let lense of this.item.lenses) {
            var newOption = document.createElement("option");
            var newContent = document.createTextNode(lense);
            newOption.appendChild(newContent);
            selectOption.appendChild(newOption);
        };
        const formContainer = document.createElement('form')

        const buttonContainer = document.createElement('button')
        buttonContainer.addEventListener('click', () => {
            this.onSubmit({
                form: formContainer,
                selectOption: selectOption,
            })
        })

        itemContainer.appendChild(labelOption);
        itemContainer.appendChild(selectOption);
        const idProduct = this.item._id;
        const buttonView = new ButtonView(idProduct);
        itemContainer.appendChild(buttonContainer);
        buttonContainer.id = "link";
        buttonContainer.textContent = 'Ajout panier';
        return itemContainer;
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

class ButtonView extends View {
    constructor(_id) {
        super();
        this._id = _id;
    }
}


new DetailController()