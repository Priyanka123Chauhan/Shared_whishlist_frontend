import React, { useState } from 'react';
import api from '../api/axios';

function WishlistForm({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    api.post('wishlists/', { name, created_by: 1 }) // Use actual user ID
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
        placeholder="Wishlist Name"
        required
      />
      <button type="submit">Add Wishlist</button>
    </form>
  );
}

export default WishlistForm;
