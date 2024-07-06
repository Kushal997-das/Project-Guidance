import React from "react";

const Header = ({ setActiveTab }) => {
  return (
    <header className="header">
      <h1 className="logo">MSRC Image Carousel</h1>
      <nav className="nav">
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("about")}>About</button>
        <button onClick={() => setActiveTab("help")}>Help</button>
        <button onClick={() => setActiveTab("contact")}>Contact</button>
      </nav>
    </header>
  );
};

export default Header;
