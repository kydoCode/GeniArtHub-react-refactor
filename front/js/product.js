// Récupérer l'id dans l'url
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

// Fonction init
async function init(){
    const data = await getDatas()
    populateData(data)
}
init()
// Fonction pour faire l'appel à l'API : /products/id
async function getDatas(){
    const req = await fetch(`http://localhost:3000/api/products/${id}`)
    return await req.json()
}

// Fonction pour injecter les données dans le DOM
function populateData(product){
    // Changer le title de la page
    document.title = product.titre + " - GeniArtHub"
    // Changer l'image .detailoeuvre img
    document.querySelector('.detailoeuvre img').src = product.image
    // Changer le alt de l'image .detailoeuvre img
    document.querySelector('.detailoeuvre img').alt = product.titre
    // Changer le titre h1 de la page
    document.querySelector('h1').textContent = product.titre
    // Changer le contenu de la description courte (prendre la description et la tronquer à 200 caractères)
    document.querySelector('article > div > p').textContent = `${product.description.substring(0, 200)}...`

    // changer le prix en prenant le prix de la premiere declinaison 
    document.querySelector('.showprice').textContent = `${product.declinaisons[0].prix} €`

    // Changer le contenu du bouton (.button-buy) en affichant "Buy + shorttitle"
    document.querySelector('.button-buy').textContent = `Buy ${product.shorttitle}`

    // Changer le contenu du h2 en affichant "Description de l'oeuvre : + titre"
    document.querySelector('h2').textContent = `Description de l'oeuvre : ${product.titre}`

    // Changer le contenu de la description longue (aside > p)
    document.querySelector('aside > p').textContent = product.description

    // Récupérer le champ select #format, parcourir les déclinaisons et remplir le champ avec les options
    const select = document.querySelector('#format')
    product.declinaisons.forEach((declinaison, index) => {
       const option = `<option data-index="${index}" value="${declinaison.taille}">Format : ${declinaison.taille}</option>`
       select.insertAdjacentHTML('beforeend', option)
    })

    // Ajouter un eventListener sur le champ select #format
    select.addEventListener('change', (e) => {
       const index = select.options[select.selectedIndex].dataset.index
       document.querySelector('.showprice').textContent = `${product.declinaisons[index].prix} €`
    })
}

// Au clic sur le bouton .button-buy, ajouter l'oeuvre au panier
const button = document.querySelector('.button-buy')
button.addEventListener("click", (e) => {
    e.preventDefault()
    const quantityInput = document.querySelector('#quantity')
    const formatInput = document.querySelector('#format')

    // La quantité doit être un nombre entier
    const quantity = parseInt(quantityInput.value)
    const format = formatInput.value

    // On doit avoir au moins une oeuvre
    if(quantity <= 0){
        showInfos("La quantité doit être d'au moins 1")
        return
    }

    if(quantity > 100){
        showInfos("La quantité doit être de 100 maximum")
        return
    }

    // On créer un panier/Récuperer le panier déjà existant
    const panier = JSON.parse(localStorage.getItem("cart")) || []

    // Vérifier si l'oeuvre n'est pas déjà dans le panier
    const existingProductIndex = panier.findIndex(el => el.id === id && el.taille === format)

    // Si j'obtiens -1, ça signifie que l'oeuvre n'est pas dans le panier
    if(existingProductIndex === -1){
        panier.push({
            id: id,
            taille: format,
            quantite: quantity,
            index: formatInput.options[formatInput.selectedIndex].dataset.index
        })
        showInfos("Produit ajouté au panier")
        localStorage.setItem("cart", JSON.stringify(panier))
        numberItem()
    }

    // Si le produit existe déjà, on vérifie si la nouvelle quantité ne dépasse pas 100 et si c'est bon, on l'ajout au panier
    if(existingProductIndex !== -1){
        // On à donc l'index, on regarde dans le panier la quantité actuelle
        const currentQuantity = panier[existingProductIndex].quantite
        const newQuantity = currentQuantity + quantity
        // Si je dépasse les 100, j'affiche une erreur
        if(newQuantity > 100){
            showInfos("La quantité doit être de 100 maximum")
            return
        }
        // Sinon, j'ajoute la quantité
        panier[existingProductIndex].quantite = newQuantity
        localStorage.setItem("cart", JSON.stringify(panier))
        numberItem()
        showInfos("Produit ajouté au panier")

    }
})