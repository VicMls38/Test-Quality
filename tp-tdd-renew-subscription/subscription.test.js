const { canRenewSubscription } = require('./subscription');

test('should return true when all conditions are met', () => {
  const subscription = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const today = '2025-06-06';
  expect(canRenewSubscription(subscription, today)).toBe(true);
});

test('Abonnement déjà renouvelé → false', () => {
  const subscription = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: true,
    unpaidDebt: false,
    isTrial: false,
  };
  const currentDate = '2025-06-06';
  expect(canRenewSubscription(subscription, currentDate)).toBe(false);
});
