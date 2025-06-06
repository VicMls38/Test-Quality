# Test info

- Name: Formulaire de contact : soumission et confirmation
- Location: /home/victor/Dev/test_logiciel/tp-e2e-playwright/tests/contact.spec.js:3:5

# Error details

```
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Please install them with the following command:      ║
║                                                      ║
║     sudo npx playwright install-deps                 ║
║                                                      ║
║ Alternatively, use apt:                              ║
║     sudo apt-get install libnss3\                    ║
║         libnspr4                                     ║
║                                                      ║
║ <3 Playwright Team                                   ║
╚══════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
>  3 | test('Formulaire de contact : soumission et confirmation', async ({ page }) => {
     |     ^ Error: browserType.launch: 
   4 |   // 1. Aller à la page de contact
   5 |   await page.goto('http://localhost:3000/contact');
   6 |
   7 |   // 2. Remplir tous les champs
   8 |   await page.fill('input[name="name"]', 'Jean Dupont');
   9 |   await page.fill('input[name="email"]', 'jean.dupont@example.com');
  10 |   await page.fill('textarea[name="message"]', 'Bonjour, ceci est un message de test.');
  11 |
  12 |   // 3. Cliquer sur "Envoyer"
  13 |   await page.click('button[type="submit"]');
  14 |
  15 |   // 4. Vérifier que le message de confirmation apparaît
  16 |   await expect(page.locator('.confirmation-message')).toHaveText(/merci.*contacté/i);
  17 | });
  18 |
```