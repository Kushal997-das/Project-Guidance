package com.app.currencyconverter.api;

import java.net.MalformedURLException;
import java.net.URL;

public class URLBuilder {

    // fixer.io access key and base url
    private static final String FIXER_ACCESS_KEY = "58f722e28cdf44dda44ba2605745c49f";
    private static final String FIXER_BASE_URL = "http://data.fixer.io/api/";

    // freecurrencyapi.net access key and base url
    private static final String FCA_BASE_URL = "https://freecurrencyapi.net/api/v2/latest";
    private static final String FCA_ACCESS_KEY = "7ee0abc0-9a22-11ec-9752-3728e0a90139";

    // URL that fetches all country currency codes along with their name
    public static URL buildSymbolNamesURL() throws MalformedURLException {
        return new URL(String.format("%s%s?access_key=%s", FIXER_BASE_URL, "symbols", FIXER_ACCESS_KEY));
    }

    // URL that fetches the exchange rates for every other country provided the base country
    public static URL buildExchangeRatesURL(String base) throws MalformedURLException {
        return new URL(String.format("%s?apikey=%s&base_currency=%s", FCA_BASE_URL, FCA_ACCESS_KEY, base));
    }

}
