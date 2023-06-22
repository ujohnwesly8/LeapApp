/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import Styles from "./src/constants/themeColors";
import Colors from "./src/constants/colors";

export const ColorSchemeContext = React.createContext({
  colorScheme: "dark",
  toggleColorScheme: () => {},
  getContainerStyle: () => ({}),
  getTextInputStyle: () => ({}),
  getTextColor: () => ({}),
  getPlaceholderTextColor: () => ({}),
});

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState("dark");

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === "light" ? "dark" : "light"));
  };

  const getContainerStyle = () => {
    if (colorScheme === "dark") {
      return Styles.blacktheme;
    } else if (colorScheme === "light") {
      return Styles.whiteTheme;
    } else {
      return {}; // Return an empty object as a fallback
    }
  };

  const getTextInputStyle = () => {
    return colorScheme === "dark" ? Styles.cardColor : Styles.main;
  };

  const getTextColor = () => {
    return colorScheme === "dark" ? { color: "white" } : { color: "black" };
  };

  const getPlaceholderTextColor = () => {
    return colorScheme === "dark" ? Colors.Textinput : Colors.black;
  };

  const contextValue = useMemo(() => {
    return {
      colorScheme,
      toggleColorScheme,
      getContainerStyle,
      getTextInputStyle,
      getTextColor,
      getPlaceholderTextColor,
    };
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
