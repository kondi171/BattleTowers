import { LogType } from "./enums";

export type Resolution = {
  width: number,
  height: number
};

export type Position = {
  x: number,
  y: number
};

export type Bounding = {
  width: number,
  height: number,
  radius: number
};

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export type Mouse = {
  x: number,
  y: number
};

export type Wave = {
  number: number,
  enemies: {

  }
}

export type Log = {
  content: string,
  type: LogType,
  time: string
}

export type Frames = {
  max: number,
  current: number,
  elapsed: number,
  hold: number
}

export type TowerData = {
  name: string;
  levels: {
    level: number;
    damage: number;
    money: number;
    speed: number;
  }[];
}

export type TowerStats = {
  name: string | undefined;
  level: number | undefined;
  damage: number | undefined;
  money: number | undefined;
  speed: number | undefined;
  image: string | undefined;
}