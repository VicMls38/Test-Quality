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
  try {
    const {
      status,
      hasBeenRenewed,
      unpaidDebt,
      isTrial,
      endDate
    } = subscription;

    if (
      typeof status !== 'string' ||
      typeof hasBeenRenewed !== 'boolean' ||
      typeof unpaidDebt !== 'boolean' ||
      typeof isTrial !== 'boolean' ||
      typeof endDate !== 'string'
    ) return 'invalid';

    if (status !== 'active') return 'status';
    if (hasBeenRenewed) return 'alreadyRenewed';
    if (unpaidDebt) return 'unpaidDebt';
    if (isTrial) return 'trial';
    if (new Date(endDate) > new Date(currentDate)) return 'date';

    return 'OK';
  } catch {
    return 'invalid';
  }
}











module.exports = { canRenewSubscription, getRenewalReason };
