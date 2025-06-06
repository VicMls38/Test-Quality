function calculatePointsForItem(item) {
  if (typeof item.price !== 'number' || item.price <= 0) return 0;

  switch (item.type) {      
    case 'premium':
      return Math.floor(item.price / 10) * 2;
    default:
      return Math.floor(item.price / 10);
  }
}

function calculateLoyaltyPoints(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  let points = 0;
  let totalPrice = 0;

  for (const item of cart) {
    points += calculatePointsForItem(item);
    if (typeof item.price === 'number' && item.price > 0) {
      totalPrice += item.price;
    }
  }

  if (totalPrice > 200) points += 10;

  return points;
}

function analyzeLoyaltyPoints(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    return { totalPoints: 0, bonusApplied: false };
  }

  let points = 0;
  let totalPrice = 0;

  for (const item of cart) {
    points += calculatePointsForItem(item);
    if (typeof item.price === 'number' && item.price > 0) {
      totalPrice += item.price;
    }
  }

  const bonusApplied = totalPrice > 200;
  if (bonusApplied) points += 10;

  return { totalPoints: points, bonusApplied };
}

module.exports = { calculateLoyaltyPoints, analyzeLoyaltyPoints };
