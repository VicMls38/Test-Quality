function canRenewSubscription(subscription, currentDate) {
  const {
    status,
    hasBeenRenewed,
    unpaidDebt,
    endDate,
  } = subscription;

  const isActive = status === 'active';
  const notRenewed = !hasBeenRenewed;
  const noDebt = !unpaidDebt;
  const datePassed = new Date(endDate) <= new Date(currentDate);

  if (!isActive || !notRenewed || !noDebt || !datePassed) return false;
  return true;
}






module.exports = { canRenewSubscription };
