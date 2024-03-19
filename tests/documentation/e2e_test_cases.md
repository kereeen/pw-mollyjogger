## Checkout E2E Test Cases

### Test Case 1: Verify Product Added to Cart and Successful Navigation to Checkout
**Description:** This test case verifies that a product is successfully added to the cart, and the user can navigate to the checkout page.

**Test Steps:**
1. Navigate to the website.
2. Hover over the "Shop" link in the navigation bar.
3. Click on the "SHOP ALL" link.
4. Click on the "Scrimshaw Knife Kit" product.
5. Click on the "Add to Cart" button.
6. Verify that the "Scrimshaw Knife Kit" is visible.
7. Verify that the "Lockback Knife" variant is visible.
8. Click on the "+" button to increase the quantity.
9. Click on the "Check Out" button.
10. Verify that the URL contains "/checkouts".
11. Verify that the order summary includes "Scrimshaw Knife Kit".
12. Verify that the cost summary displays the correct total price.

### Test Case 2: Verify Successful Multiple Products to Checkout
**Description:** This test case verifies that multiple products are successfully added to the cart, and the subtotal is calculated correctly.

**Test Steps:**
1. Navigate to the website.
2. Hover over the "Shop" link in the navigation bar.
3. Click on the "SHOP ALL" link.
4. Click on the "Scrimshaw Knife Kit" product.
5. Click on the "Add to Cart" button.
6. Click on the "Shop" link in the navigation bar.
7. Click on the "Civilian Conservation Corps Stickers" product.
8. Click on the "Add to Cart" button.
9. Verify that the "Civilian Conservation Corps Stickers" product is visible.
10. Verify that the "Scrimshaw Knife Kit" product is visible.
11. Verify that the "Lockback Knife" variant is visible.
12. Verify that the subtotal displays the correct total price for both products.