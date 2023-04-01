export type Position = {
  x: number,
  y: number
};

export type Bounding = {
  width: number,
  height: number
};

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export type Mouse = {
  x: number,
  y: number
};