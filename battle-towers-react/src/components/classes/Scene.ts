import desertData from '../worlds/desert.json';
import desertLevel1 from './../../assets/img/worlds/desert/level1.png';
import desertLevel2 from './../../assets/img/worlds/desert/level2.png';

class Scene {
  private worlds = [
    {
      name: "Desert",
      maps: [desertLevel1, desertLevel2],
      data: desertData,
    }
  ];

  private world: number;
  private level: number;
  private wave: number;

  constructor() {
    this.world = 1;
    this.level = 1;
    this.wave = 1;
  }

  public getCurrentWorldData() {
    return this.worlds[this.world - 1].data[this.level - 1];
  }
  public getCurrentMap() {
    return this.worlds[this.world - 1].maps[this.level - 1];
  }
  public getWave() {
    return this.wave;
  }
  public setWave(wave: number) {
    this.wave = wave;
  }
  public getLevel() {
    return this.level;
  }
  public setLevel(level: number) {
    this.level = level;
  }
  public getWorld() {
    return this.world;
  }
  public setWorld(world: number) {
    this.world = world;
  }
  public getWorldName() {
    return this.worlds[this.world - 1].name;
  }
}

export default Scene;