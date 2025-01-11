import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173/";


// User Register test
test("should allow the user to Register", async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("link", { name: "Register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator('[name="firstName"]').fill("Bidyut");
  await page.locator('[name="lastName"]').fill("sikder");
  await page.locator('[name="email"]').fill("bidyutsikder2001@gmail.com");
  await page.locator('[name="password"]').fill("123456");
  await page.locator('[name="confirmPassword"]').fill("123456 ");

  await page.getByRole('button',{name:'Create Account'}).click()

  await expect(page.getByText("Registration successful.")).toBeVisible()
  await expect(page.getByRole("button",{name:'SignOut'})).toBeVisible()

});





//getByRole targets html element
test("should allow the user to sign in", async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator('[name="email"]').fill("bidyutsikder2001@gmail.com");
  await page.locator('[name="password"]').fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful.")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SignOut" })).toBeVisible();
  await expect(page.getByText("My Bookings")).toBeVisible();
});

//sign out test
test("should allow the user to sign out", async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator('[name="email"]').fill("bidyutsikder2001@gmail.com");
  await page.locator('[name="password"]').fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("button", { name: "SignOut" }).click();

  await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
});
