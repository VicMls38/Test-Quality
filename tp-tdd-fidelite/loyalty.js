function calculatePointsForItem(item) {
  if (typeof item.price !== 'number' || item.price <= 0) return 0;

  switch (item.type) {
    case 'standard':
      return Math.floor(item.price / 10);
    case 'premium':
      return Math.floor(item.price / 10) * 2;
    default:
      return 0;
  }
}

function calculateLoyaltyPoints(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  let points = 0;

  for (const item of cart) {
    points += calculatePointsForItem(item);
  }

  return points;
}

module.exports = { calculateLoyaltyPoints };
