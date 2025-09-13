import React, { useEffect, useState, useContext } from "react";
import { db, auth } from "../auth/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { SearchContext } from "../../context/SearchContext"; // ✅ import search context
import "./SavedLinks.css";

const SavedLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);

  const { searchQuery } = useContext(SearchContext); // ✅ get global search text

  useEffect(() => {
    let unsubscribeLinks = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "links"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        unsubscribeLinks = onSnapshot(q, (snapshot) => {
          const userLinks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLinks(userLinks);
          setLoading(false);
        });
      } else {
        setLinks([]);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeLinks) unsubscribeLinks();
      unsubscribeAuth();
    };
  }, []);

  const handleDelete = async (linkId, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this link?")) return;
    try {
      await deleteDoc(doc(db, "links", linkId));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ filter links based on searchQuery
  const filteredLinks = links.filter((link) => {
    const q = searchQuery.toLowerCase();
    return (
      (link.title || "").toLowerCase().includes(q) ||
      (link.description || "").toLowerCase().includes(q) ||
      (link.url || "").toLowerCase().includes(q) ||
      (link.category || "").toLowerCase().includes(q) ||
      (link.keywords || []).join(" ").toLowerCase().includes(q)
    );
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="savedLinksContainer">
      <h2>Saved Links</h2>

      {filteredLinks.length === 0 ? (
        <p>No links found.</p>
      ) : (
        <div className="linksGrid">
          {filteredLinks.map((link) => (
            <div
              className="linkCard"
              key={link.id}
              onClick={() => setSelectedLink(link)}
            >
              <div className="thumb">
                <img
                  src={
                    link.favicon ||
                    `https://www.google.com/s2/favicons?sz=64&domain=${new URL(
                      link.url
                    ).hostname}`
                  }
                  alt="icon"
                />
              </div>

              <div className="linkContent">
                <h3>{link.title || new URL(link.url).hostname}</h3>
                <p className="linkUrl">{link.url}</p>
                {link.description && (
                  <p className="linkDesc">
                    {link.description.length > 80
                      ? link.description.slice(0, 80) + "..."
                      : link.description}
                  </p>
                )}
              </div>

              <button
                className="deleteBtn"
                onClick={(e) => handleDelete(link.id, e)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedLink && (
        <div className="modal">
          <div className="modalContent">
            <h2>
              {selectedLink.title || new URL(selectedLink.url).hostname}
            </h2>
            <a href={selectedLink.url} target="_blank" rel="noreferrer">
              {selectedLink.url}
            </a>

            {selectedLink.favicon && (
              <img
                src={selectedLink.favicon}
                alt="favicon"
                style={{ width: "32px", height: "32px", marginTop: "8px" }}
              />
            )}

            {selectedLink.description && (
              <p>
                <b>Description:</b> {selectedLink.description}
              </p>
            )}

            {selectedLink.summary &&
              selectedLink.summary !== "No summary" && (
                <p>
                  <b>Summary:</b> {selectedLink.summary}
                </p>
              )}

            {selectedLink.category && (
              <p>
                <b>Category:</b> {selectedLink.category}
              </p>
            )}

            {selectedLink.keywords &&
              selectedLink.keywords.length > 0 && (
                <p>
                  <b>Keywords:</b> {selectedLink.keywords.join(", ")}
                </p>
              )}

            <p>
              <b>Added:</b>{" "}
              {selectedLink.createdAt?.toDate
                ? selectedLink.createdAt.toDate().toLocaleString()
                : selectedLink.createdAt}
            </p>

            <button onClick={() => setSelectedLink(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedLinks;
