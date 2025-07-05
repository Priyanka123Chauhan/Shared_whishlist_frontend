import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function WishlistList() {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    api.get('wishlists/')
      .then(res => setWishlists(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Wishlists</h2>
      <ul>
        {wishlists.map(w => (
          <li key={w.id}>{w.name} - Created by {w.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default WishlistList;
