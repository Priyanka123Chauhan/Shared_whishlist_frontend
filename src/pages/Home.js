import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Home = () => {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [inviteUsername, setInviteUsername] = useState("");
  

  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        localStorage.setItem("userId", user.id);
        // Use username from user metadata or fallback to email
        const username = user.user_metadata?.username || user.email;
        localStorage.setItem("username", username);
      } else {
        console.log("No user session", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    api.get("wishlists/").then(res => {
      setWishlists(res.data);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    api.post("wishlists/", { name, created_by: userId }).then(res => {
      setWishlists(prev => [...prev, res.data]);
      setName("");
    });
  };

  const handleDelete = (id) => {
    api.delete(`wishlists/${id}/`).then(() => {
      setWishlists(prev => prev.filter(w => w.id !== id));
      alert(`Wishlist with id ${id} is deleted!!`);
    }).catch(err => {
      console.error("Failed to delete wishlist", err);
    });
  };

  return (
    <div className="relative p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D8B4FE" />
            <stop offset="100%" stopColor="#A5B4FC" />
          </linearGradient>
        </defs>

        {/* Background gradient */}
        <rect width="800" height="600" fill="url(#skyGradient)" />

        {/* Floating circles */}
        <circle cx="200" cy="300" r="40" fill="#ffffff" opacity="0.2">
          <animate attributeName="cy" dur="12s" values="300; -100; 300" repeatCount="indefinite" />
          <animate attributeName="cx" dur="15s" values="200; 600; 200" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="500" r="50" fill="#ffffff" opacity="0.15">
          <animate attributeName="cy" dur="18s" values="500; -150; 500" repeatCount="indefinite" />
          <animate attributeName="cx" dur="20s" values="600; 100; 600" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="400" r="30" fill="#ffffff" opacity="0.2">
          <animate attributeName="cy" dur="10s" values="400; -80; 400" repeatCount="indefinite" />
          <animate attributeName="cx" dur="14s" values="400; 800; 400" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="relative z-10">
        {user ? (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 animate-fadeInDown">
              Welcome, {localStorage.getItem("username") ?? user.user_metadata?.username ?? user.email}
            </h2>

            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg animate-fadeInUp">
              <h3 className="text-2xl font-semibold mb-4 text-center">Create New Wishlist</h3>
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Wishlist name"
                  required
                  className="flex-grow border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Add
                </button>
              </form>
            </div>

            <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg animate-fadeInUp delay-150">
              <h3 className="text-2xl font-semibold mb-4 text-center">Wishlists</h3>
              <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-6">
                {wishlists.map(w => (
                  <div
                    key={w.id}
                    className="w-full md:w-1/4 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col items-center cursor-pointer"
                  >
                    <Link
                      to={`/wishlist/${w.id}`}
                      className="text-indigo-700 font-semibold text-lg hover:underline mb-2"
                    >
                      {w.name}
                    </Link>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 11h10M7 15h10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {w.item_count} item{w.item_count !== 1 ? "s" : ""}
                    </p>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                      aria-label="Delete wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{color: 'red'}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-xl text-gray-700 text-center mt-20">Please log in</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
