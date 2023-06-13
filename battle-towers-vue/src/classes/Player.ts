class Player {
  private life: number;
  private money: number;
  private score: number;

  constructor() {
    this.life = 1000;
    this.money = 100;
    this.score = 0;
  }

  public getLife() { return this.life; }
  public setLife(life: number) { this.life = life; }
  public getMoney() { return this.money; }
  public setMoney(money: number) { this.money = money; }
  public getScore() { return this.score; }
  public setScore(score: number) { this.score = score; }
}

export default Player;