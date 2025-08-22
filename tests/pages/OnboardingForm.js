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

    // Error message locators
    this.firstNameRequiredError = page.getByText('First name is required');
    this.firstNameMinLengthError = page.getByText('First name must be at least 2 characters');
    this.lastNameRequiredError = page.getByText('Last name is required');
    this.lastNameMinLengthError = page.getByText('Last name must be at least 2 characters');
    this.emailRequiredError = page.getByText('Email is required');
    this.emailFormatError = page.getByText('Please enter a valid email address');
    this.phoneRequiredError = page.getByText('Phone number is required');
    this.phoneFormatError = page.getByText('Please enter a valid Australian phone number');
    this.dateOfBirthRequiredError = page.getByText('Date of birth is required');
    this.stateRequiredError = page.getByText('Please select your state');
    this.genderRequiredError = page.getByText('Please select your gender');
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

  async expectFieldError(fieldName) {
    const errorLocator = this[`${fieldName}RequiredError`];
    await expect(errorLocator).toBeVisible();
  }

  async expectAllRequiredFieldErrors() {
    await expect(this.firstNameRequiredError).toBeVisible();
    await expect(this.lastNameRequiredError).toBeVisible();
    await expect(this.emailRequiredError).toBeVisible();
    await expect(this.phoneRequiredError).toBeVisible();
    await expect(this.dateOfBirthRequiredError).toBeVisible();
    await expect(this.stateRequiredError).toBeVisible();
    await expect(this.genderRequiredError).toBeVisible();
  }

  async expectFirstNameMinLengthError() {
    await expect(this.firstNameMinLengthError).toBeVisible();
  }

  async expectLastNameMinLengthError() {
    await expect(this.lastNameMinLengthError).toBeVisible();
  }

  async expectEmailFormatError() {
    await expect(this.emailFormatError).toBeVisible();
  }

  async expectPhoneFormatError() {
    await expect(this.phoneFormatError).toBeVisible();
  }
}