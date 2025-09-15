import React, { useState } from "react";
import AddLink from "../components/AddLink/AddLink";
import SavedLinks from "../components/AddLink/SavedLinks";

const Home = () => {
  const [links, setLinks] = useState([]);

  // Add new link
  const addLink = (url) => {
    const newLink = {
      id: Date.now(),
      title: "Untitled",  // you can later fetch metadata
      url,
      date: new Date().toLocaleDateString(),
      thumbnail: null,
    };
    setLinks([newLink, ...links]); // add to top
  };

  // Delete a link
  const deleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div>
      <AddLink onAdd={addLink} />
      <SavedLinks links={links} onDelete={deleteLink} />
    </div>
  );
};

export default Home;