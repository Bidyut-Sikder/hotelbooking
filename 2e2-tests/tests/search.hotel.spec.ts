import test, { expect } from "@playwright/test";

const URL = "http://localhost:5173";
test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator('[name="email"]').fill("bidyutsikder2001@gmail.com");
  await page.locator('[name="password"]').fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful.")).toBeVisible();
});

test("should show hotel search results ", async ({ page }) => {
  await page.goto(URL);
  await page.getByPlaceholder("Where are you going?").fill("Dhaka");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found. in Dhaka")).toBeVisible();
  await expect(page.getByText("test hotel updated bidyut")).toBeVisible();
});
