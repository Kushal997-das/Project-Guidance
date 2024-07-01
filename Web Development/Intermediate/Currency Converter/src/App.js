import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import "./App.css";
import CountryFlag from "./component/CountryFlag";
import Footer from './component/Footer';
import bg from "./images/bg.png";
import { HoverEffect } from './try2';


function App() {
  const [rates, setRates] = useState({});
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState(0);

  const items = [
    {
          title: "Our Vision",
          description: "Our vision is to transform the way music lovers interact with their favorite tracks. We aim to create an intuitive and powerful music player application that caters to the diverse needs of our users, ensuring they have the best possible experience while enjoying their music.",
          link: "/"
        },
        {
          title: "What We Offer",
          description: " We provide access to a vast collection of songs from various genres and languages, seamless streaming with high-quality audio, and personalized playlists. Discover new music and enjoy an elevated listening experience with The Spring Player.",
          link: "/"
        },
        {
          title: "Our Team",
          description: "Our team consists of passionate developers, designers, and music enthusiasts committed to delivering an outstanding product. We believe in the power of music to bring people together and strive to make it accessible and enjoyable for everyone.",
          link: "/"
        },
        {
          title: "Join Us on Our Journey",
          description: "We are constantly working on improving The Spring Player and adding new features to enhance your experience. Join us on this exciting journey and be a part of our growing community of music lovers. Together, let's create the ultimate music experience.",
          link: "/"
        },
  ];


  const getRates = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/083d3c45c5801ef248bc815/latest/USD`
      ).then((response) => response.json());

      if (response.result === "success") {
        setRates(response.conversion_rates);
        setRatesFetched(true);
      }
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const calculateOutput = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/083d3c45c5e801ef248bc815/latest/${fromCurrency}`
      ).then((response) => response.json());
      const fetchedRates = response.conversion_rates;
      if (!fetchedRates) {
        console.error('Rates have not been fetched yet');
        return;
      }
      const CurrencyRate = fetchedRates[toCurrency];
      const output = amount * CurrencyRate;
      setOutput(output);
    } catch (error) {
      console.error("Failed to calculate output:", error);
    }
  };

  const handleSwap = () => {
    // Swap the values of fromCurrency and toCurrency
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <header>
             <h1 className="text-center mx-3">Currency Converter</h1>
      </header>
    <div className="flex justify-around cont">
    <div className="container border-2 m-2 p-5 border-gray-500">
      <div className="input-amount">
        <label>Amount:</label>
        <CurrencyInput
          value={amount}
          onValueChange={(amount) => setAmount(amount)}
          intlConfig={{ locale: "en-US", currency: fromCurrency }}
          allowDecimals={true}
          allowNegativeValue={false}
        />
      </div>

      
      <div className="input-from">
        <label>From:</label>
        <div className="flag-select-container">
          <CountryFlag currency={fromCurrency} />
          <select
            id="from"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {ratesFetched ? (
              Object.keys(rates).map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <option defaultValue>USD</option>
            )}
          </select>
        </div>
      </div>

      <div className="text-center">
      <button className="swap-btn " onClick={handleSwap}><svg xmlns="http://www.w3.org/2000/svg" width={10} height={20}  viewBox="0 0 256 512"><path d="M145.6 7.7C141 2.8 134.7 0 128 0s-13 2.8-17.6 7.7l-104 112c-6.5 7-8.2 17.2-4.4 25.9S14.5 160 24 160H80V352H24c-9.5 0-18.2 5.7-22 14.4s-2.1 18.9 4.4 25.9l104 112c4.5 4.9 10.9 7.7 17.6 7.7s13-2.8 17.6-7.7l104-112c6.5-7 8.2-17.2 4.4-25.9s-12.5-14.4-22-14.4H176V160h56c9.5 0 18.2-5.7 22-14.4s2.1-18.9-4.4-25.9l-104-112z" /></svg></button>
      </div>
      <div className="input-to">
        <label>To:</label>
        <div className="flag-select-container">
        <CountryFlag currency={toCurrency} /> 
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>EUR</option>
          )}
        </select>
        </div>
      </div>
      <div className="text-center">
      <button className="btn rounded-xl" onClick={() => calculateOutput()}>
        Calculate
      </button>
      </div>
      <div className="output text-center border-4 bg-white">
        <label>Converted Amount: {output.toFixed(2)}</label>
      </div>
    </div>
        <div className="imghero">
          <img src={bg} alt="" width={500} height={500} />
        </div>
      </div>
      <div>
        <HoverEffect items={items} />
      </div>
    <Footer/>
    </>
  );
}

export default App;
