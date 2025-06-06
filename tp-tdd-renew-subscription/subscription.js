function canRenewSubscription(subscription, currentDate) {
  const {
    status,
    hasBeenRenewed,
    endDate,
  } = subscription;

  const isActive = status === 'active';
  const notRenewed = !hasBeenRenewed;
  const datePassed = new Date(endDate) <= new Date(currentDate);

  if (!isActive || !notRenewed || !datePassed) return false;
  return true;
}





module.exports = { canRenewSubscription };
