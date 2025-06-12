# Skymind

End-to-end testing project for the Skymind platform using [Playwright](https://playwright.dev/).

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Useful Commands](#useful-commands)
- [Contributing](#contributing)

## Overview

This repository contains automated tests for Skymind web application. The tests are written in TypeScript and use Playwright for browser automation.

## Project Structure

```
.
├── .env                      # Environment variables for test runs
├── playwright.config.ts      # Playwright configuration
├── global-setup.ts           # Global setup for authentication and filters state
├── tests/                    # Test suites
├── pages/                    # Page Object Models
├── fixtures/                 # Custom fixtures for Playwright
├── test-data/                # Static test data
└── README.md                 # Project documentation
```

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/maxpanki/skymind.git
   cd skymind
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
    - Copy text bellow to `.env` and fill in the required values:
     ```
     BASE_URL=https://your-app-url.com
     API_BASE_URL=https://your-api-url.com
     TEST_USERNAME=your_username
     TEST_PASSWORD=your_password
     ```
    - `BASE_URL` - The base URL of the Skymind web application.
    - `API_BASE_URL` - The base URL for API requests.
    - `TEST_USERNAME` - Username for authentication.
    - `TEST_PASSWORD` - Password for authentication.

## Running Tests

- **Run all tests:**
  ```sh
  npx playwright test
  ```

- **Run a specific test file:**
  ```sh
  npx playwright test tests/TableFilters.spec.ts
  ```

- **View HTML report:**
  ```sh
  npx playwright show-report
  ```
