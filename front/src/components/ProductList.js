import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/products');
      const result = await response.json();
      setProducts(result);
    };

    fetchData();
  }, []);

  return (
    <div className="productlist">
      <div>
        <img src="img/logo-black.png" alt="Logo GeniArtHub version sombre" />
        <Link id="carticon" to="/cart">
          <img src="img/cart.svg" alt="Aller au panier" />
        </Link>
      </div>
      <section className="products">
        {products.map((product) => (
          <article key={product._id}>
            <img src={product.image} alt={product.titre} />
            <Link to={`/product/${product._id}`}>Buy {product.shorttitle}</Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ProductList;
