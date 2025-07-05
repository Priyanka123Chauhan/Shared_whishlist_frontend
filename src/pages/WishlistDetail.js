import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { supabase } from '../supabaseClient';

const WishlistDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", image_url: "", price: "" });
  const [inviteUsername, setInviteUsername] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [wishlist, setWishlist] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", image_url: "", price: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        try {
          const res = await api.post("/users/sync/", { username: user.user_metadata?.user_name || user.email, email: user.email });
          localStorage.setItem("userId", res.data.id);
        } catch (err) {
          console.error("Failed to sync user with backend", err);
        }
      } else {
        console.error("No user session", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    api.get(`wishlists/${id}/`).then(res => {
      setWishlist(res.data);
    });
  }, [id]);

  useEffect(() => {
    api.get("products/").then(res => {
      const filtered = res.data.filter(p => p.wishlist === parseInt(id));
      setProducts(filtered);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      image_url: form.image_url.trim() || null,
      price: parseFloat(form.price),
      wishlist: parseInt(id),
      added_by: parseInt(localStorage.getItem("userId")) || null,
    };

    try {
      const response = await api.post("/products/", payload);
      setProducts(prev => [...prev, response.data]);
      setForm({ name: "", image_url: "", price: "" });
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Failed to add product: " + JSON.stringify(err.response?.data || err.message));
    }
  };

<<<<<<< HEAD
  const handleInvite = async e => {
    e.preventDefault();
    if (!inviteUsername) {
      setInviteMessage("Please enter an email or username to invite.");
      return;
    }
    try {
      const isEmail = inviteUsername.includes('@');
      const syncPayload = isEmail ? { email: inviteUsername } : { username: inviteUsername };
      const syncRes = await api.post("users/sync/", syncPayload);
      const userId = syncRes.data.id;
      if (!userId) {
        setInviteMessage("User not found.");
        return;
      }
      const inviteRes = await api.post(`${id}/invite/`, { user_id: userId });
      setInviteMessage(inviteRes.data.message);
      setInviteUsername("");
    } catch (err) {
      console.error("Invite error:", err);
      setInviteMessage(err.response?.data?.error || "Invite failed");
    }
=======
  const handleInvite = e => {
    e.preventDefault();
    api.post(`${id}/invite/`, { username: inviteUsername })
      .then(res => {
        setInviteMessage(res.data.message);
        setInviteUsername("");
      })
      .catch(err => {
        setInviteMessage(err.response?.data?.error || "Invite failed");
      });
>>>>>>> 9b3f2f1 (Initial commit)
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditForm({ name: product.name, image_url: product.image_url, price: product.price });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    api.put(`/products/${editingProductId}/`, editForm)
      .then(res => {
        setProducts(products.map(p => (p.id === editingProductId ? res.data : p)));
        setEditingProductId(null);
        setIsEditModalOpen(false);
      });
  };

  const handleDelete = (productId) => {
    api.delete(`/products/${productId}/`)
      .then(() => {
        setProducts(products.filter(p => p.id !== productId));
      });
  };

  const isAuthorized = (product) => {
    const localUserId = parseInt(localStorage.getItem("userId"));
    if (!wishlist || !user) return false;
    return wishlist.contributors.includes(localUserId) || product.added_by === localUserId;
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 animate-fadeInDown">
        Wishlist #{id} Items
      </h2>

      {wishlist && (
        <p className="text-center mb-6 text-gray-600">Created by: {wishlist.created_by_username || wishlist.created_by_email}</p>
      )}

      {/* Add Product */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg animate-fadeInUp mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add Product</h3>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Product Name"
          required
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          value={form.image_url}
          onChange={e => setForm({ ...form, image_url: e.target.value })}
          placeholder="Image URL"
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Add Product
        </button>
      </form>

      {/* Invite */}
      <h3 className="text-2xl font-semibold mb-4 text-center">Invite Contributor</h3>
      <form onSubmit={handleInvite} className="max-w-xl mx-auto mb-6 flex gap-4">
        <input
          value={inviteUsername}
          onChange={e => setInviteUsername(e.target.value)}
<<<<<<< HEAD
          placeholder="Email or username to invite"
=======
          placeholder="Username to invite"
>>>>>>> 9b3f2f1 (Initial commit)
          required
          className="flex-grow border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Invite
        </button>
      </form>
      {inviteMessage && <p className="text-center mb-6 text-green-700 font-semibold">{inviteMessage}</p>}

      {/* Product Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            isAuthorized={isAuthorized(p)}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4 text-center">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col">
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="Product Name"
                required
                className="mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="image_url"
                value={editForm.image_url}
                onChange={handleEditChange}
                placeholder="Image URL"
                className="mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="price"
                type="number"
                value={editForm.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistDetail;
