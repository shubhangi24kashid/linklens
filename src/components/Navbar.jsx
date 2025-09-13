import React, { useState } from 'react';
import styles from './Navbar.module.css';
// For icons, you might use 'react-icons' or FontAwesome
import { FaSearch, FaUserCircle, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../features/auth/authSlice'; // Assuming you have an auth slice

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  // const user = useSelector(state => state.auth.user); // Get user from Redux store

  const handleLogout = () => {
    // dispatch(logoutUser()); // Dispatch logout action
    console.log('User logged out');
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // You might dispatch a Redux action here to filter links
    console.log('Search term:', e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.logo}>
        LinkLens
      </a>

      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search your saved links..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div
        className={`${styles.profileDropdown} ${isDropdownOpen ? styles.active : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {/* Replace with actual user profile pic if available */}
        <img
          src="https://via.placeholder.com/40/6a5acd/ffffff?text=U"
          alt="Profile"
          className={styles.profilePic}
        />
        {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <button onClick={handleLogout} className={styles.dropdownItem}>
              Logout
            </button>
            {/* Add other menu items here if needed */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;