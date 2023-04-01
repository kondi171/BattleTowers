import { useState, createContext } from "react";

export interface AppContextType {
  isGameStart: boolean,
  setIsGameStart: (statement: boolean) => void,
  endGame: boolean,
  setEndGame: (statement: boolean) => void,
}
type AppProviderProps = {
  children: JSX.Element,
}

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isGameStart,
        setIsGameStart,
        endGame,
        setEndGame
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;