function canRenewSubscription(subscription, currentDate) {
  const { status, hasBeenRenewed, endDate } = subscription;
  const datePassed = new Date(endDate) <= new Date(currentDate);
  if (status !== 'active') return false;
  if (hasBeenRenewed) return false;
  if (!datePassed) return false;
  return true;
}




module.exports = { canRenewSubscription };
