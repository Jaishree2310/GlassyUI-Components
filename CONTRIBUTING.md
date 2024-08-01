# Contributing to GlassyUI

Thank you for considering contributing to the GlassyUI project! We welcome contributions from the community and are grateful for your help in making this project better.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Setting Up Your Development Environment](#setting-up-your-development-environment)
4. [Creating a New Issue](#creating-a-new-issue)
5. [Working on an Issue](#working-on-an-issue)
6. [Submitting a Pull Request](#submitting-a-pull-request)
7. [Style Guides](#style-guides)

## Code of Conduct
Please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How to Contribute
### Reporting Bugs
If you find a bug, please report it by creating a new issue. Provide as much information as possible, including steps to reproduce the bug and any relevant screenshots.

### Suggesting Enhancements
We welcome suggestions for new features and enhancements. Please open an issue to discuss your idea before implementing it to ensure it aligns with the project's goals.

### Contributing Code
1. Look through the [open issues](https://github.com/Jaishree2310/GlassyUI-Components/issues) for tasks labeled with "good first issue" or "enhancement."
2. Comment on the issue to let others know you are working on it.
3. Fork the repository and create a new branch for your work.
4. Implement your changes following the project's coding standards and guidelines.
5. Submit a pull request for review.

## Setting Up Your Development Environment
1. **Fork the Repository:** Click the "Fork" button at the top right of the repository page.
2. **Clone Your Fork:** 
    ```bash
    git clone https://github.com/your-username/GlassyUI-Components.git
    cd GlassyUI-Components
    ```
3. **Install Dependencies:** 
    ```bash
    npm install
    ```
4. **Start the Development Server:**
    ```bash
    npm start
    ```

## Creating a New Issue
When creating a new issue, please provide the following information:
- **Title:** A brief description of the issue.
- **Description:** A detailed description of the issue or enhancement.
- **Steps to Reproduce:** For bugs, provide steps to reproduce the issue.
- **Screenshots:** Include any relevant screenshots.

## Working on an Issue
1. **Assign the Issue to Yourself:** Comment on the issue to let others know you are working on it.
2. **Create a New Branch:** 
    ```bash
    git checkout -b issue-#-description
    ```
3. **Make Your Changes:** Follow the project's coding standards and guidelines.
4. **Commit Your Changes:** 
    ```bash
    git commit -m "Fixes #issue_number: Brief description of the fix"
    ```
5. **Push Your Changes:** 
    ```bash
    git push origin issue-#-description
    ```

## Submitting a Pull Request
1. **Submit a Pull Request:** Go to the repository on GitHub and click the "New pull request" button.
2. **Provide a Description:** Include a detailed description of your changes and link to the issue being addressed.
3. **Wait for Review:** One of the maintainers will review your pull request and provide feedback.

## Style Guides
### Git Commit Messages
- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally.

### JavaScript Style Guide
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use ES6 syntax where applicable.
- Ensure your code passes all linting and formatting checks.

### CSS/SCSS Style Guide
- Use SCSS for styling.
- Follow the [BEM methodology](http://getbem.com/) for class naming.
- Keep styles modular and reusable.

### React Components
- Use functional components with hooks where possible.
- Ensure components are modular and reusable.
- Write unit tests for all components using a testing library such as Jest.

---

Thank you for contributing to GlassyUI! Your help is greatly appreciated, and we look forward to working with you.
