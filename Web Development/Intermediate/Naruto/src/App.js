import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Shinobi from './components/Shinobi';
import Village from './components/Village';
import Clan from './components/Clans';
import Footer from './components/Footer';
import scrollreveal from 'scrollreveal';

function App() {
 
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 3000,
      reset: true,
    });
    sr.reveal(
      `
      nav,
      #home,
      #clan,
      #village,
      #shinobi,
      footer`, {
        opacity: 1,
        interval: 400,
      }
    )
  }, [])
  

  return (
    <>
    
    <Navbar />
    <Hero />
    <Clan />
    <Village />
    <Shinobi />
    <Footer />
    </>
  );
}

export default App;