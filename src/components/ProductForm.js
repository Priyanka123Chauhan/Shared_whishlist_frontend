import React, { useState } from 'react';
import api from '../api/axios';

function ProductForm({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    api.post('products/', { name, created_by: 1 }) // Use actual user ID
      .then(res => {
        onAdd(res.data);
        setName('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Product Name"
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
