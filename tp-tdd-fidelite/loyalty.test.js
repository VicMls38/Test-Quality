const { calculateLoyaltyPoints, analyzeLoyaltyPoints } = require('./loyalty');

describe('calculateLoyaltyPoints', () => {
  test('should return 0 for empty cart', () => {
    expect(calculateLoyaltyPoints([])).toBe(0);
  });

  test('should return 0 if cart is not an array', () => {
    expect(calculateLoyaltyPoints(null)).toBe(0);
    expect(calculateLoyaltyPoints({})).toBe(0);
  });


  test('should ignore product with invalid price', () => {
    const cart = [{ type: 'standard', price: 'abc' }];
    expect(calculateLoyaltyPoints(cart)).toBe(0);
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

    test('analyzeLoyalty should report no bonus when under 200€', () => {
        const cart = [{ type: 'standard', price: 50 }];
        const result = analyzeLoyaltyPoints(cart);
        expect(result).toEqual({ totalPoints: 5, bonusApplied: false });
    });

    test('should skip non-number price in analyzeLoyaltyPoints', () => {
        const cart = [
            { type: 'standard', price: 50 },
            { type: 'premium', price: 'invalid' } // <= cette ligne va éviter totalPrice += price
        ];
        const result = analyzeLoyaltyPoints(cart);
        // 50€ = 5 points (standard), pas de bonus
        expect(result).toEqual({ totalPoints: 5, bonusApplied: false });
    });

    test('should skip negative price in analyzeLoyaltyPoints', () => {
        const cart = [
            { type: 'standard', price: -100 }, // <= ignoré pour totalPrice
            { type: 'premium', price: 50 }
        ];
        // 50€ = 10 points (premium), pas de bonus
        const result = analyzeLoyaltyPoints(cart);
        expect(result).toEqual({ totalPoints: 10, bonusApplied: false });
    });



  });


  describe('performance test', () => {
    test('should handle 1000 products quickly', () => {
        const bigCart = Array.from({ length: 1000 }, (_, i) => ({
        type: i % 2 === 0 ? 'standard' : 'premium',
        price: 10 + (i % 20), // prix variant entre 10 et 29
        }));

        const start = Date.now();
        const points = calculateLoyaltyPoints(bigCart);
        const duration = Date.now() - start;

        console.log(`Processed 1000 products in ${duration}ms`);

        expect(typeof points).toBe('number');
        expect(points).toBeGreaterThan(0);
        expect(duration).toBeLessThan(100); // par exemple, moins de 100ms
    });
  });


});
