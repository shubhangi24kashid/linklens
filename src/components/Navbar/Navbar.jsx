"use client"

import { useEffect, useState, useContext } from "react"
import { auth } from "../auth/firebase"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import {
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaLink,
} from "react-icons/fa"
import "./Navbar.css"

import { SearchContext } from "../../context/SearchContext"; 


function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext) // ✅ use context
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setIsDropdownOpen(false)
    navigate("/login")
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-wrapper")) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <a href="/" className="logo-link">
              <FaLink className="logo-icon" />
              LinkLens
            </a>
          </div>

          {/* Search Bar - Hidden on mobile, shown on md+ */}
          <div className="search-container">
            <div className="search-wrapper">
              <div className="search-icon">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search your saved links..."
                className="search-input"
                value={searchQuery} // ✅ from context
                onChange={(e) => {
    console.log("search updated:", e.target.value); // ✅ debug
    setSearchQuery(e.target.value);
  }} // ✅ update context
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            {/* Mobile Search Button */}
            <button className="mobile-search-btn">
              <FaSearch />
            </button>

            {!user ? (
              <div className="auth-buttons">
                <button onClick={() => navigate("/login")} className="login-btn">
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="signup-btn"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="profile-wrapper">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="profile-button"
                >
                  <FaUserCircle className="profile-icon" />
                  <FaChevronDown
                    className={`chevron-icon ${isDropdownOpen ? "rotated" : ""}`}
                  />
                </button>

                {/* Enhanced Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-profile-info">
                        <FaUserCircle className="dropdown-profile-icon" />
                        <div className="dropdown-text">
                          <p className="dropdown-name">
                            {user.displayName ||
                              user.email?.split("@")[0] ||
                              "User"}
                          </p>
                          <p className="dropdown-email">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-actions">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false)
                          navigate("/profile")
                        }}
                        className="dropdown-item"
                      >
                        <FaUser className="dropdown-item-icon" />
                        View Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout"
                      >
                        <FaSignOutAlt className="dropdown-item-icon" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mobile-search">
          <div className="search-wrapper">
            <div className="search-icon">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search your saved links..."
              className="search-input"
              value={searchQuery} // ✅ from context
              onChange={(e) => setSearchQuery(e.target.value)} // ✅ update context
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
