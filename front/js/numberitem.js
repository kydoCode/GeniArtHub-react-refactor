/*
    Récupérer le cart dans le localStorage
    S'il y a des éléments enregistrés dans le panier,
    on récupère la quantité et on l'affiche dans un span qu'on devra insérer sur #carticon
*/
const span = "<span>0</span>";
const cartIcon = document.querySelector("#carticon");
cartIcon.insertAdjacentHTML("beforeend", span);

function numberItem(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Vérifier la quantité de données dans le panier
    if(cart.length > 0){
        // Si c'est supérieur à 0, cela signifie qu'on a des éléments dans le panier
        //                         (accumulateur, valeurActuelle) => accumulateur + valeurActuelle, valeurInitiale
        const quantity = cart.reduce((acc, el) => acc + el.quantite, 0)
        document.querySelector("#carticon span").textContent = quantity
        document.querySelector("#carticon span").style.display = "flex"
        return
    } 
    document.querySelector("#carticon span").style.display = "none"
    
}
numberItem()