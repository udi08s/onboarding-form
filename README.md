# QA Assignment: Onboarding Form Testing with Playwright

## Overview

This project contains a simple **React onboarding form**.
Your task is to write **end-to-end Playwright tests** that validate the form’s functionality, field validations, dropdowns, submission behavior, and user experience.

The tests you write will determine your score for this assignment.

## Form Fields

The onboarding form includes the following fields:

* **First Name** – required, minimum 2 characters
* **Last Name** – required, minimum 2 characters
* **Email Address** – required, valid email format
* **Phone Number** – required, valid Australian format (`+61 4XX XXX XXX` or `04XX XXX XXX`)
* **Date of Birth** – required, must be between 13 and 120 years old, not in the future
* **State** – required, must select from 8 Australian states/territories
* **Gender** – required, must select from 5 options
* **Company** – optional, minimum 2 characters if provided

## Your Task

* Implement Playwright tests in **`tests/onboarding-form.spec.js`**.
* Focus on writing **reliable, deterministic tests** that avoid flakiness.
* Cover **both positive and negative scenarios** for each validation rule.
* Use **stable locators** such as `getByLabel` and `getByRole`.

## Getting Started

### Install dependencies

```bash
npm i --legacy-peer-deps
```

### Build the app

```bash
npm run build
```

### Run the app

```bash
npm run start
```

App will be available at [http://localhost:3000](http://localhost:3000).

### Run Playwright tests

```bash
npx playwright test
```

### Generate test report

```bash
npx playwright show-report
```

## Test Implementation

### Architecture & Approach

This test suite follows best practices to ensure reliability and maintainability:

* **Page Object Model** - Encapsulates form interactions in `OnboardingForm.js` with stable locators using `getByLabel` and `getByRole`
* **Data-driven testing** - Centralised test data in JSON files separating valid and invalid scenarios
* **Nested test organisation** - Logical grouping using `describe` blocks for positive/negative scenarios and specific validation areas
* **Parameterised testing** - Efficient validation of multiple invalid inputs (phone formats, email patterns)

### Test Coverage

The implementation addresses all requirements from the task section:

**Positive Scenarios:**
* Complete form submission with all required fields
* Optional company field inclusion
* Boundary value testing for minimum valid inputs (2-character names, 13-year-old dates)

**Negative Scenarios:**
* Required field validation - empty submissions trigger proper error messages
* Format validation - invalid email patterns and phone number formats
* Length constraints - single character names and company fields under minimum
* Date restrictions - future dates and age limits (under 13, over 120)
* Dropdown validation - ensures all state and gender options are available

**Reliability Features:**
* Stable locators preventing test flakiness
* Comprehensive error message validation

Each validation rule specified in the form requirements has corresponding positive and negative test cases, ensuring thorough coverage of both happy path and edge case scenarios.

---

## Project Structure

```
├── app/                     # Next.js app code
├── components/              # Shared UI components
├── tests/
│   ├── data/
│   │   ├── testData.json           # Valid test data
│   │   └── negativeTestData.json   # Invalid test scenarios
│   ├── pages/
│   │   └── OnboardingForm.js       # Page Object Model
│   └── onboarding-form.spec.js     # Main test suite
├── package.json
├── playwright.config.js
└── README.md
```
