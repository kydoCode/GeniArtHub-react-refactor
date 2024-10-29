import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/products');
      const result = await response.json();
      setDatas(result);
    };

    fetchData();
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateTotal = () => {
    const totalArticle = document.querySelector('#totalarticle');
    const montantTotal = document.querySelector('#montanttotal');

    let totalArticles = 0;
    let totalAmount = 0;

    const price = document.querySelectorAll('.price');
    price.forEach((el) => {
      const quantity = el.parentNode.querySelector('input').value;
      const unitPrice = parseFloat(el.textContent);
      totalArticles += parseInt(quantity);
      totalAmount += unitPrice * quantity;
    });

    totalArticle.innerText = totalArticles;
    montantTotal.innerText = totalAmount.toFixed(2);
    numberItem();
  };

  const handleDelete = (id, format) => {
    const updatedCart = cart.filter((item) => !(item.id === id && item.taille === format));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal();
  };

  const handleQuantityChange = (id, format, quantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.taille === format) {
        return { ...item, quantite: quantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal();
  };

  return (
    <div>
      <h2>Votre Panier</h2>
      <div id="panier">
        {cart.map((el) => {
          const product = datas.find(
            (product) => product._id === el.id && product.declinaisons[el.taille] === el.format
          );

          return (
            <article className="article" key={`${el.id}-${el.taille}`}>
              <img src={product.image} alt={product.titre} />
              <h3>{product.titre}</h3>
              <p>Format : {el.taille}</p>
              <p className="price">{product.declinaisons[el.index].prix}€</p>
              <div>
                <p>Quantité : </p>
                <input
                  type="number"
                  value={el.quantite}
                  data-id={el.id}
                  data-format={el.taille}
                  min="1"
                  onChange={(e) => handleQuantityChange(el.id, el.taille, e.target.value)}
                />
              </div>
              <a href="#" onClick={() => handleDelete(el.id, el.taille)}>
                Supprimer
              </a>
            </article>
          );
        })}
      </div>

      <div className="total">
        <h3>Total de la commande</h3>
        <p id="total">
          <span id="totalarticle">0</span> articles pour un montant de <span id="montanttotal">0</span>€
        </p>
      </div>
    </div>
  );
};

export default Cart;
