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

test('T2-Verificar que el boton de registro este inhabilitado', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('T3-Verificar que el boton de registro este habilitado al llenar el formulario', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Juan');
  await page.locator('input[name=lastName]').fill('Perez');
  await page.locator('input[name=email]').fill('juan@perez.com');
  await page.locator('input[name=password]').fill('Password123');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('T4-verificar el direccionamiento al login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('T5-verificar el registro de un nuevo usuario', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Luis');
  await page.locator('input[name=lastName]').fill('Depierola');
  const uniqueEmail = "luis.depierola"+Date.now().toString()+"@example.com";
  await page.locator('input[name=email]').fill(uniqueEmail);
  await page.locator('input[name=password]').fill('SecurePass456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('T6-verificar que no se pueda registrar con un coreo ya existente', async ({ page }) => {
  
  const uniqueEmail = "luis.depierola"+Date.now().toString()+"@example.com";
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Luis');
  await page.locator('input[name=lastName]').fill('Depierola');
  await page.locator('input[name=email]').fill(uniqueEmail);
  await page.locator('input[name=password]').fill('SecurePass456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Luis');
  await page.locator('input[name=lastName]').fill('Depierola');
  await page.locator('input[name=email]').fill(uniqueEmail);
  await page.locator('input[name=password]').fill('SecurePass456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});
