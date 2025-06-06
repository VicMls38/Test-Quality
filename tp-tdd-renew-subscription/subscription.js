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
  if (subscription.isTrial) return 'trial';
  if (new Date(subscription.endDate) > new Date(currentDate)) return 'date';
  return 'OK';
}










module.exports = { canRenewSubscription, getRenewalReason };
