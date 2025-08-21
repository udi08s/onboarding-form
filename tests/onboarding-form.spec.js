import { test, expect } from "@playwright/test"

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
    await expect(page.getByLabel("Company (Optional)")).toBeVisible()
    await expect(page.getByRole("button", { name: "Complete Profile" })).toBeVisible()
  })
})
