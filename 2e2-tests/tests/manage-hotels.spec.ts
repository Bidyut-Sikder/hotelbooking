import { test, expect } from "@playwright/test";
import path from "path";

const URL = "http://localhost:5173";

// for signin purpose
test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator('[name="email"]').fill("bidyutsikder2001@gmail.com");
  await page.locator('[name="password"]').fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful.")).toBeVisible();
});

//add-hotel test
// test("should allow user to add a hotel", async ({ page }) => {
//   await page.goto(`${URL}/add-hotel`);
//   await page.locator('[name="name"]').fill("test hotel");
//   await page.locator('[name="city"]').fill("test Dhaka");
//   await page.locator('[name="country"]').fill("test Bangladesh");
//   await page.locator('[name="description"]').fill("test description");
//   await page.locator('[name="pricePerNight"]').fill("200");

//   await page.selectOption('select[name="starRating"]', "3");
//   console.log(path.join(__dirname, "tests_files", "test1.png"));
//   await page.getByText("Budget").click();
//   await page.getByLabel("Free Wifi").check();
//   await page.locator('[name="adultCount"]').fill("2");
//   await page.locator('[name="childCount"]').fill("2");
//   await page.setInputFiles('[name="imageFiles"]', [
//     path.join(__dirname, "test_files", "test1.png"),
//     path.join(__dirname, "test_files", "test2.png"),
//   ]);

//   await page.getByRole("button", { name: "Save" }).click();
//   await expect(page.getByText("Hotel added successfully")).toBeVisible({
//     timeout: 10000,
//   });
// });

//get-hotels
// test("should display hotels", async ({ page }) => {
//   await page.goto(`${URL}/my-hotels`);

//   await expect(page.getByText("My Hotels")).toBeVisible();
//   await expect(
//     page.getByText(
//       "An event handler is a block of code or a function that executes in response to a specific"
//     )
//   ).toBeVisible();
//   //add hotels data.to make sure that hotels are displayed
// });

// // Edit hotel
test("should edit hotels", async ({ page }) => {
  await page.goto(`${URL}/my-hotels`);

  await expect(page.getByText("My Hotels")).toBeVisible();
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await page.locator('[name="name"]').fill("test hotel updated bidyut");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel updated successfully")).toBeVisible();

  //add hotels data.to make sure that hotels are displayed
});
