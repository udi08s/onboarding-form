import { expect } from '@playwright/test';

export class OnboardingFormPage {
  constructor(page) {
    this.page = page;

    // Form field locators
    this.firstNameInput = page.getByLabel('First Name *');
    this.lastNameInput = page.getByLabel('Last Name *');
    this.emailInput = page.getByLabel('Email Address *');
    this.phoneInput = page.getByLabel('Phone Number *');
    this.dateOfBirthInput = page.getByLabel('Date of Birth *');
    this.companyInput = page.getByLabel('Company (Optional)');

    // Dropdown locators
    this.stateDropdown = page.getByRole('combobox').filter({ hasText: 'Select your state' });
    this.genderDropdown = page.getByRole('combobox').filter({ hasText: 'Select your gender' });

    // Button locators
    this.submitButton = page.getByRole('button', { name: 'Complete Profile' });

    // Success message locators
    this.successTitle = page.getByText('Welcome aboard!');
    this.successMessage = page.getByText('Your profile has been created successfully. You can now start using the platform.');

    // Label locators for visibility checks
    this.stateLabel = page.getByText('State *', { exact: true });
    this.genderLabel = page.getByText('Gender *', { exact: true });
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillPersonalInfo(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.dateOfBirthInput.fill(data.dateOfBirth);
  }

  async selectState(stateName) {
    await this.stateDropdown.click();
    await this.page.getByRole('option', { name: stateName }).click();
  }

  async selectGender(genderName) {
    await this.genderDropdown.click();
    await this.page.getByRole('option', { name: genderName, exact: true }).click();
  }

  async fillCompany(companyName) {
    await this.companyInput.fill(companyName);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectAllFieldsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.dateOfBirthInput).toBeVisible();
    await expect(this.stateLabel).toBeVisible();
    await expect(this.genderLabel).toBeVisible();
    await expect(this.companyInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectSuccessMessage() {
    await expect(this.successTitle).toBeVisible();
    await expect(this.successMessage).toBeVisible();
  }
}