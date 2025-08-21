import { test, expect } from "@playwright/test"
import { OnboardingFormPage } from './pages/OnboardingForm.js'

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
  let onboardingForm

  test.beforeEach(async ({ page }) => {
    onboardingForm = new OnboardingFormPage(page)
    await onboardingForm.goto()
  })

  test("should display all form fields", async ({ page }) => {
    // Verify all required and optional form fields are visible
    await onboardingForm.expectAllFieldsVisible()
  })

  test('should submit form successfully with all required fields', async ({ page }) => {
    // Fill personal information (required fields)
    await onboardingForm.fillPersonalInfo(validFormData)
    
    // Select dropdown options
    await onboardingForm.selectState('Victoria')
    await onboardingForm.selectGender('Male')
    
    // Submit form and verify success
    await onboardingForm.submitForm()
    await onboardingForm.expectSuccessMessage()
  })

  test('should submit form successfully including optional company field', async ({ page }) => {
    // Fill personal information (required fields)
    await onboardingForm.fillPersonalInfo(validFormData)
    
    // Fill optional company field
    await onboardingForm.fillCompany(validFormData.company)
    
    // Select dropdown options
    await onboardingForm.selectState('New South Wales')
    await onboardingForm.selectGender('Female')
    
    // Submit form and verify success
    await onboardingForm.submitForm()
    await onboardingForm.expectSuccessMessage()
  })
})

