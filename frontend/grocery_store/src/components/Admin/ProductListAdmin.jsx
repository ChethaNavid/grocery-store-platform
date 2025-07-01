import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardAdmin from './ProductCardAdmin';

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
  axios.get('http://localhost:3000/product')
    .then(res => {
      console.log("Fetched:", res.data);
      // Correct key is "product", not "products"
      setProducts(Array.isArray(res.data.product) ? res.data.product : []);
    })
    .catch(err => console.error("API error:", err));
}, []);

  return (
    <div className='flex flex-wrap pt-10 px-4'>
      {error && <p className="w-full text-center text-red-500">{error}</p>}
      {!error && products.length === 0 && (
        <p className="w-full text-center text-gray-500">No products found.</p>
      )}
      {products.map(product => (
        <ProductCardAdmin
          key={product.id}
          imgURL={product.imgURL}
          category={`Category ${product.categoryId}`} // or replace with category name if joined
          productName={product.name}
          price={`$${product.price}`}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
};

export default ProductListAdmin;
