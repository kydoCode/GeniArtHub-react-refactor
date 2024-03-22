// Récupérer le panier depuis le localStorage
const panier = JSON.parse(localStorage.getItem("cart")) || [];

// Si le panier est vide, afficher le message : Votre panier est vide. Veuillez ajouter au moins un article à votre panier.
if(panier.length === 0){
    document.querySelector("#panier").innerText = "Votre panier est vide. Veuillez ajouter au moins un article à votre panier.";
}

// Création d'une fonction asynchrone qui va parcourir tous les éléments du panier et faire la correlation avec les id et les formats pour afficher les prix et les images et les titres
async function displayCart(){
    // Parcourir chacun des produits dans le panier
    panier.forEach(async el => {
        // Faire appel à l'api pour récupérer les informations du produit
        const req = await fetch(`http://localhost:3000/api/products/${el.id}`)
        const datas = await req.json()

        // On parcours les données en récupérant : l'id, le format, la quantité, le prix et l'image
        const article = `<article class="article">
                            <img src="${datas.image}" alt="${datas.titre}">
                            <h3>${datas.titre}</h3>
                            <p>Format : ${el.taille}</p>
                            <p class="price">${datas.declinaisons[el.index].prix}€</p>
                            <div>
                                <p>Quantité : </p>
                                <input type="number" value="${el.quantite}" data-id="${el.id}" data-format="${el.taille} min="1">
                            </div>
                            <a href="#">Supprimer</a>
                        </article>`
        // Injecter les articles
        document.querySelector('#panier').insertAdjacentHTML('beforeend', article)
        updateTotal()
    })
}
displayCart()

// Une petite fonction qui va mettre à jour le prix total et le nombre total d'articles
function updateTotal(){
    const totalArticle = document.querySelector('#totalarticle')
    const montantTotal = document.querySelector("#montanttotal")

    let totalArticles = 0
    let totalAmount = 0

    // On fait le calcul du nombre d'articles et du montant total, pour cela on :
    // Récupère chacun des produits du panier qui se trouve sur le dom
    // On récupère le prix unitaire et la quantité
    const price = document.querySelectorAll('.price')
    price.forEach(el => {
        const quantity = el.parentNode.querySelector('input').value
        const unitPrice = parseFloat(el.textContent)
        totalArticles += parseInt(quantity)
        totalAmount += unitPrice * quantity
    })
    totalArticle.innerText = totalArticles
    montantTotal.innerText = totalAmount.toFixed(2)
    numberItem()
}