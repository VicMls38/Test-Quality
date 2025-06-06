function canRenewSubscription(subscription, currentDate) {
  const { hasBeenRenewed, endDate } = subscription;
  const datePassed = new Date(endDate) <= new Date(currentDate);
  if (hasBeenRenewed) return false;
  if (!datePassed) return false;
  return true;
}



module.exports = { canRenewSubscription };
