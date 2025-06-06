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
});
