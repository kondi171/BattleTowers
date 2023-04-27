import PlacementTile from '../classes/PlacementTile';
import Scene from '../classes/Scene';

const fillPlacementTiles = (ctx: CanvasRenderingContext2D, scene: Scene) => {

  const tileSize = 64;
  const placementTiles: PlacementTile[] = [];
  const placementTilesData2D = [];
  const worldData = scene.getCurrentWorldData();
  for (let i = 0; i < worldData.placementTiles.length; i += 20) {
    placementTilesData2D.push(worldData.placementTiles.slice(i, i + 20));
  }
  placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 14) {
        placementTiles.push(new PlacementTile(ctx, { x: x * tileSize, y: y * tileSize }));
      }
    });
  });

  return placementTiles;
}

export default fillPlacementTiles;