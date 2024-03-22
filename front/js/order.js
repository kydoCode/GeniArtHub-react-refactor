const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = new FormData(form)

    // On test les champs du formulaire
    // Prénom minimum 2 caractères et pas de caractères spéciaux
    if(data.get("prenom").length < 2 || !/^[a-zA-Z\sàéèêîôùû\-]*$/.test(data.get("prenom"))){
        showInfos("Le prénom doit contenir au moins 2 caractères et ne doit pas contenir de caractères spéciaux")
        return
    }

    // Nom minimum 2 caractères et pas de caractères spéciaux
    if(data.get("nom").length < 2 || !/^[a-zA-Z\sàéèêîôùû\-]*$/.test(data.get("nom"))){
        showInfos("Le nom doit contenir au moins 2 caractères et ne doit pas contenir de caractères spéciaux")
        return
    }

    // Adresse minimum 10 caractères, pas de caractères spéciaux à part les accents et les tirets
    if(data.get("adresse").length < 10 || !/^[a-zA-Z0-9\sàéèêîôùû\-]*$/.test(data.get("adresse"))){
        showInfos("L'adresse doit contenir au moins 10 caractères et ne doit pas contenir de caractères spéciaux")
        return
    }

    // Ville minimum 3 caractères, pas de caractères spéciaux, pas de chiffres
    if(data.get("ville").length < 3 || !/^[a-zA-Z\sàéèêîôùû\-]*$/.test(data.get("ville"))){
        showInfos("La ville doit contenir au moins 3 caractères et ne doit pas contenir de caractères spéciaux")
        return
    }

    // Email valide
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(data.get("mail"))){
        showInfos("L'email n'est pas valide")
        return
    }

    // Si on arrive à ce niveau, c'est bon on peut envoyer les données
    const contact = {
        firstName: data.get("prenom"),
        lastName: data.get("nom"),
        address: data.get("adresse"),
        city: data.get("ville"),
        email: data.get("mail")
    }

    const products = []
    // On parcours le panier et on récupère les id des produits
    cart.forEach(el => {
        products.push(el.id)
    })

    // On envoie les données au serveur
    sendForm(contact, products)
})

// Une fonction asynchrone qui permet d'envoyer le formulaire
async function sendForm(contact, products){
    const req = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({contact, products})
    })
    const res = await req.json()

    // On récupère l'order id et on l'affiche avec la modale
    showInfos(`Votre commande a bien été enregistrée, voici votre numéro de commande : ${res.orderId}`, "Commande enregistrée")

    // Si on obtient le numéro de commande, on vide le panier et le formulaire
}