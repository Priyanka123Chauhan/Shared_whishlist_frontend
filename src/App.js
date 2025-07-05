<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 9b3f2f1 (Initial commit)
import Home from './pages/Home';
import WishlistDetail from './pages/WishlistDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Header from './components/Header';
import Footer from './components/Footer';
<<<<<<< HEAD
import { supabase } from './supabaseClient';
=======
>>>>>>> 9b3f2f1 (Initial commit)

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
<<<<<<< HEAD
      <Header session={session} />
      <Routes>
        <Route
          path="/"
          element={session ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/wishlist/:id"
          element={session ? <WishlistDetail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!session ? <Signup /> : <Navigate to="/" replace />}
        />
=======
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist/:id" element={<WishlistDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
>>>>>>> 9b3f2f1 (Initial commit)
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
