function calculateLoyaltyPoints(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  let points = 0;

  for (const item of cart) {
    if (item.type === 'standard' && typeof item.price === 'number' && item.price > 0) {
      points += Math.floor(item.price / 10);
    }
  }

  return points;
}

module.exports = { calculateLoyaltyPoints };
