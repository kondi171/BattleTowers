import { useState, createContext } from "react";
import { GameResult, LogType } from "../enums";
import { Log } from "../types";

export interface AppContextType {
  isGameStart: boolean,
  setIsGameStart: (statement: boolean) => void,
  endGame: GameResult,
  setEndGame: (gameResult: GameResult) => void,
  wave: number,
  setWave: (waveNumber: number) => void,
  level: number,
  setLevel: (levelNumber: number) => void,
  world: string,
  setWorld: (worldName: string) => void,
  life: number,
  setLife: (life: number) => void,
  money: number,
  setMoney: (money: number) => void,
  score: number,
  setScore: (score: number) => void,
  logs: Log[],
  setLogs: (log: Log[]) => void,
}
type AppProviderProps = {
  children: JSX.Element,
}

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<GameResult>(GameResult.UNPLAYED);
  const [wave, setWave] = useState<number>(1);
  const [level, setLevel] = useState<number>(1);
  const [world, setWorld] = useState<string>('Desert');
  const [life, setLife] = useState<number>(10);
  const [money, setMoney] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [logs, setLogs] = useState<Log[]>([])
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
        setWorld,
        life,
        setLife,
        money,
        setMoney,
        score,
        setScore,
        logs,
        setLogs,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;