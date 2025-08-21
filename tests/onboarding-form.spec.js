import { test, expect } from "@playwright/test"

// Test data for valid form submission
const validFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@mail.com',
  phone: '+61412345678',
  dateOfBirth: '1990-01-15',
  company: 'Acme Corp'
}

test.describe("Onboarding Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should display all form fields", async ({ page }) => {
    await expect(page.getByLabel("First Name *")).toBeVisible()
    await expect(page.getByLabel("Last Name *")).toBeVisible()
    await expect(page.getByLabel("Email Address *")).toBeVisible()
    await expect(page.getByLabel("Phone Number *")).toBeVisible()
    await expect(page.getByLabel("Date of Birth *")).toBeVisible()
    await expect(page.getByText('State *', { exact: true })).toBeVisible();
    await expect(page.getByText('Gender *', { exact: true })).toBeVisible();
    await expect(page.getByLabel("Company (Optional)")).toBeVisible()
    await expect(page.getByRole("button", { name: "Complete Profile" })).toBeVisible()
  })

  test('should submit form successfully with all required fields', async ({ page }) => {
    await page.getByLabel('First Name *').fill(validFormData.firstName)
    await page.getByLabel('Last Name *').fill(validFormData.lastName)
    await page.getByLabel('Email Address *').fill(validFormData.email)
    await page.getByLabel('Phone Number *').fill(validFormData.phone)
    await page.getByLabel('Date of Birth *').fill(validFormData.dateOfBirth)

    await page.getByRole('combobox').filter({ hasText: 'Select your state' }).click();
    await page.getByRole('option', { name: 'Victoria' }).click();

    await page.getByRole('combobox').filter({ hasText: 'Select your gender' }).click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();

    await page.getByRole('button', { name: 'Complete Profile' }).click()

    await expect(page.getByText('Welcome aboard!')).toBeVisible()
    await expect(page.getByText('Your profile has been created successfully. You can now start using the platform.')).toBeVisible()
  })

  test('should submit form successfully including optional company field', async ({ page }) => {
    await page.getByLabel('First Name *').fill(validFormData.firstName)
    await page.getByLabel('Last Name *').fill(validFormData.lastName)
    await page.getByLabel('Email Address *').fill(validFormData.email)
    await page.getByLabel('Phone Number *').fill(validFormData.phone)
    await page.getByLabel('Date of Birth *').fill(validFormData.dateOfBirth)
    await page.getByLabel('Company (Optional)').fill(validFormData.company)

    await page.getByRole('combobox').filter({ hasText: 'Select your state' }).click();
    await page.getByRole('option', { name: 'New South Wales' }).click();
    await page.getByRole('combobox').filter({ hasText: 'Select your gender' }).click();
    await page.getByRole('option', { name: 'Female', exact: true }).click();

    await page.getByRole('button', { name: 'Complete Profile' }).click()

    await expect(page.getByText('Welcome aboard!')).toBeVisible()
    await expect(page.getByText('Your profile has been created successfully. You can now start using the platform.')).toBeVisible()
  })
})
