import React, { createContext, useState, useContext } from 'react';

const SelectionsContext = createContext();

export function SelectionsProvider({ children }) {
  const [selections, setSelections] = useState({
    budget: 2000,
    housingType: '',
    bedrooms: '',
    utilities: [],
    location: ''
  });

  return (
    <SelectionsContext.Provider value={{ selections, setSelections }}>
      {children}
    </SelectionsContext.Provider>
  );
}

export function useSelections() {
  return useContext(SelectionsContext);
}