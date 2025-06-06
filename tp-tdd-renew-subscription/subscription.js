function canRenewSubscription(subscription, currentDate) {
  const { hasBeenRenewed } = subscription;
  if (hasBeenRenewed) return false;
  return true;
}



module.exports = { canRenewSubscription };
