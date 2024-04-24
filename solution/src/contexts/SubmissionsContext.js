import { createContext, useContext, useState, useEffect } from 'react';

const SubmissionsContext = createContext();

export const useSubmissions = () => useContext(SubmissionsContext);

export const SubmissionsProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState(() => {
    // Attempt to retrieve and parse stored submissions from localStorage
    const storedSubmissions = localStorage.getItem('submissions');
    return storedSubmissions ? JSON.parse(storedSubmissions) : [];
  });

  // Persist submissions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission) => {
    // Prevent duplicate submissions based on the name
    if (!submissions.some((sub) => sub.name === submission.name)) {
      setSubmissions([...submissions, submission]);
    } else {
      console.error('Duplicate submission:', submission.name);
    }
  };

  const clearSubmissions = () => {
    setSubmissions([]); // Clear the current state
    localStorage.removeItem('submissions'); // Remove the storage entry
  };

  const checkNameAvailability = (name) => {
    // Check if the name is already taken in the current submissions
    return !submissions.some((sub) => sub.name === name);
  };

  // Provide the state and functions via context
  return (
    <SubmissionsContext.Provider
      value={{
        submissions,
        addSubmission,
        checkNameAvailability,
        clearSubmissions,
      }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
};
