import { Progress } from "../../types";

class Player {
  private life: number;
  private money: number;
  private score: number;
  private progress: Progress;

  constructor() {
    this.life = 2;
    this.money = 1000;
    this.score = 0;
    this.progress = {
      wave: 1,
      level: 1,
      world: 1
    }
  }

  public getLife() { return this.life; }
  public setLife(life: number) { this.life = life; }
  public getMoney() { return this.money; }
  public setMoney(money: number) { this.money = money; }
  public getScore() { return this.score; }
  public setScore(score: number) { this.score = score; }
}

export default Player;