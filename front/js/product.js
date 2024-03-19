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