import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function ProductList() {
  const [Products, setProductList] = useState([]);

  useEffect(() => {
    api.get('products/')
      .then(res => setProductList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Product</h2>
      <ul>
        {Products.map(w => (
          <li key={w.id}>{w.name} - Created by {w.created_by}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
