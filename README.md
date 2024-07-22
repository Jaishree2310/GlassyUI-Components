
# Getting Started with Create React App

Live hosted [Glassy UI](https://glassyui.vercel.app/).

# GlassyUI

**GlassyUI** is a library of elegant and customizable UI components with a glassmorphism theme. Designed for modern web applications, GlassyUI offers a sleek, frosted glass effect to enhance your user interface with a touch of sophistication.

## Features

- **ProgressBar**: Customizable size, color, and progress percentage.
- **Buttons**: Adjustable colors, border radii, and opacities.
- **Input Fields**: Customizable background colors, text colors, and border properties.
- **Animated Progress Bar**: Smoothly transitions progress from 0% to 100%.
- **Popup**: Stylish popups with glassmorphism effect.
- **Textarea**: Customizable textareas with modern design elements.

## Installation

To get started with GlassyUI, you can install it via npm:

```bash
npm install glassy-ui
```

Or using yarn:

```bash
yarn add glassy-ui
```

## Usage

Here’s a quick example of how to use the components in your React application:

### ProgressBar

```jsx
import { ProgressBar } from 'glassy-ui';

function App() {
  return (
    <ProgressBar
      size="md"
      color="#fcfc00"
      progress={50}
    />
  );
}
```

### Buttons

```jsx
import { Button } from 'glassy-ui';

function App() {
  return (
    <Button
      color="blue"
      borderRadius={8}
      opacity={80}
    >
      Click Me
    </Button>
  );
}
```

### Input Fields

```jsx
import { InputField } from 'glassy-ui';

function App() {
  return (
    <InputField
      bgColor="#ffffff"
      textColor="#000000"
      borderColor="#cccccc"
    />
  );
}
```

### Animated Progress Bar

```jsx
import { AnimatedProgressBar } from 'glassy-ui';

function App() {
  return <AnimatedProgressBar />;
}
```

### Popup

```jsx
import { Popup } from 'glassy-ui';

function App() {
  return <Popup message="Hello, World!" />;
}
```

### Textarea

```jsx
import { Textarea } from 'glassy-ui';

function App() {
  return <Textarea placeholder="Type here..." />;
}
```

## Customization

GlassyUI components are highly customizable. You can adjust properties such as color, size, opacity, and more to fit your design needs.

## Contributing

We welcome contributions to improve GlassyUI! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [jaishrees23102001@gmail.com](mailto:jaishrees23102001@gmail.com).
