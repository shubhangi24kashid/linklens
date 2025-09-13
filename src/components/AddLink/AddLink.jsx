import React, { useState } from "react";
import { auth } from "../auth/firebase";
import "./AddLink.css";

const AddLink = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAdd = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!link.trim()) {
      setErrorMsg("Please enter a link.");
      return;
    }

    try {
      // Basic URL validation before sending to backend
      new URL(link);
    } catch {
      setErrorMsg("Invalid URL format. Please check and try again.");
      return;
    }

    if (!auth.currentUser) {
      setErrorMsg("You must be logged in to add links.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/links/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: link,
          userId: auth.currentUser.uid,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg("Link added successfully!");
        setLink("");
      } else {
        setErrorMsg(data.error || "Failed to add link. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addLinkContainer">
      <h2 className="addLinkTitle">Add New Link</h2>
      <div className="addLinkForm">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste your link here..."
          disabled={loading}
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Feedback messages */}
      {errorMsg && <p className="errorMessage">{errorMsg}</p>}
      {successMsg && <p className="successMessage">{successMsg}</p>}
    </div>
  );
};

export default AddLink;
