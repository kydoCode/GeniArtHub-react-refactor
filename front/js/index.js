// Faire appel à l'api
let datas = []
async function init(){
    datas = await getDatas()
    populateData()
}
init()

async function getDatas(){
    const response = await fetch('http://localhost:3000/api/products')
    return await response.json()
}

function populateData(){
    for(const el of datas){
        const article = `<article>
                            <img src="${el.image}" alt="${el.titre}">
                            <a href="product.html?id=${el._id}">Buy ${el.shorttitle}</a>
                        </article>`
        // Injecter les articles
        document.querySelector('.products').insertAdjacentHTML('beforeend', article)
    }
}