import { Progress } from "../../types";

class Player {
  private life: number;
  private money: number;
  private score: number;
  private progress: Progress;

  constructor() {
    this.life = 10;
    this.money = 100;
    this.score = 0;
    this.progress = {
      wave: 1,
      level: 1,
      world: 1
    }
  }
}

export default Player;