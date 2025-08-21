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

---

## Project Structure

```
├── app/                     # Next.js app code
├── components/              # Shared UI components
├── tests/
│   └── onboarding-form.spec.js   # Your Playwright test file
├── package.json
├── playwright.config.js
└── README.md
```
