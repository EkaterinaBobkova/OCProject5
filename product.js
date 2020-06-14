

let params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");
console.log('id= ' + id);

let _id = id;



//    Connexion à l'API
const get = function (url) {
    return new Promise(function (onSuccess, onError) {
      const xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            onSuccess(xhr.responseText);
          } else {
            onError(xhr);
          };
        };
      };

      xhr.open('GET','http://localhost:3000/api/cameras' + _id, true);
     
      xhr.send();
    });
  };

let catchError = function(e){
  console.error('Error AJAX', e);
};

//    Récupération des données
get();
let camera = function () {
  return get('http://localhost:3000/api/cameras' + _id).then(function (response) {
    let cameras = JSON.parse(response);
    return cameras;
  });
};

// Affiche la liste des articles

camera().then(function(cameras){
console.log(cameras);

cameras.forEach( camera=>{

  let article = document.createElement('article');
  let image = document.createElement('img');
  image.src =  camera.imageUrl;
  let div = document.createElement('div');
  let nom = document.createElement('h3');
  nom.textContent = camera.name;
  let prix = document.createElement('h4');
  prix.textContent = 'Prix :';
  let price = document.createElement('p');
  price.textContent = camera.price/100 + ' €';
  let desc = document.createElement('h4');
  desc.textContent = 'Description :';
  let description = document.createElement('p');
  description.textContent = camera.description;
  let id = camera._id;

  let link = document.createElement('a');
  link.id = "lien";
  link.href = 'produit.html?id=' + camera._id;
  link.textContent = "fiche du produit";

  // mise en place des éléments 

  app.appendChild(article);
  article.appendChild(nom);
  article.appendChild(image);
  article.appendChild(div);
  div.appendChild(prix);
  div.appendChild(price);
  div.appendChild(desc);
  div.appendChild(description);
  div.appendChild(link)
  
  console.log(camera);
});
});

  