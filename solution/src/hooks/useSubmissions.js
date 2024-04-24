import { useState, useEffect } from 'react';

/**
 * Custom submissions hook
 * Handles new submissions, checks for duplicates, and caches submissions in localStorage.
 *
 * @returns {object} An object containing:
 *  - submissions (Array): The current list of submissions.
 *  - addSubmission (Function): Function to add a new submission, handles duplicates/validation.
 */
export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState(() => {
    // Load cached submissions from localStorage
    const cached = localStorage.getItem('submissions');
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    // Cache submissions to localStorage whenever they change
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  /**
   * Adds a new submission to the list if it's not a duplicate and if both name and location are valid.
   *
   * @param {object} submission - The new submission object containing name and location.
   * @param {boolean} isNameValid - Whether the name has passed validation.
   * @param {boolean} isLocationValid - Whether the location has passed validation.
   */
  const addSubmission = (submission, isNameValid, isLocationValid) => {
    if (!isNameValid || !isLocationValid) {
      console.error('Submission failed: Invalid name or location.');
      return;
    }

    const isDuplicate = submissions.some((sub) => sub.name === submission.name);
    if (!isDuplicate) {
      const updatedSubmissions = [...submissions, submission];
      setSubmissions(updatedSubmissions);
    } else {
      console.log('Duplicate submission:', submission.name);
    }
  };

  const checkNameAvailability = (name) => {
    return !submissions.some((sub) => sub.name === name);
  };

  return { submissions, addSubmission, checkNameAvailability };
};
