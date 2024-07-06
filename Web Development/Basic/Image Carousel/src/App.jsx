import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Carousel from "./Components/Carousel";
import About from "./Components/About";
import Help from "./Components/Help";
import Bot from "./Components/Bot";
import Contact from "./Components/Contact";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  let content;
  if (activeTab === "about") {
    content = <About />;
  } else if (activeTab === "help") {
    content = <Help />;
  } else if(activeTab === "contact"){
    content = <Contact />
  } else {
    content = <Carousel />;
  }

  return (
    <div className="app">
      <Header setActiveTab={setActiveTab} />
      <main className="main">{content}</main>
      <Footer />
      <div className="bot">
         <Bot />
      </div>
    </div>
  );
};

export default App;
