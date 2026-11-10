# Sauce Demo Core User Operations Test Plan

## Application Overview

Explore and validate the five primary end-user operations on Sauce Demo (Swag Labs): signing in, discovering products, managing the cart, completing checkout, and ending a session. The observed application exposes a login page with published demo accounts, a six-item catalog with product details and sort choices, a shopping cart, a multi-step checkout, and menu-based logout. Each test is independent and starts in a fresh browser session with no saved cart or prior order; use the standard_user account (password: secret_sauce) except where a scenario specifically tests credentials or access control.

## Test Scenarios

### 1. 1. Sign in

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with a standard demo account

**File:** `tests/saucedemo/authentication/valid-login.spec.ts`

**Steps:**
  1. Starting state: open a fresh session at https://www.saucedemo.com with no existing authenticated session.
    - expect: The Swag Labs sign-in page is displayed with Username, Password, and Login controls.
  2. Enter standard_user as the username and secret_sauce as the password, then select Login.
    - expect: The user is authenticated and the Products catalog is displayed.
    - expect: The catalog contains six products and the cart badge is empty.

#### 1.2. Reject invalid and missing sign-in credentials

**File:** `tests/saucedemo/authentication/invalid-login.spec.ts`

**Steps:**
  1. Starting state: open the sign-in page in a fresh session. Enter standard_user and an incorrect password, then select Login.
    - expect: Authentication is denied and the user remains on the sign-in page.
    - expect: A visible error explains that the username or password is not accepted.
  2. Dismiss or replace the error, leave the username blank, enter secret_sauce, and select Login.
    - expect: Authentication is denied without navigating to the catalog.
    - expect: A visible validation error indicates that a username is required.

#### 1.3. Show the locked-out account error

**File:** `tests/saucedemo/authentication/locked-account.spec.ts`

**Steps:**
  1. Starting state: open the sign-in page in a fresh session. Enter locked_out_user and secret_sauce, then select Login.
    - expect: The user is not authenticated and remains on the sign-in page.
    - expect: A visible error indicates that this user has been locked out.

### 2. 2. Discover products

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse product details and sort the catalog

**File:** `tests/saucedemo/catalog/browse-and-sort.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session and open the Products catalog.
    - expect: All six product cards show a product name, description, price, and purchase control.
    - expect: The default sort order is Name (A to Z).
  2. Open the Sauce Labs Backpack product details.
    - expect: The product detail page identifies Sauce Labs Backpack and shows its description, $29.99 price, and Add to cart control.
  3. Return to the catalog and select Price (low to high) from Sort products.
    - expect: The catalog is reordered by ascending price, with Sauce Labs Onesie ($7.99) first and Sauce Labs Fleece Jacket ($49.99) last.
  4. Select Price (high to low) from Sort products.
    - expect: The catalog is reordered by descending price, with Sauce Labs Fleece Jacket ($49.99) first and Sauce Labs Onesie ($7.99) last.

#### 2.2. Add a product from the catalog

**File:** `tests/saucedemo/catalog/product-add.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session with an empty cart.
    - expect: The Products catalog is displayed and the cart badge is empty.
  2. Select Add to cart on the Sauce Labs Backpack product card.
    - expect: The cart badge shows 1.
    - expect: The Backpack control changes to Remove, preventing a duplicate add action for that item.

### 3. 3. Manage the shopping cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Review and remove cart items

**File:** `tests/saucedemo/cart/cart-items.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session and add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    - expect: The cart badge shows 2.
  2. Open the cart.
    - expect: The Your Cart page lists both selected products with the correct names and prices.
    - expect: Each item has quantity 1 and a Remove control; Continue Shopping and Checkout are available.
  3. Remove Sauce Labs Backpack from the cart.
    - expect: The Backpack is no longer listed, while the Bike Light remains.
    - expect: The cart badge updates to 1.
  4. Remove the remaining item.
    - expect: The cart is empty and the cart badge is cleared.
    - expect: No removed product remains in the cart.

#### 3.2. Continue shopping without losing cart contents

**File:** `tests/saucedemo/cart/continue-shopping.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session and add Sauce Labs Onesie to the cart.
    - expect: The cart badge shows 1.
  2. Open the cart and select Continue Shopping.
    - expect: The Products catalog is displayed.
    - expect: The cart still contains the Onesie and the badge still shows 1.

### 4. 4. Complete checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Require customer information before checkout can continue

**File:** `tests/saucedemo/checkout/required-information.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session, add one product, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed with First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields blank and select Continue.
    - expect: The checkout does not advance to the overview.
    - expect: A visible validation error indicates that First Name is required.
  3. Enter a first name only and select Continue.
    - expect: The checkout remains on the information step.
    - expect: A visible validation error indicates that Last Name is required.
  4. Enter a last name but leave Zip/Postal Code blank, then select Continue.
    - expect: The checkout remains on the information step.
    - expect: A visible validation error indicates that a postal code is required.

#### 4.2. Review totals and complete a purchase

**File:** `tests/saucedemo/checkout/complete-purchase.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session, add Sauce Labs Backpack to the cart, and proceed to Checkout: Your Information.
    - expect: The checkout information form is displayed.
  2. Enter Alex as First Name, Tester as Last Name, and 12345 as Zip/Postal Code, then select Continue.
    - expect: Checkout: Overview is displayed and includes the Backpack.
    - expect: Payment Information and Shipping Information are shown.
    - expect: For the Backpack, Item total is $29.99, Tax is $2.40, and Total is $32.39.
  3. Select Finish.
    - expect: Checkout: Complete! is displayed with a Thank you for your order! confirmation.
    - expect: The cart is empty and its badge is cleared.
  4. Select Back Home.
    - expect: The Products catalog is displayed and the completed order is not left in the cart.

#### 4.3. Cancel checkout without placing an order

**File:** `tests/saucedemo/checkout/cancel.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session, add one product, and proceed to the checkout information step.
    - expect: The checkout information form is displayed.
  2. Select Cancel.
    - expect: The user returns to the cart or catalog without seeing an order-complete confirmation.
    - expect: No order has been placed and the cart item remains available.

### 5. 5. End the session

**Seed:** `tests/seed.spec.ts`

#### 5.1. Log out and verify protected-page access

**File:** `tests/saucedemo/session/logout.spec.ts`

**Steps:**
  1. Starting state: sign in as standard_user in a fresh session and confirm that the Products catalog is visible.
    - expect: The authenticated catalog is displayed.
  2. Open the navigation menu and select Logout.
    - expect: The browser returns to the Swag Labs sign-in page.
    - expect: The authenticated catalog is no longer displayed.
  3. Navigate directly to https://www.saucedemo.com/inventory.html.
    - expect: The signed-out user is not granted access to the catalog and is returned to the sign-in page or shown the application's unauthenticated-access response.
