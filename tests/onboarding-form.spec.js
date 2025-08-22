import { test, expect } from "@playwright/test"
import { OnboardingFormPage } from './pages/OnboardingForm.js'
import testData from './data/testData.json'

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
    await onboardingForm.fillPersonalInfo(testData.validFormData)

    // Select dropdown options
    await onboardingForm.selectState('Victoria')
    await onboardingForm.selectGender('Male')

    // Submit form and verify success
    await onboardingForm.submitForm()
    await onboardingForm.expectSuccessMessage()
  })

  test('should submit form successfully including optional company field', async ({ page }) => {
    // Fill personal information (required fields)
    await onboardingForm.fillPersonalInfo(testData.validFormData)

    // Fill optional company field
    await onboardingForm.fillCompany(testData.validFormData.company)

    // Select dropdown options
    await onboardingForm.selectState('New South Wales')
    await onboardingForm.selectGender('Female')

    // Submit form and verify success
    await onboardingForm.submitForm()
    await onboardingForm.expectSuccessMessage()
  })

  test('should accept minimum valid values - boundary testing', async ({ page }) => {
    // Fill personal information with minimum valid values
    await onboardingForm.fillPersonalInfo(testData.boundaryFormDataMinimum)
    
    // Select dropdown options
    await onboardingForm.selectState('Tasmania')
    await onboardingForm.selectGender('Other')
    
    // Submit form and verify success without errors
    await onboardingForm.submitForm()
    await onboardingForm.expectSuccessMessage()
  })

  test('should accept maximum valid values - boundary testing', async ({ page }) => {
    // Fill personal information with maximum valid values
    await onboardingForm.fillPersonalInfo(testData.boundaryFormDataMaximum)
    
    // Fill optional company field with maximum length
    await onboardingForm.fillCompany(testData.boundaryFormDataMaximum.company)
    
    // Select dropdown options
    await onboardingForm.selectState('Queensland')
    await onboardingForm.selectGender('Prefer not to say')
    
    // Submit form and verify success without errors
    await onboardingForm.submitForm()
    await onboardingForm.expectSuccessMessage()
  })
})

