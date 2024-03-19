# Playwright Test Automation for Mollyjogger E-commerce

<p>A demo project demonstrating automation of playwright tests.</p>

### Application Under Test

I am using (https://www.mollyjogger.com) as the Application Under Test.

## Installation 
Install the dependencies and devDependencies to run the test.

#### Install dependencies

```bash
npm install
npx playwright install / npm init playwright@latest
```

#### Run application 
Runs the end-to-end tests in headless mode
```bash
npx playwright test
```
Runs the end-to-end tests in browser
```bash
npx playwright test --headed 
```
Open HTML Report
```bash
npx playwright show-report
```
## Tests
E2E Test Case can be found in documentation/e2e_test_cases.md
