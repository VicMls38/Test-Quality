function canRenewSubscription(subscription, currentDate) {
  const { hasBeenRenewed, endDate } = subscription;
  if (hasBeenRenewed) return false;
  if (new Date(endDate) > new Date(currentDate)) return false;
  return true;
}



module.exports = { canRenewSubscription };
