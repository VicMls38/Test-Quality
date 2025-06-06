function canRenewSubscription(subscription, currentDate) {
  const {
    status,
    hasBeenRenewed,
    unpaidDebt,
    isTrial,
    endDate,
  } = subscription;

  const isActive = status === 'active';
  const notRenewed = !hasBeenRenewed;
  const noDebt = !unpaidDebt;
  const notTrial = !isTrial;
  const datePassed = new Date(endDate) <= new Date(currentDate);

  return isActive && notRenewed && noDebt && notTrial && datePassed;
}


function getRenewalReason(subscription, currentDate) {
  if (subscription.status !== 'active') return 'status';
  if (subscription.hasBeenRenewed) return 'alreadyRenewed';
  if (subscription.unpaidDebt) return 'unpaidDebt';
  return 'OK';
}










module.exports = { canRenewSubscription, getRenewalReason };
