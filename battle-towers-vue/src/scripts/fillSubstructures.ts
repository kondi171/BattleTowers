import Substructure from '../classes/Substructure';

const fillSubstructures = (ctx: CanvasRenderingContext2D, scene: any) => {

  const tileSize = 64;
  const substructures: Substructure[] = [];
  const substructuresData2D = [];
  const worldData = scene.getCurrentWorldData();
  for (let i = 0; i < worldData.substructures.length; i += 20) {
    substructuresData2D.push(worldData.substructures.slice(i, i + 20));
  }
  substructuresData2D.forEach((row, y) => {
    row.forEach((symbol: number, x: number) => {
      if (symbol === 14) {
        substructures.push(new Substructure(ctx, { x: x * tileSize, y: y * tileSize }));
      }
    });
  });

  return substructures;
}

export default fillSubstructures;