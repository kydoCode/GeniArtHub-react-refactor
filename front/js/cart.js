const cart = JSON.parse(localStorage.getItem("cart")) || []
let datas = []
async function init() {
    datas = await getDatas()
    populateData()
    updateTotal()
    listenDelete()
}
init()

async function getDatas() {
    const req = await fetch("http://localhost:3000/api/products")
    return await req.json()
}

function populateData(){
    // Parcourir le localStorage
    cart.forEach(el => {
        // Récupérer l'oeuvre correspondante dans datas
        const product = datas.find(product => product._id === el.id && product.declinaisons[el.taille] === el.format)

        const article = `<article class="article">
                            <img src="${product.image}" alt="${product.titre}">
                            <h3>${product.titre}</h3>
                            <p>Format : ${el.taille}</p>
                            <p class="price">${product.declinaisons[el.index].prix}€</p>
                            <div>
                                <p>Quantité : </p>
                                <input type="number" value="${el.quantite}" data-id="${el.id}" data-format="${el.taille}" min="1">
                            </div>
                            <a href="#">Supprimer</a>
                        </article>`
        // Injecter les articles
        document.querySelector('#panier').insertAdjacentHTML('beforeend', article)

    })
}

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

// Fonction qui écoute le clique sur le bouton supprimer
function listenDelete(){
    const deleteButtons = document.querySelectorAll('.article a')
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const article = e.target.closest('.article')
            const id = article.querySelector('input').dataset.id
            const format = article.querySelector('input').dataset.format

            // On cherche l'index dans le panier
            const index = cart.findIndex(el => el.id === id && el.taille === format)

            // On supprime l'élément du panier
            cart.splice(index, 1)
            // On met à jour le localStorage
            localStorage.setItem("cart", JSON.stringify(cart))

            // On supprime l'article du dom
            article.remove()

            // On met à jour le total
            updateTotal()

        })
    })
}

// Fonction qui écoute le changement de quantité