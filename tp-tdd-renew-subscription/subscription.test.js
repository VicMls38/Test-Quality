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


test('Dette impayée → "unpaidDebt"', () => {
  const sub = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: true,
    isTrial: false,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('unpaidDebt');
});


test('Essai gratuit → "trial"', () => {
  const sub = {
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: true,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('trial');
});


test('Date pas dépassée → "date"', () => {
  const sub = {
    status: 'active',
    endDate: '2025-06-10',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('date');
});



test('Champ manquant ou type invalide → "invalid"', () => {
  const sub = {
    status: 'active',
    // endDate est manquant
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  };
  const date = '2025-06-06';
  expect(getRenewalReason(sub, date)).toBe('invalid');
});



test('Performance : 1000 appels', () => {
  const subs = Array.from({ length: 1000 }, (_, i) => ({
    status: 'active',
    endDate: '2025-06-01',
    hasBeenRenewed: false,
    unpaidDebt: false,
    isTrial: false,
  }));

  const date = '2025-06-06';
  const results = subs.map(sub => getRenewalReason(sub, date));
  expect(results.every(r => r === 'OK')).toBe(true);
});
