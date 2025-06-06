import { test, expect } from '@playwright/test';

test('Formulaire de contact : soumission et confirmation', async ({ page }) => {
  // 1. Aller à la page de contact
  await page.goto('http://localhost:3000/contact');

  // 2. Remplir tous les champs
  await page.fill('input[name="name"]', 'Jean Dupont');
  await page.fill('input[name="email"]', 'jean.dupont@example.com');
  await page.fill('textarea[name="message"]', 'Bonjour, ceci est un message de test.');

  // 3. Cliquer sur "Envoyer"
  await page.click('button[type="submit"]');

  // 4. Vérifier que le message de confirmation apparaît
  await expect(page.locator('.confirmation-message')).toHaveText(/merci.*contacté/i);
});
