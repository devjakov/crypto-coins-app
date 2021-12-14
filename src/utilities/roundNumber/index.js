const roundNumber = (number, decimalPlaces) => number.toLocaleString("en", {
    maximumFractionDigits: decimalPlaces,
});

export default roundNumber