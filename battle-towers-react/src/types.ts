import { LogType } from "./enums";

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
