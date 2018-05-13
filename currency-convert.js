// USD CAD 23

const axios = require('axios');

const getExchangeRates = async (from, to) => {
    try {
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=81423d8c14df8bcdce263ba3e9078325&base=${from}`);
        const rate = response.data.rates[to];
        if (rate) {
            return response.data.rates[to];
        }
        else {
            throw new Error();
        }
    }
    catch (e) {
        throw new Error(`rate not found to convert ${from} currency to ${to}`);
    }
}

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map(country => country.name);
    }
    catch (e) {
        throw new Error(`cannot get countries for ${currencyCode}`);
    }
}

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRates(from, to);
    }).then((rate) => {
        const exchangeRate = amount * rate;
        return `${amount} ${from} is worth ${exchangeRate} ${to}. ${to} can be used in ${countries.join(', ')}`;
    });
}

const altConvertCurrency = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRates(from, to);
    const exchangeRate = amount * rate;
    return `${amount} ${from} is worth ${exchangeRate} ${to}. ${to} can be used in ${countries.join(', ')}`;
};


altConvertCurrency('EUR', 'IN', 234).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log("error is", error);
});