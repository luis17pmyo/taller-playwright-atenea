import { test, expect } from '@playwright/test';

test('T1-Verifcacion que los elementos sean visibles en la pagina de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name=firstName]')).toBeVisible();
  await expect(page.locator('input[name=lastName]')).toBeVisible();
  await expect(page.locator('input[name=email]')).toBeVisible();
  await expect(page.locator('input[name=password]')).toBeVisible();
  //await page.waitForTimeout(5000); -> es para esperar 5 segundos que la pagina carge
  //await expect(page.locator('button[type="submit"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
});


