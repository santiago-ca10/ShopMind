import { ThemeContext } from './theme.context';

function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;