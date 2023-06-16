import { useState, createContext } from "react";
import { GameResult } from "@/typescript/enums";
import { Log } from "@/typescript/types";
import useSound from "use-sound";
// @ts-ignore
import gameOverSoundtrack from '@/assets/audio/tracks/gameOverSoundtrack.wav';
// @ts-ignore
import winSoundtrack from '@/assets/audio/tracks/winSoundtrack.mp3';
// @ts-ignore
import menuSoundtrack from '@/assets/audio/tracks/menuSoundtrack.mp3';
import { PlayFunction } from "use-sound/dist/types";

export type AppContextType = {
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
  playMenu: PlayFunction,
  stopMenu: (id?: string | undefined) => void,
  playGameOver: PlayFunction,
  stopGameOver: (id?: string | undefined) => void
  playWin: PlayFunction,
  stopWin: (id?: string | undefined) => void
}
interface AppProviderProps {
  children: JSX.Element,
}

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const [playMenu, { stop: stopMenu }] = useSound(menuSoundtrack, {
    volume: 0.5,
    interrupt: true,
    loop: true,
  });
  const [playGameOver, { stop: stopGameOver }] = useSound(gameOverSoundtrack, {
    volume: 0.5,
    interrupt: true,
    loop: true,
  });
  const [playWin, { stop: stopWin }] = useSound(winSoundtrack, {
    volume: 0.5,
    interrupt: true,
    loop: true,
  });
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
        playMenu,
        stopMenu,
        playGameOver,
        stopGameOver,
        playWin,
        stopWin,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;