# GeeksforGeeks Code Viewer

A beautiful React application to fetch and display code submissions from GeeksforGeeks CodeJudge API with syntax highlighting.

## Features

- 🎨 Modern and responsive UI with gradient design
- 🔍 Fetch code by entering the Code ID
- 🌈 Syntax highlighting for multiple languages (Java, Python, C++, C, JavaScript)
- 📊 Display code metadata (language, result status, ID)
- 📤 Show input and output data
- 🔢 Line numbers for better code readability
- ⚡ Fast and smooth animations

## How to Use

1. **Enter Code ID**: Type or paste the code ID from GeeksforGeeks (e.g., `HtCPiL7X1P`)
2. **Fetch Code**: Click the "Fetch Code" button or press Enter
3. **View Code**: The app will display:
   - Code metadata (language, result, ID)
   - Output (if available)
   - Input data (if available)
   - Formatted source code with syntax highlighting and line numbers

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Prism.js** - Syntax highlighting
- **CSS3** - Modern styling with gradients and animations

## API Endpoint

The app fetches code from:
```
https://codejudge.geeksforgeeks.org/get-status/{CODE_ID}
```

## Supported Languages

- Java
- Python
- C++
- C
- JavaScript

## Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## Project Structure

```
CodeVisualizer/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## License

MIT License - Feel free to use this project for learning and development purposes.

