function roundNumber(num, decimalPlaces) {
    if (Number.EPSILON === undefined) {
        Number.EPSILON = Math.pow(2, -52);
    }

    if (Math.sign === undefined) {
        Math.sign = function(x) {
            return ((x > 0) - (x < 0)) || +x;
        };
    }

    var p = Math.pow(10, decimalPlaces || 0);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
module.exports = roundNumber;