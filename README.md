# InkFlow - Modern Blogging Platform

InkFlow is a modern, feature-rich blogging platform designed to empower writers, engage readers, and celebrate storytelling. Built with React, TypeScript, and Tailwind CSS, it provides a seamless experience for creating, sharing, and exploring content.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Key Components](#key-components)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Secure login and signup functionality.
- **Post Management**: Create, edit, delete, and like posts.
- **Rich Text Editor**: Write posts with Markdown support.
- **Commenting System**: Engage with readers through comments.
- **Responsive Design**: Optimized for all devices.
- **Dark Mode**: Toggle between light and dark themes.
- **Search and Explore**: Discover posts by tags or keywords.
- **Dashboard**: Manage your posts and account settings.
- **Featured Posts**: Highlight popular posts on the homepage.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/inkflow.git
   cd inkflow
   ```
2. Install dependencies:
    ```bash
    npm install
    or
    yarn install
    ```
3. Running the Application
    ```bash
    npm run dev
    or 
    yarn dev
    ```
4. Open your browser and navigate to http://localhost:5173
---

## Folder Structure

```
project/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Context providers for state management
│   ├── pages/            # Page components for routing
│   ├── services/         # API service functions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions and mock data
│   ├── index.css         # Global styles
│   └── App.tsx           # Main application component
├── public/               # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Build Tool**: Vite

---

## Key Components

- **Authentication**: Handles user login and signup.
- **Post Editor**: Rich text editor for creating posts.
- **Dashboard**: User interface for managing posts and settings.
- **Search**: Enables users to find posts by tags or keywords.

---

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
