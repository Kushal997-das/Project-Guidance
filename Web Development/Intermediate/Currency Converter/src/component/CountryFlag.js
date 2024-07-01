import React from 'react';
import CountryList from '../data/CountryList';

function CountryFlag({ currency }) {
    // Get the country code based on the currency from the CountryList data
    const countryCode = CountryList[currency];

    return (
        <img
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            alt="countryFlag" width={50} height={50}
            className="country-flag object-fill"
        />
    );
}

export default CountryFlag;