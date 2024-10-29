import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const result = await response.json();
      setProduct(result);
      setSelectedFormat(result.declinaisons[0].taille);
      setPrice(result.declinaisons[0].prix);
    };

    fetchData();
  }, [id]);

  const handleFormatChange = (e) => {
    const selectedIndex = e.target.options[e.target.selectedIndex].dataset.index;
    setSelectedFormat(e.target.value);
    setPrice(product.declinaisons[selectedIndex].prix);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(
      (el) => el.id === id && el.taille === selectedFormat
    );

    if (existingProductIndex === -1) {
      cart.push({
        id: id,
        taille: selectedFormat,
        quantite: quantity,
        index: selectedFormat.options[selectedFormat.selectedIndex].dataset.index,
      });
    } else {
      const currentQuantity = cart[existingProductIndex].quantite;
      const newQuantity = currentQuantity + quantity;
      if (newQuantity > 100) {
        alert('La quantité doit être de 100 maximum');
        return;
      }
      cart[existingProductIndex].quantite = newQuantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detailoeuvre">
      <article>
        <figure>
          <img src={product.image} alt={product.titre} />
        </figure>
        <div>
          <h1>{product.titre}</h1>
          <p>{`${product.description.substring(0, 200)}...`}</p>
          <div className="price">
            <p>Acheter pour</p>
            <span className="showprice">{price} €</span>
          </div>
          <div className="declinaison">
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              max="100"
            />
            <select
              name="format"
              id="format"
              value={selectedFormat}
              onChange={handleFormatChange}
            >
              {product.declinaisons.map((declinaison, index) => (
                <option key={index} data-index={index} value={declinaison.taille}>
                  Format : {declinaison.taille}
                </option>
              ))}
            </select>
          </div>
          <button className="button-buy" onClick={handleAddToCart}>
            Buy {product.shorttitle}
          </button>
        </div>
      </article>

      <aside>
        <h2>Description de l’oeuvre : {product.titre}</h2>
        <p>{product.description}</p>
      </aside>
    </div>
  );
};

export default ProductDetail;
