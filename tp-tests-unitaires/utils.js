function sum(a, b) {
  return a + b;
}

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/\s/g, '');
  return clean === clean.split('').reverse().join('');
}

function getMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return Math.max(...arr);
}

function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

function isEven(n) {
  if (typeof n !== 'number') throw new Error("Input must be a number");
  return n % 2 === 0;
}

module.exports = { sum, isPalindrome, getMax, capitalize, divide, isEven };

