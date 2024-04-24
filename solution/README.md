# Project Name

This is something I built in pursuit of a front-end job with a certain tech company. It's a form application that provides dynamic form handling, real-time validation with visual feedback, and uses local storage for session persistence.

## Features

- Dynamic form handling
- Real-time asynchronus validation with visual feedback
- Custom dropdown component with accessibility considerations
- Local storage integration for session persistence
- Flashing animations for user input guidance

### Documentation

Navigate to the /docs directory after cloning the repository or open the HTML files in a browser to view the JSDocs-generated documentation for this project.

`open docs/index.html`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development, testing, or evaluation purposes.

### Prerequisites

`bash
node.js (https://nodejs.org)
npm (Node Package Manager, comes with node.js installation)`

### Installing

First, clone the repository:

`git clone https://github.com/joshua-cornett/offline-react-accessment.git
cd offline-react-accessment`

Install dependencies:

`npm install`

Start the development server:

`npm start`

This will run the application in development mode. Open http://localhost:3000 to view it in the browser.

### Usage

- **Empty Input** If you don't enter or select anything, the field will flash indicating a required action.
- **Name Input:** Enter a name in the input field. The field will validate the name as you type and indicate the validation status.
- **Location Select:** Choose a location from the dropdown. Note that it is custom :)
- **Submit:** Click the submit button once all fields are filled correctly. You shouldn't be able to unless the input is valid.
- **Clear:** Note that you can also clear the input and the submissions for a fresh start (you can also clear your cache and refresh, but this is easier).

```

```
