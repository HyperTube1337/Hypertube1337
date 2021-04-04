export default function isNumber(value) {
  // angular implementation
  // Infinity -Infinity = NaN :)
  return !isNaN(value - parseFloat(value));
}
