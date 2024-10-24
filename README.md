# 🌟 GlassyUI-Components

### **Live Demo:** [GlassyUI](https://glassyui.vercel.app)

Welcome to **GlassyUI-Components**! This open-source library features stunning React components designed with a captivating glassmorphism effect, perfect for giving your web applications a modern and sleek design.


## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Features](#Features)
- [Components](#components)
- [Tech Stack](#tech-stack)
- [Website Preview](#WebsitePreview)
- [Prerequisites](#Prerequisites)
- [Installation with docker](#Installationwithdocker)
- [Installation without docker](#Installationwithoutdocker)
- [Changelog](#Changelog)
- [Usage](#Usage)
- [Future Enhancements / Roadmap](#future-enhancements--roadmap)
- [Contributing](#contributing)
- [Contribution Rule](#ContributionRule)
- [Code of Conduct](#code-of-conduct)
- [Our Contributors](#our-contributors)

## Project Overview

This open-source library features stunning React components designed with a captivating glassmorphism effect, perfect for giving your web applications a modern and sleek design.


<img src="https://raw.githubusercontent.com/alo7lika/GlassyUI-Components/refs/heads/main/Images/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

### This project is now OFFICIALLY accepted for

<div align="center">
  <img src="https://raw.githubusercontent.com/alo7lika/GlassyUI-Components/refs/heads/main/Images/329829127-e79eb6de-81b1-4ffb-b6ed-f018bb977e88.png" alt="GSSoC 2024 Extd" width="80%">
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/alo7lika/GlassyUI-Components/refs/heads/main/Images/hacktober.png" alt="Hacktober fest 2024" width="80%">
</div>

<br>

<img src="https://raw.githubusercontent.com/alo7lika/GlassyUI-Components/refs/heads/main/Images/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
<table align="center">
    <thead align="center">
        <tr style="border: 2px;">
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Closed PRs</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/Jaishree2310/GlassyUI-Components?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/Jaishree2310/GlassyUI-Components?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/Jaishree2310/GlassyUI-Components?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/Jaishree2310/GlassyUI-Components?style=flat&logo=github"/></td>
            <td><img alt="Closed Pull Requests" src="https://img.shields.io/github/issues-pr-closed/Jaishree2310/GlassyUI-Components?style=flat&color=green&logo=github"/></td>
        </tr>
    </tbody>
</table>

## ✨ Features

- Glassmorphism-themed React components
- Customizable styles with SCSS
- Beginner-friendly and easy to contribute
- Modular and reusable components

## 🛠️ Components

- **Buttons:** Various button styles with glassmorphism effect.
- **ProgressBar:** Animated progress bars with a glassy look.
- **Input Fields:** Sleek input fields styled with glassmorphism.
- **Textareas:** Stylish textareas with a glassy touch.
- **Modals:** Elegant modals featuring the glassmorphism effect.
- **Navigation Bar:** Modern navigation bars with a glassy theme.

## 🛠️ Tech Stack

- **React**: JavaScript library for building user interfaces.
- **SCSS**: A CSS preprocessor for more manageable styles.
- **Docker**: For containerization and easy deployment.
- **Node.js**: JavaScript runtime for server-side development.

  
## 🖥️ Website Preview

![Home Page](https://github.com/user-attachments/assets/f6f73936-ca0d-4232-a646-67189f5aa901)
![Components](https://github.com/user-attachments/assets/472a38eb-73dc-459a-95ce-e5b3684cb74d)
![Button](https://github.com/user-attachments/assets/3fa878f6-735c-4a21-8cfc-edb74ba1052a)

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

### Installation with docker

1. **clone the repository:**

```bash
git clone https://github.com/Jaishree2310/GlassyUI-Components.git
cd GlassyUI-Components
```

2. **Run Docker compose File:**

```bash
docker compose up
```

### Installation without docker

1. **Clone the Repository:**

```bash
git clone https://github.com/Jaishree2310/GlassyUI-Components.git
cd GlassyUI-Components
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Start the Development Server**:

```bash
npm start
```

4. Open your browser and go to `http://localhost:3000` to see the components in action.

---

## 📜 Changelog

All notable changes to this project will be documented in this file.

### [Unreleased]

- **Added**: A new button component with hover effects.
- **Changed**: Updated SCSS styles for improved responsiveness.
- **Fixed**: Resolved an issue with the modal not closing properly on mobile devices.

### [1.0.0] - 2024-10-15

- **Added**: Initial release of GlassyUI-Components.
  - Features glassmorphism-themed buttons, progress bars, input fields, text areas, modals, and navigation bars.
- **Improved**: Documentation and examples for each component.
- **Fixed**: Minor bugs in the button component.

---

## 📝 Usage

Import the desired component into your React project and use it as follows:

```jsx
import { GlassyButton } from 'glassyui';

function App() {
  return (
    <div className='App'>
      <GlassyButton>Click Me</GlassyButton>
    </div>
  );
}
```

## 🚀 Future Enhancements / Roadmap

| Feature/Improvement               | Description                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 🎨 **Theme Customization**        | Allow users to customize the glassmorphism effect with different colors and opacities.                    |
| ♿ **Accessibility Improvements** | Ensure all components are fully accessible to users with disabilities.                                    |
| ➕ **Additional Components**      | Introduce new components such as dropdowns, tooltips, and tabs.                                           |
| ⚡ **Performance Optimization**   | Optimize the library for faster load times and better performance.                                        |
| 📚 **Documentation Expansion**    | Provide comprehensive guides and examples for each component to facilitate easier usage and contribution. |

---

## 🤝 **Contributing**

We welcome contributions to make this library even better! Here are a few steps to help you get started:

1. **Fork the Repository**: Create your own copy of the repository.

2. **Create a Branch**: For your feature or bug fix.

```bash
git checkout -b my-feature-branch
```

3. **Make Changes**: Implement your feature or fix.

4. **Commit** Your Changes:

```bash
git commit -m "Add my feature"
```

5. **Push** to the Branch:

```bash
git push origin my-feature-branch
```

6. **Open a Pull Request**: Submit your changes for review.

## Contribution Rule

-Please ask for issue assignment before raising any PR.

-If more than 1 week issue is not resolved then it will be assigned to someone else.

### Code of conduct:
- This README structure includes all the sections you wanted.
- Adjust the contributors section as needed based on your actual contributors.
- Feel free to add or modify any content to better fit your project’s specific needs!

-Important Rule for Creating component to follow the order of component.

1. Basic Usage
2. Props
3.Customizable component
4. Theme (of your new component)
5. Example
6. Copy code

-for eg: Button component,Progress Bar components


## Our Contributors

- We truly appreciate your incredible contributions to this project! Your dedication and hard work are vital to its continued growth and success. If you’ve found value in it, don’t forget to show your support by giving our repository a star! ⭐

<div align="center">
  <h2>Contributors</h2>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px; margin: auto;">
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/Jaishree2310">
        <img src="https://avatars.githubusercontent.com/u/1?v=4" alt="Jaishree2310" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>Jaishree2310</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/Sawan-Kushwah">
        <img src="https://avatars.githubusercontent.com/u/2?v=4" alt="Sawan-Kushwah" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>Sawan-Kushwah</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/Gauravtb2253">
        <img src="https://avatars.githubusercontent.com/u/3?v=4" alt="Gauravtb2253" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>Gauravtb2253</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/alo7lika">
        <img src="https://avatars.githubusercontent.com/u/4?v=4" alt="alo7lika" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>alo7lika</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/hritika2409">
        <img src="https://avatars.githubusercontent.com/u/5?v=4" alt="hritika2409" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>hritika2409</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/AdityaInnovates">
        <img src="https://avatars.githubusercontent.com/u/6?v=4" alt="AdityaInnovates" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>AdityaInnovates</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/neeru24">
        <img src="https://avatars.githubusercontent.com/u/7?v=4" alt="neeru24" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>neeru24</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/haseebzaki-07">
        <img src="https://avatars.githubusercontent.com/u/8?v=4" alt="haseebzaki-07" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>haseebzaki-07</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/gurliv21">
        <img src="https://avatars.githubusercontent.com/u/9?v=4" alt="gurliv21" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>gurliv21</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/abhishekHegde2000">
        <img src="https://avatars.githubusercontent.com/u/10?v=4" alt="abhishekHegde2000" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>abhishekHegde2000</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/NazTM">
        <img src="https://avatars.githubusercontent.com/u/11?v=4" alt="NazTM" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>NazTM</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/kodeCraze">
        <img src="https://avatars.githubusercontent.com/u/12?v=4" alt="kodeCraze" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>kodeCraze</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/masabinhok">
        <img src="https://avatars.githubusercontent.com/u/13?v=4" alt="masabinhok" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>masabinhok</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/Ameerjafar">
        <img src="https://avatars.githubusercontent.com/u/14?v=4" alt="Ameerjafar" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>Ameerjafar</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/devxMani">
        <img src="https://avatars.githubusercontent.com/u/15?v=4" alt="devxMani" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>devxMani</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/ashish-um">
        <img src="https://avatars.githubusercontent.com/u/16?v=4" alt="ashish-um" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>ashish-um</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/VAmanjain">
        <img src="https://avatars.githubusercontent.com/u/17?v=4" alt="VAmanjain" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>VAmanjain</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/lakshmirajvagu">
        <img src="https://avatars.githubusercontent.com/u/18?v=4" alt="lakshmirajvagu" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>lakshmirajvagu</p>
      </a>
    </div>
    <div style="text-align: center; border: 2px solid #ccc; border-radius: 10px; padding: 10px;">
      <a href="https://github.com/knighthinata">
        <img src="https://avatars.githubusercontent.com/u/19?v=4" alt="knighthinata" style="width: 100px; height: 100px; border-radius: 50%;" />
        <p>knighthinata</p>
      </a>
    </div>
  </div>
</div>



---
## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## ⭐ Give it a Star!

If you enjoy using GlassyUI-Components and find it helpful, **please give it a star**! Your support encourages further development and improvement.
