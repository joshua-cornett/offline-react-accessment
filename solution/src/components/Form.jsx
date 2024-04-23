// src/components/Form.jsx

import React from 'react';
import Name from './Name';
import Location from './Location';
import EntriesTable from './EntriesTable';

function Form() {
  return (
    <form>
      <Name />
      <Location />
      <div>
        <button type="button">Clear</button>
        <button type="submit">Add</button>
      </div>
      <EntriesTable />
    </form>
  );
}

export default Form;
