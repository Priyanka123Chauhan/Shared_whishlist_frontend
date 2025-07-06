import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import WishlistDetail from './pages/WishlistDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Header from './components/Header';
import Footer from './components/Footer';
import { supabase } from './supabaseClient';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
