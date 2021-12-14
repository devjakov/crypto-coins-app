const formatNumber = (number, maximumSignificantDigits, currency = "usd") =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumSignificantDigits }).format(number)

export default formatNumber