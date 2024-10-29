# Contributing to GlassyUI 🛡️

Thank you for considering contributing to the GlassyUI project! We welcome contributions from the community and are grateful for your help in making this project better.

<br>

# Code of Conduct 📃

Please read and adhere to our [Code of Conduct](https://github.com/Jaishree2310/GlassyUI-Components/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

<br>

# <h1 align="center">Star our Repository ⭐</h1>

### <div align = "center" style = "display:flex; justify-content:space-evenly; gap:100px;" > [![Stars](https://img.shields.io/github/stars/Jaishree2310/GlassyUI-Components?style=for-the-badge&logo=github)](https://github.com/Jaishree2310/GlassyUI-Components/stargazers) [![Forks](https://img.shields.io/github/forks/Jaishree2310/GlassyUI-Components?style=for-the-badge&logo=github)](https://github.com/Jaishree2310/GlassyUI-Components/network/members) [![Issues](https://img.shields.io/github/issues/Jaishree2310/GlassyUI-Components?style=for-the-badge&logo=github)](https://github.com/Jaishree2310/GlassyUI-Components/issues) [![PRs Open](https://img.shields.io/github/issues-pr/Jaishree2310/GlassyUI-Components?style=for-the-badge&logo=github)](https://github.com/Jaishree2310/GlassyUI-Components/pulls) [![PRs Closed](https://img.shields.io/github/issues-pr-closed/Jaishree2310/GlassyUI-Components?style=for-the-badge&logo=github&color=2cbe4e)](https://github.com/Jaishree2310/GlassyUI-Components/pulls?q=is%3Apr+is%3Aclosed)</div>

<br>

## Table of Contents
1. [Code of Conduct](#code-of-conduct-)
2. [Need Help With Basics](#need-help-with-the-basics-)
3. [Project Structure](#project-structure-)
4. [How to Contribute](#how-to-contribute)
5. [Setting Up Your Development Environment](#setting-up-your-development-environment-)
6. [Style Guides](#style-guides-️)
7. [Good Coding Practices](#good-coding-practices-)
8. [Help And Support](#for-help-and-support-)

<br>

# Need Help With The Basics? 🤔

If you're new to Git and GitHub, no worries! Here are some useful resources:

- [Forking a Repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repository](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to Create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting Started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources)

<br>

# Project Structure 📂

```bash
GLASSYUI-COMPONENTS/
├── .github/                  # GitHub-related configurations such as workflows, issue templates, etc
│   
├── .husky/                   # Some pre-committed files
│   
├── Images/                   # Contains images related to the project
│   
├── public/                   # Some core components of the project
│     
├── src/                      # All the typescripts and react related files
│   
├── .dockerignore            
│   
├── .eslintignore                    
│   
├── .gitignore                
│   
├── .prettierignore         
│   
├── .prettierrc                
│   
├── CODE_OF_CONDUCT.md        # Some rules for contributors
├──
├── CONTRIBUTING.md           # Instructions for the contributors
├──
├── docker-compose.yml          
├──                                
├── Dockerfile
├──           
├── eslint.config.mjs
├──
├── git
├──
├── package-lock.json              
├──
├── package.json                   
├──
├── postcss.config.js
├──
├── README.md                  # Some instructions related to the contributions
├──
├── tailwind.config.js
├──
├── tsconfig.json
```

<br>

# How to Contribute

## Creating a New Issue ⛏️

When creating a new issue, please provide the following information:

- **Title:** A brief description of the issue.
- **Description:** A detailed description of the issue or enhancement.
- **Steps to Reproduce:** For bugs, provide steps to reproduce the issue.
- **Screenshots:** Include any relevant screenshots.

## First Pull Request ✨

1. **Star this repository**
    Click on the top right corner marked as **Stars** at last.

2. **Fork this repository**
    Click on the top right corner marked as **Fork** at second last.

3. **Clone the forked repository**

```bash
git clone https://github.com/<your-github-username>/GlassyUI-Components.git
```
  
4. **Navigate to the project directory**

```bash
cd GlassyUI-Components
```

5. **Create a new branch**

```bash
git checkout -b <your_branch_name>
```

6. **To make changes**

```bash
git add .
```

7. **Now to commit**

```bash
git commit -m "add comment according to your changes or addition of features inside this"
```

8. **Push your local commits to the remote repository**

```bash
git push -u origin <your_branch_name>
```

9. **Create a Pull Request**

10. **Congratulations! 🎉 you've made your contribution**

## Alternatively, contribute using GitHub Desktop 🖥️

1. **Open GitHub Desktop:**
  Launch GitHub Desktop and log in to your GitHub account if you haven't already.

2. **Clone the Repository:**
- If you haven't cloned the project repository yet, you can do so by clicking on the "File" menu and selecting "Clone Repository."
- Choose the project repository from the list of repositories on GitHub and clone it to your local machine.

3. **Switch to the Correct Branch:**
- Ensure you are on the branch that you want to submit a pull request for.
- If you need to switch branches, you can do so by clicking on the "Current Branch" dropdown menu and selecting the desired branch.

4. **Make Changes:**
- Make your changes to the code or files in the repository using your preferred code editor.

5. **Commit Changes:**
- In GitHub Desktop, you'll see a list of the files you've changed. Check the box next to each file you want to include in the commit.
- Enter a summary and description for your changes in the "Summary" and "Description" fields, respectively. Click the "Commit to <branch-name>" button to commit your changes to the local branch.

6. **Push Changes to GitHub:**
- After committing your changes, click the "Push origin" button in the top right corner of GitHub Desktop to push your changes to your forked repository on GitHub.

7. **Create a Pull Request:**
- Go to the GitHub website and navigate to your fork of the project repository.
- You should see a button to "Compare & pull request" between your fork and the original repository. Click on it.

8. **Review and Submit:**
- On the pull request page, review your changes and add any additional information, such as a title and description, that you want to include with your pull request.
- Once you're satisfied, click the "Create pull request" button to submit your pull request.

9. **Wait for Review:**
Your pull request will now be available for review by the project maintainers. They may provide feedback or ask for changes before merging your pull request into the main branch of the project repository.

## Submitting a Pull Request 💾

1. **Submit a Pull Request:** Go to the repository on GitHub and click the "New pull request" button.
2. **Provide a Description:** Include a detailed description of your changes and link to the issue being addressed.
3. **Wait for Review:** One of the maintainers will review your pull request and provide feedback.

## Reporting Bugs 🐞

If you find a bug, please report it by creating a new issue. Provide as much information as possible, including steps to reproduce the bug and any relevant screenshots.

## Suggesting Enhancements 🌿

We welcome suggestions for new features and enhancements. Please open an issue to discuss your idea before implementing it to ensure it aligns with the project's goals.

## Contributing Code 🌸

1. Look through the [open issues](https://github.com/Jaishree2310/GlassyUI-Components/issues) for tasks labeled with "good first issue" or "enhancement."
2. Comment on the issue to let others know you are working on it.
3. Fork the repository and create a new branch for your work.
4. Implement your changes following the project's coding standards and guidelines.
5. Submit a pull request for review.

<br>

# Setting Up Your Development Environment 🔧

1. **Fork the Repository:** Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork:** 

    ```bash
    git clone https://github.com/your-username/GlassyUI-Components.git
    ```

    ```bash
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

<br>

# Style Guides ✍️

## Git Commit Messages
- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally.

## JavaScript Style Guide
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use ES6 syntax where applicable.
- Ensure your code passes all linting and formatting checks.

## CSS/SCSS Style Guide
- Use SCSS for styling.
- Follow the [BEM methodology](http://getbem.com/) for class naming.
- Keep styles modular and reusable.

## React Components
- Use functional components with hooks where possible.
- Ensure components are modular and reusable.
- Write unit tests for all components using a testing library such as Jest.

<br>

# Good Coding Practices 🧑‍💻

1. **Follow the Project's Code Style**

   - Maintain consistency with the existing code style (indentation, spacing, comments).
   - Use meaningful and descriptive names for variables, functions, and classes.
   - Keep functions short and focused on a single task.
   - Avoid hardcoding values; instead, use constants or configuration files when possible.

2. **Write Clear and Concise Comments**

   - Use comments to explain why you did something, not just what you did.
   - Avoid unnecessary comments that state the obvious.
   - Document complex logic and functions with brief explanations to help others understand your thought -process.

3. **Keep Code DRY (Don't Repeat Yourself)**

   - Avoid duplicating code. Reuse functions, methods, and components whenever possible.
   - If you find yourself copying and pasting code, consider creating a new function or component.

4. **Write Tests**

   - Write unit tests for your functions and components.
   - Ensure your tests cover both expected outcomes and edge cases.
   - Run tests locally before making a pull request to make sure your changes don’t introduce new bugs.

5. **Code Reviews and Feedback**

   - Be open to receiving constructive feedback from other contributors.
   - Conduct code reviews for others and provide meaningful suggestions to improve the code.
   - Always refactor your code based on feedback to meet the project's standards.

<br>

# For Help And Support 💬

- Admin Github Profile:- [Jaishree Singh](https://github.com/Jaishree2310)
- Contact :- [Email](jaishrees23102001@gmail.com)

<br>

# Thank you for contributing 💗

We truly appreciate your time and effort to help improve our project. Feel free to reach out if you have any questions or need guidance. Happy coding! 🚀

##