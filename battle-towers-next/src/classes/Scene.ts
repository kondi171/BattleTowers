import { StartingPoint } from '../../enums';

import desertData from '../resources/worlds/desert.json';
import forestData from '../resources/worlds/forest.json';
import underworldData from '../resources/worlds/underworld.json';

import desertLevel1 from './../assets/img/worlds/desert/level1.png';
import desertLevel2 from './../assets/img/worlds/desert/level2.png';
import desertLevel3 from './../assets/img/worlds/desert/level3.png';

import forestLevel1 from './../assets/img/worlds/forest/level1.png';
import forestLevel2 from './../assets/img/worlds/forest/level2.png';
import forestLevel3 from './../assets/img/worlds/forest/level3.png';

import underworldLevel1 from './../assets/img/worlds/underworld/level1.png';
import underworldLevel2 from './../assets/img/worlds/underworld/level2.png';
import underworldLevel3 from './../assets/img/worlds/underworld/level3.png';

class Scene {
  private worlds = [
    {
      name: "Desert",
      maps: [desertLevel1, desertLevel2, desertLevel3],
      data: desertData,
      startingPoint: [StartingPoint.LEFT, StartingPoint.LEFT, StartingPoint.TOP],
    },
    {
      name: "Forest",
      maps: [forestLevel1, forestLevel2, forestLevel3],
      data: forestData,
      startingPoint: [StartingPoint.TOP, StartingPoint.LEFT, StartingPoint.BOTTOM],
    },
    {
      name: "Underworld",
      maps: [underworldLevel1, underworldLevel2, underworldLevel3],
      data: underworldData,
      startingPoint: [StartingPoint.RIGHT, StartingPoint.BOTTOM, StartingPoint.RIGHT],
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

  public getCurrentWorldData() { return this.worlds[this.world - 1].data[this.level - 1]; }
  public getCurrentMap() { return this.worlds[this.world - 1].maps[this.level - 1].src; }
  public getMaps() { return this.worlds[this.world - 1].maps; }
  public getCurrentStartingPoint() { return this.worlds[this.world - 1]?.startingPoint[this.level - 1]; }
  public getWave() { return this.wave; }
  public setWave(wave: number) { this.wave = wave; }
  public getLevel() { return this.level; }
  public setLevel(level: number) { this.level = level; }
  public getWorld() { return this.world; }
  public setWorld(world: number) { this.world = world; }
  public getWorldName() { return this.worlds[this.world - 1].name; }
  public getWorldsLength() { return this.worlds.length; }
}

export default Scene;