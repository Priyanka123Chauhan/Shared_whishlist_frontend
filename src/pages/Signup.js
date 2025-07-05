import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/signup/', { username, email, password });
      setMessage("Signup successful!");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center animate-fadeInUp">
        <form onSubmit={handleSignup} className="md:w-1/2 w-full md:pr-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Signup</h2>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          {message && <p className="text-center mb-4 text-green-600">{message}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
          >
            Signup
          </button>
                 <h5>Already a user - <a href='login'>Login</a></h5>

        </form>
        <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Signup Illustration"
            className="rounded-lg shadow-lg animate-float max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
