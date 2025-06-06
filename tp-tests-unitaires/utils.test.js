const { sum, isPalindrome, getMax, capitalize, divide, isEven } = require('./utils');

describe('sum', () => {
  test('cas de base: addition de deux nombres positifs', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('addition avec zéro', () => {
    expect(sum(0, 5)).toBe(5);
  });

  test('addition avec une lettre', () => {
    expect(() => sum('a', 5)).toThrow("Les 2 paramètres doivent être de type number");
  });


  test('addition de deux nombres négatifs', () => {
    expect(sum(-2, -3)).toBe(-5);
  });
});

describe('isPalindrome', () => {
  test('cas de base: palindrome simple', () => {
    expect(isPalindrome('kayak')).toBe(true);
  });

  test('ignore les majuscules et les espaces', () => {
    expect(isPalindrome('A Santa at NASA')).toBe(true);
  });

  test('mot non palindrome', () => {
    expect(isPalindrome('bonjour')).toBe(false);
  });

  test('chaîne vide', () => {
    expect(isPalindrome('')).toBe(true);
  });

  test('null doit lancer une erreur', () => {
    expect(() => isPalindrome(null)).toThrow('Le paramètre doit être une chaîne de caractères');
  });

  test('undefined doit lancer une erreur', () => {
    expect(() => isPalindrome(undefined)).toThrow('Le paramètre doit être une chaîne de caractères');
   });

  test('mauvais type (number) doit lancer une erreur', () => {
    expect(() => isPalindrome(123)).toThrow('Le paramètre doit être une chaîne de caractères');
  });
});

describe('getMax', () => {
  test('cas de base: tableau de nombres positifs', () => {
    expect(getMax([1, 3, 2])).toBe(3);
  });

  test('avec des nombres négatifs', () => {
    expect(getMax([-10, -5, -1])).toBe(-1);
  });

  test('valeurs mixtes', () => {
    expect(getMax([-3, 0, 5, 2])).toBe(5);
  });

  test('tableau vide', () => {
    expect(getMax([])).toBeNull();
  });

  test('entrée non tableau', () => {
    expect(getMax('not an array')).toBeNull();
  });
});

describe('capitalize', () => {
  test('cas de base: mot en minuscule', () => {
    expect(capitalize('bonjour')).toBe('Bonjour');
  });

  test('mot déjà capitalisé', () => {
    expect(capitalize('Bonjour')).toBe('Bonjour');
  });

  test('mot en majuscule', () => {
    expect(capitalize('BONJOUR')).toBe('Bonjour');
  });

  test('chaîne vide', () => {
    expect(capitalize('')).toBe('');
  });

  test('un seul caractère', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('divide', () => {
  test('cas de base: division normale', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('division avec un résultat décimal', () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  test('division par zéro doit lancer une erreur', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });

  test('division de zéro', () => {
    expect(divide(0, 5)).toBe(0);
  });
});


describe('isEven', () => {
  test('cas de base: nombre pair', () => {
    expect(isEven(4)).toBe(true);
  });

  test('nombre impair', () => {
    expect(isEven(3)).toBe(false);
  });

  test('zéro est pair', () => {
    expect(isEven(0)).toBe(true);
  });

  test('nombre négatif pair', () => {
    expect(isEven(-2)).toBe(true);
  });

  test('doit lancer une erreur si l\'entrée n\'est pas un nombre', () => {
    expect(() => isEven('a')).toThrow('Input must be a number');
  });
});
