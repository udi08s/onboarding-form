import { test  } from "@playwright/test"
import { OnboardingFormPage } from './pages/OnboardingForm.js'
import testData from './data/testData.json'
import negativeTestData from './data/negativeTestData.json'

test.describe("Onboarding Form", () => {
  let onboardingForm

  test.beforeEach(async ({ page }) => {
    onboardingForm = new OnboardingFormPage(page)
    await onboardingForm.goto()
  })

  test.describe("Positive Scenarios", () => {
    test("should display all form fields", async ({ page }) => {
      // Verify all required and optional form fields are visible
      await onboardingForm.expectAllFieldsVisible()
    })

    test('should submit form successfully with all required fields', async ({ page }) => {
      // Fill personal information (required fields)
      await onboardingForm.fillPersonalInfo(testData.validFormData)

      // Select dropdown options
      await onboardingForm.selectState(testData.validFormData.state)
      await onboardingForm.selectGender(testData.validFormData.gender)

      // Submit form and verify success
      await onboardingForm.submitForm()
      await onboardingForm.expectSuccessMessage()
    })

    test('should submit form successfully including optional company field', async ({ page }) => {
      // Fill personal information (required fields)
      await onboardingForm.fillPersonalInfo(testData.validFormDataWithCompany)

      // Fill optional company field
      await onboardingForm.fillCompany(testData.validFormDataWithCompany.company)

      // Select dropdown options
      await onboardingForm.selectState(testData.validFormDataWithCompany.state)
      await onboardingForm.selectGender(testData.validFormDataWithCompany.gender)

      // Submit form and verify success
      await onboardingForm.submitForm()
      await onboardingForm.expectSuccessMessage()
    })

    test.describe("Boundary Value Testing", () => {
      test('should accept minimum valid values', async ({ page }) => {
        // Fill personal information with minimum valid values
        await onboardingForm.fillPersonalInfo(testData.boundaryFormDataMinimum)
        
        // Select dropdown options
        await onboardingForm.selectState(testData.boundaryFormDataMinimum.state)
        await onboardingForm.selectGender(testData.boundaryFormDataMinimum.gender)
        
        // Submit form and verify success without errors
        await onboardingForm.submitForm()
        await onboardingForm.expectSuccessMessage()
      })

      test('should accept maximum valid values', async ({ page }) => {
        // Fill personal information with maximum valid values
        await onboardingForm.fillPersonalInfo(testData.boundaryFormDataMaximum)
        
        // Fill optional company field with maximum length
        await onboardingForm.fillCompany(testData.boundaryFormDataMaximum.company)
        
        // Select dropdown options
        await onboardingForm.selectState(testData.boundaryFormDataMaximum.state)
        await onboardingForm.selectGender(testData.boundaryFormDataMaximum.gender)
        
        // Submit form and verify success without errors
        await onboardingForm.submitForm()
        await onboardingForm.expectSuccessMessage()
      })
    })

    test.describe("Dropdown Options Validation", () => {
      const states = testData.dropdownOptions.states

      states.forEach((state) => {
        test(`should be able to select state: ${state}`, async ({ page }) => {
          // Select each state option and verify it works
          await onboardingForm.selectState(state)
        })
      })

      const genders = testData.dropdownOptions.genders

      genders.forEach((gender) => {
        test(`should be able to select gender: ${gender}`, async ({ page }) => {
          // Select each gender option and verify it works  
          await onboardingForm.selectGender(gender)
        })
      })
    })
  })

  test.describe("Negative Scenarios", () => {
    test.describe("Required Field Validations", () => {
      test('should show error messages for empty form submission', async ({ page }) => {
        // Leave all fields empty and submit
        await onboardingForm.submitForm()
        
        // Verify error messages appear for all required fields
        await onboardingForm.expectAllRequiredFieldErrors()
      })

      test('should show error for missing first name', async ({ page }) => {
        // Fill all fields except first name
        await onboardingForm.fillPersonalInfo(negativeTestData.missingFirstName)
        await onboardingForm.selectState(negativeTestData.missingFirstName.state)
        await onboardingForm.selectGender(negativeTestData.missingFirstName.gender)
        
        // Submit form and verify first name error
        await onboardingForm.submitForm()
        await onboardingForm.expectFieldError('firstName')
      })

      test('should show error for missing last name', async ({ page }) => {
        // Fill all fields except last name
        await onboardingForm.fillPersonalInfo(negativeTestData.missingLastName)
        await onboardingForm.selectState(negativeTestData.missingLastName.state)
        await onboardingForm.selectGender(negativeTestData.missingLastName.gender)
        
        // Submit form and verify last name error
        await onboardingForm.submitForm()
        await onboardingForm.expectFieldError('lastName')
      })

      test('should show error for missing email', async ({ page }) => {
        // Fill all fields except email
        await onboardingForm.fillPersonalInfo(negativeTestData.missingEmail)
        await onboardingForm.selectState(negativeTestData.missingEmail.state)
        await onboardingForm.selectGender(negativeTestData.missingEmail.gender)
        
        // Submit form and verify email error
        await onboardingForm.submitForm()
        await onboardingForm.expectFieldError('email')
      })

      test('should show error for missing phone', async ({ page }) => {
        // Fill all fields except phone
        await onboardingForm.fillPersonalInfo(negativeTestData.missingPhone)
        await onboardingForm.selectState(negativeTestData.missingPhone.state)
        await onboardingForm.selectGender(negativeTestData.missingPhone.gender)
        
        // Submit form and verify phone error
        await onboardingForm.submitForm()
        await onboardingForm.expectFieldError('phone')
      })

      test('should show error for missing date of birth', async ({ page }) => {
        // Fill all fields except date of birth
        await onboardingForm.fillPersonalInfo(negativeTestData.missingDateOfBirth)
        await onboardingForm.selectState(negativeTestData.missingDateOfBirth.state)
        await onboardingForm.selectGender(negativeTestData.missingDateOfBirth.gender)
        
        // Submit form and verify date of birth error
        await onboardingForm.submitForm()
        await onboardingForm.expectFieldError('dateOfBirth')
      })
    })

    test.describe("First Name & Last Name Minimum Validation", () => {
      test('should show minimum character error for single character first name', async ({ page }) => {
        // Fill form with single character first name
        await onboardingForm.fillPersonalInfo(negativeTestData.singleCharacterFirstName)
        await onboardingForm.selectState(negativeTestData.singleCharacterFirstName.state)
        await onboardingForm.selectGender(negativeTestData.singleCharacterFirstName.gender)
        
        // Submit form and verify minimum character error
        await onboardingForm.submitForm()
        await onboardingForm.expectFirstNameMinLengthError()
      })

      test('should show minimum character error for single character last name', async ({ page }) => {
        // Fill form with single character last name
        await onboardingForm.fillPersonalInfo(negativeTestData.singleCharacterLastName)
        await onboardingForm.selectState(negativeTestData.singleCharacterLastName.state)
        await onboardingForm.selectGender(negativeTestData.singleCharacterLastName.gender)
        
        // Submit form and verify minimum character error
        await onboardingForm.submitForm()
        await onboardingForm.expectLastNameMinLengthError()
      })
    })

    test.describe("Email Validation", () => {
      test('should show format error for email without dot in domain', async ({ page }) => {
        // Fill form with invalid email format (no dot in domain)
        await onboardingForm.fillPersonalInfo(negativeTestData.invalidEmailNoDot)
        await onboardingForm.selectState(negativeTestData.invalidEmailNoDot.state)
        await onboardingForm.selectGender(negativeTestData.invalidEmailNoDot.gender)
        
        // Submit form and verify email format error
        await onboardingForm.submitForm()
        await onboardingForm.expectEmailFormatError()
      })
    })

    test.describe("Phone Validation", () => {
      const invalidPhoneNumbers = negativeTestData.invalidPhoneFormats.phoneNumbers

      invalidPhoneNumbers.forEach((phoneNumber) => {
        test(`should show format error for invalid phone: ${phoneNumber}`, async ({ page }) => {
          // Fill form with invalid phone number
          const testData = { ...negativeTestData.invalidPhoneFormats, phone: phoneNumber }
          await onboardingForm.fillPersonalInfo(testData)
          await onboardingForm.selectState(testData.state)
          await onboardingForm.selectGender(testData.gender)
          
          // Submit form and verify phone format error
          await onboardingForm.submitForm()
          await onboardingForm.expectPhoneFormatError()
        })
      })
    })

    test.describe("Date of Birth Validation", () => {
      test('should show error for future date of birth', async ({ page }) => {
        // Fill form with future date of birth
        await onboardingForm.fillPersonalInfo(negativeTestData.futureDateOfBirth)
        await onboardingForm.selectState(negativeTestData.futureDateOfBirth.state)
        await onboardingForm.selectGender(negativeTestData.futureDateOfBirth.gender)
        
        // Submit form and verify future date error
        await onboardingForm.submitForm()
        await onboardingForm.expectDateOfBirthFutureError()
      })

      test('should show error for too young age (under 13)', async ({ page }) => {
        // Fill form with date making user under 13 years old
        await onboardingForm.fillPersonalInfo(negativeTestData.tooYoungDateOfBirth)
        await onboardingForm.selectState(negativeTestData.tooYoungDateOfBirth.state)
        await onboardingForm.selectGender(negativeTestData.tooYoungDateOfBirth.gender)
        
        // Submit form and verify too young error
        await onboardingForm.submitForm()
        await onboardingForm.expectDateOfBirthTooYoungError()
      })

      test('should show error for too old age (over 120)', async ({ page }) => {
        // Fill form with date making user over 120 years old
        await onboardingForm.fillPersonalInfo(negativeTestData.tooOldDateOfBirth)
        await onboardingForm.selectState(negativeTestData.tooOldDateOfBirth.state)
        await onboardingForm.selectGender(negativeTestData.tooOldDateOfBirth.gender)
        
        // Submit form and verify too old error
        await onboardingForm.submitForm()
        await onboardingForm.expectDateOfBirthTooOldError()
      })
    })
  })
})

