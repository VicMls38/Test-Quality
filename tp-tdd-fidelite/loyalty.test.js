const { calculateLoyaltyPoints } = require('./loyalty');

describe('calculateLoyaltyPoints', () => {
  test('should return 0 for empty cart', () => {
    expect(calculateLoyaltyPoints([])).toBe(0);
  });

  test('should return 1 point for a standard product costing 10€', () => {
    const cart = [{ type: 'standard', price: 10 }];
    expect(calculateLoyaltyPoints(cart)).toBe(1);
  });

  test('should return 3 points for a standard product costing 35€', () => {
    const cart = [{ type: 'standard', price: 35 }];
    expect(calculateLoyaltyPoints(cart)).toBe(3); // car Math.floor(35/10) = 3
  });

  test('should return 2 points for a premium product costing 10€', () => {
    const cart = [{ type: 'premium', price: 10 }];
    expect(calculateLoyaltyPoints(cart)).toBe(2);
  });

  test('should return 14 points for a premium product costing 70€', () => {
    const cart = [{ type: 'premium', price: 70 }];
    expect(calculateLoyaltyPoints(cart)).toBe(14); // Math.floor(70/10)*2 = 14
  });

  test('should add 10 bonus points if total price exceeds 200€', () => {
    const cart = [
      { type: 'standard', price: 150 },
      { type: 'premium', price: 60 }
    ];
    // points standard: Math.floor(150/10) *1 = 15
    // points premium: Math.floor(60/10) *2 = 12
    // total points sans bonus = 27
    // total price = 210 > 200 → bonus 10 pts
    expect(calculateLoyaltyPoints(cart)).toBe(37);
  });

});
