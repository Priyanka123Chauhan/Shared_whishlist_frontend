<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 9b3f2f1 (Initial commit)
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

=======
>>>>>>> 9b3f2f1 (Initial commit)
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.email);
      setError("");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center animate-fadeInUp">
        <form onSubmit={handleLogin} className="md:w-1/2 w-full md:pr-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
          >
            Login
          </button>
<<<<<<< HEAD
                           <h5>New user - <a href='signup'>Signup now</a></h5>
=======
                           <h5>New user - <a href='login'>Signup now</a></h5>
>>>>>>> 9b3f2f1 (Initial commit)

        </form>
        <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Login Illustration"
            className="rounded-lg shadow-lg animate-float max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
