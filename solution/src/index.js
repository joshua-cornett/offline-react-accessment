import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Apply global styles.
import App from './App'; // Load the main application component.
import reportWebVitals from './utils/reportWebVitals'; // For monitoring performance.

/**
 * Initializes the root where the app will live.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Render the App to the DOM, kickstarting the magic.
 */
root.render(<App />);

/**
 * Optionally captures and reports performance metrics.
 * Good for keeping an eye on things, especially in production.
 */
reportWebVitals();
