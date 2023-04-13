import { useState, createContext } from "react";

export interface AppContextType {
  isGameStart: boolean,
  setIsGameStart: (statement: boolean) => void,
  endGame: boolean,
  setEndGame: (statement: boolean) => void,
  wave: number,
  setWave: (waveNumber: number) => void,
  level: number,
  setLevel: (levelNumber: number) => void,
  world: string,
  setWorld: (worldName: string) => void,
}
type AppProviderProps = {
  children: JSX.Element,
}

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [wave, setWave] = useState<number>(1);
  const [level, setLevel] = useState<number>(1);
  const [world, setWorld] = useState<string>('Desert');

  return (
    <AppContext.Provider
      value={{
        isGameStart,
        setIsGameStart,
        endGame,
        setEndGame,
        wave,
        setWave,
        level,
        setLevel,
        world,
        setWorld
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;