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

  describe('analyzeLoyaltyPoints', () => {
    test('should return totalPoints and bonusApplied false when total <= 200', () => {
        const cart = [
        { type: 'standard', price: 50 },  // 5 pts
        { type: 'premium', price: 40 }    // 8 pts
        ];
        expect(analyzeLoyaltyPoints(cart)).toEqual({ totalPoints: 13, bonusApplied: false });
    });

    test('should return totalPoints and bonusApplied true when total > 200', () => {
        const cart = [
        { type: 'standard', price: 150 },  // 15 pts
        { type: 'premium', price: 60 }     // 12 pts
        ];
        // total points = 27 + 10 bonus = 37
        expect(analyzeLoyaltyPoints(cart)).toEqual({ totalPoints: 37, bonusApplied: true });
    });

    test('should return 0 points and bonusApplied false for empty cart', () => {
        expect(analyzeLoyaltyPoints([])).toEqual({ totalPoints: 0, bonusApplied: false });
    });
    });

});
