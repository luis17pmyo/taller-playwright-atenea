import { test, expect } from '@playwright/test';
import { RegistarPage } from '../pages/registarPage';
//import testData from '../data/TestData.json';

let registarPage: RegistarPage;
test.beforeEach(async ({ page }) => {
  registarPage = new RegistarPage(page);
  await registarPage.visitarPaginaRegistro();
});

test('T1-Verifcacion que los elementos sean visibles en la pagina de registro', async ({ page }) => {
  await expect(registarPage.firstNameInput).toBeVisible();
  await expect(registarPage.lastNameInput).toBeVisible();
  await expect(registarPage.emailInput).toBeVisible();
  await expect(registarPage.passwordInput).toBeVisible();
  //await page.waitForTimeout(5000); -> es para esperar 5 segundos que la pagina carge
  //await expect(page.locator('button[type="submit"]')).toBeVisible();
  await expect(registarPage.registerButton).toBeVisible();
});

test('T2-Verificar que el boton de registro este inhabilitado', async ({ page }) => {
  await expect(registarPage.registerButton).toBeDisabled();
});

test('T3-Verificar que el boton de registro este habilitado al llenar el formulario', async ({ page }) => {
  await registarPage.llenarFormularioRegistro(testData.usuariosAsignado.firstName, testData.usuariosAsignado.lastName, testData.usuariosAsignado.email, testData.usuariosAsignado.password);
  await expect(registarPage.registerButton).toBeEnabled();
});

test('T4-verificar el direccionamiento al login', async ({ page }) => {
  await registarPage.loginHeaderButton.click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('T5-verificar el registro de un nuevo usuario', async ({ page }) => {
  await registarPage.clickenRegistroycompletarformulario('Luis', 'Depierola', 'luis.depierola'+Date.now().toString()+'@example.com', 'SecurePass456');
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('T6-verificar que no se pueda registrar con un coreo ya existente', async ({ page }) => {
  
  const uniqueEmail = "luis.depierola"+Date.now().toString()+"@example.com";
  await registarPage.clickenRegistroycompletarformulario('Luis', 'Depierola', uniqueEmail, 'SecurePass456');
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await registarPage.visitarPaginaRegistro();
  await registarPage.clickenRegistroycompletarformulario('Luis', 'Depierola', uniqueEmail, 'SecurePass456');
   await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});
