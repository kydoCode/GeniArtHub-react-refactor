function showInfos(message, title = ""){
    const modale = document.createElement('dialog')

    // Ajouter le contenu de la modale
    modale.appendChild(document.createTextNode(message))
    document.body.appendChild(modale)

    // Créer un élément pour le titre si un titre est fourni
    if(title){
        const h1 = document.createElement('h1')
        h1.textContent = title
        modale.insertBefore(h1, modale.firstChild)
    }

    // Ouvre la modale
    modale.showModal()

    setTimeout(() => {
        modale.close()
        // Supprime la modale du DOM
        modale.remove()
    }, 3000) // Se lance au bout de 3 secondes
}