function pointsForStandard(price) {
  return Math.floor(price / 10);
}

function pointsForPremium(price) {
  return Math.floor(price / 10) * 2;
}

function calculateLoyaltyPoints(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  let points = 0;

  for (const item of cart) {
    if (item.type === 'standard' && typeof item.price === 'number' && item.price > 0) {
      points += pointsForStandard(item.price);
    } else if (item.type === 'premium' && typeof item.price === 'number' && item.price > 0) {
      points += pointsForPremium(item.price);
    }
  }

  return points;
}

module.exports = { calculateLoyaltyPoints };
