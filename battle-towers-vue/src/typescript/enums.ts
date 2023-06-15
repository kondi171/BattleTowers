export enum CanvasBounding {
  WIDTH = 1280,
  HEIGHT = 768,
}

export enum GameResult {
  UNPLAYED,
  WIN,
  DEFEAT
}

export enum StartingPoint {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}

export enum GamePart {
  WAVE = 'wave',
  LEVEL = 'level',
  WORLD = 'world',
  START = 'start'
}

export enum LogType {
  FAILURE,
  SUCCESS,
  INFO
}

export enum BattleJournalPage {
  ENEMIES,
  TOWERS,
  RULES
}

export enum Direction {
  LEFT,
  RIGHT
}

export enum HealthBarDivider {
  SOLDIER_ORC = 100,
  SCOUT_ORC = 50,
  WARRIOR_ORC = 200
}

export enum ContextMenu {
  NONE,
  NEW_TOWER,
  UPGRADE_TOWER,
}

export enum NewTower {
  CANNON,
  MINIGUN,
  MISSILE
}

export enum PlayFunction {
  PLAY,
  PAUSE,
}