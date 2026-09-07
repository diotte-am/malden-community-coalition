# Quick-Start Guide

Follow these steps to set up and run the development environment on a fresh macOS installation.

## Prerequisites

Ensure you have **Homebrew** installed on your system to manage packages. You will also need **Python 3.x** installed to run the YouTube metadata automation script.

---

## Installation and Setup

### 1. Install Node.js
Install Node.js and npm (Node Package Manager) using Homebrew:
```bash
brew install node
```
*Note: You must completely close and reopen your terminal session after this finishes so your system recognizes the `npm` command.*

### 2. Install Frontend Dependencies
Navigate into your project folder and install the React framework and UI dependencies directly from the existing `package.json` file:
```bash
npm install
```

### 3. Initialize the Python Virtual Environment
Create an isolated Python environment to handle the automation script dependencies without polluting your global OS:
```bash
python3 -m venv venv
```
To ensure VS Code uses this environment:
1. Open the Command Palette (`Cmd + Shift + P`).
2. Search for and select **Python: Select Interpreter**.
3. Choose the option pointing to your new `('venv': venv)` directory.

### 4. Install Python Dependencies
Open a fresh terminal in VS Code and verify that `(venv)` appears at the start of your prompt line. Because this project does not currently use a `requirements.txt` file, manually install the necessary web request library:
```bash
pip install requests
```

---

## Running the Application

### Launch the Local UI
To start the Vite development server and view the React application locally, run:
```bash
npm run dev
```
Open the local address provided in the terminal (usually `http://localhost:5173`) in your web browser.
