import React, {createContext, useState} from 'react';

export const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({children}) => {
  const [colorScheme, setColorScheme] = useState('dark');

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newColorScheme);
  };

  return (
    <ColorSchemeContext.Provider value={{colorScheme, toggleColorScheme}}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
