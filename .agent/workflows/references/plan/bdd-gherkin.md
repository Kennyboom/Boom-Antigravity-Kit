# BDD Gherkin Templates v1.0

> Behavior-Driven Development templates.
> Convert user stories into executable test specs.
> Load this file via `view_file` when writing Acceptance Criteria.

---

## Gherkin Syntax Quick Reference

```gherkin
Feature: [Feature Name]
  As a [role]
  I want to [action]
  So that [benefit]

  Background:
    Given [shared precondition for all scenarios]

  Scenario: [Specific behavior description]
    Given [initial context/state]
    And [additional context if needed]
    When [action/trigger]
    And [additional action if needed]
    Then [expected outcome]
    And [additional verification]
    But [negative verification]
```

---

## Template 1: Authentication Feature

```gherkin
Feature: User Authentication
  As a registered user
  I want to log in securely
  So that I can access my account

  Background:
    Given the login page is loaded
    And the API server is running

  Scenario: Successful login with valid credentials
    Given a registered user with email "user@test.com"
    And the user has password "SecurePass123!"
    When the user enters email "user@test.com"
    And the user enters password "SecurePass123!"
    And the user clicks the "Login" button
    Then the user should be redirected to "/dashboard"
    And a JWT token should be stored in httpOnly cookie
    And the response status should be 200

  Scenario: Failed login with wrong password
    Given a registered user with email "user@test.com"
    When the user enters email "user@test.com"
    And the user enters password "WrongPassword"
    And the user clicks the "Login" button
    Then an error message "Invalid credentials" should appear
    And the user should remain on the login page
    And no JWT token should be issued
    And the failed attempt should be logged

  Scenario: Account lockout after excessive failures
    Given a registered user with email "user@test.com"
    And the user has 4 failed login attempts
    When the user enters wrong password again
    Then the account should be locked for 15 minutes
    And a message "Account locked" should appear
    And a security alert email should be sent
```

---

## Template 2: CRUD Operations

```gherkin
Feature: [Entity] Management
  As a [role]
  I want to manage [entities]
  So that [business value]

  # CREATE
  Scenario: Create [entity] with valid data
    Given the user is on the "[entity] creation" page
    And the user is authenticated as [role]
    When the user fills in [required fields]
    And the user clicks "Save"
    Then a new [entity] should be created
    And a success toast "Created successfully" should appear
    And the user should be redirected to the [entity] detail

  Scenario: Create [entity] with missing required field
    Given the user is on the "[entity] creation" page
    When the user leaves [required field] empty
    And the user clicks "Save"
    Then a validation error should appear on [field]
    And no [entity] should be created

  # READ
  Scenario: View [entity] list with pagination
    Given there are 25 [entities] in the database
    When the user navigates to the [entity] list page
    Then 10 [entities] should be displayed (page 1)
    And pagination controls should show "1 2 3"
    When the user clicks page "2"
    Then the next 10 [entities] should load

  # UPDATE
  Scenario: Update [entity] successfully
    Given an existing [entity] with id "123"
    And the user is on the edit page for [entity] "123"
    When the user changes [field] to [new value]
    And the user clicks "Update"
    Then the [entity] should be updated in database
    And a success toast should appear
    And the updated [field] should reflect [new value]

  # DELETE
  Scenario: Delete [entity] with confirmation
    Given an existing [entity] with id "123"
    When the user clicks "Delete" on [entity] "123"
    Then a confirmation dialog should appear
    When the user confirms deletion
    Then the [entity] should be removed
    And the list should refresh without the deleted item
```

---

## Template 3: E-Commerce / Payment

```gherkin
Feature: Shopping Cart
  As a customer
  I want to manage items in my cart
  So that I can purchase products

  Scenario: Add item to cart
    Given the product "Widget X" costs $29.99
    And the product has 5 units in stock
    When the customer clicks "Add to Cart"
    Then the cart count should show "1"
    And the cart total should show "$29.99"

  Scenario: Prevent adding out-of-stock item
    Given the product "Widget Y" has 0 units in stock
    Then the "Add to Cart" button should be disabled
    And a message "Out of Stock" should be visible
```

---

## Template 4: API Endpoint Testing

```gherkin
Feature: [Resource] API
  As an API consumer
  I want to interact with [resource] endpoints
  So that I can [purpose]

  Scenario: GET /api/[resource] returns list
    Given there are 5 [resources] in the database
    And the request has a valid auth token
    When I send a GET request to "/api/[resource]"
    Then the response status should be 200
    And the response body should contain 5 items
    And each item should have fields: [id, name, ...]

  Scenario: POST /api/[resource] creates new item
    Given a valid auth token with "write" permission
    When I send a POST request to "/api/[resource]"
    With body: { "name": "New Item", ... }
    Then the response status should be 201
    And the response should contain the created item with id

  Scenario: Unauthorized access returns 401
    Given no auth token is provided
    When I send a GET request to "/api/[resource]"
    Then the response status should be 401
    And the response body should contain "Unauthorized"
```

---

## Gherkin-to-Test Mapping

### Playwright (E2E)
```typescript
test.describe('User Authentication', () => {
  test('successful login', async ({ page }) => {
    // Given the login page is loaded
    await page.goto('/login');
    // When the user enters email
    await page.fill('[data-testid="email"]', 'user@test.com');
    // And enters password
    await page.fill('[data-testid="password"]', 'SecurePass123!');
    // And clicks Login
    await page.click('[data-testid="login-btn"]');
    // Then redirected to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### Jest (Unit/Integration)
```typescript
describe('createUser', () => {
  it('should create user with valid data', async () => {
    // Given valid user data
    const userData = { email: 'test@test.com', name: 'Test' };
    // When createUser is called
    const user = await createUser(userData);
    // Then user should be created
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
  });
});
```

---

## How to Use in AG-Kit Workflow

```
In /plan workflow:
1. For each feature, write Gherkin scenarios
2. Cover: Happy path, Error path, Edge cases
3. Use above templates as starting point (fill in [placeholders])

In /test workflow:
1. Convert Gherkin scenarios to test code
2. Each GIVEN = test setup/fixture
3. Each WHEN = action/function call
4. Each THEN = assertion/expect
5. Run tests, all must PASS
```

---

> 🔴 Every feature approved in /plan MUST have Gherkin scenarios.
> Scenarios without code = incomplete. Code without scenarios = untested.
