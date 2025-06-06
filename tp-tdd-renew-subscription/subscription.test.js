const { canRenewSubscription, getRenewalReason } = require('./subscription');

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


test('Date non dépassée → false', () => {
  const subscription = {
    status: 'active',
    endDate: '2025-06-10',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const currentDate = '2025-06-06';
  expect(canRenewSubscription(subscription, currentDate)).toBe(false);
});



test('Statut non "active" → false', () => {
  const subscription = {
    status: 'canceled',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const currentDate = '2025-06-06';
  expect(canRenewSubscription(subscription, currentDate)).toBe(false);
});


test('Présence de dette impayée → false', () => {
  const subscription = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: true,
    isTrial: false,
  };
  const currentDate = '2025-06-06';
  expect(canRenewSubscription(subscription, currentDate)).toBe(false);
});


test('Essai gratuit → false', () => {
  const subscription = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: true,
  };
  const currentDate = '2025-06-06';
  expect(canRenewSubscription(subscription, currentDate)).toBe(false);
});


test('Limite exacte (endDate = currentDate) → true', () => {
  const subscription = {
    status: 'active',
    endDate: '2025-06-06',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const currentDate = '2025-06-06';
  expect(canRenewSubscription(subscription, currentDate)).toBe(true);
});


test('Renouvellement possible → "OK"', () => {
  const sub = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('OK');
});


test('Statut non actif → "status"', () => {
  const sub = {
    status: 'paused',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('status');
});


test('Déjà renouvelé → "alreadyRenewed"', () => {
  const sub = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: true,
    unpaidDebt: false,
    isTrial: false,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('alreadyRenewed');
});
