import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/auth/firebase";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { SearchProvider } from "./context/SearchContext"; 
import Profile from "./components/Profile/Profile";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SearchProvider>   {/* ✅ wrap the whole app here */}
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
