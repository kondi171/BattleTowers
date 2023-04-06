import PlacementTile from '../classes/PlacementTile';
import worldData from './../worlds/desert.json';
const fillPlacementTiles = (ctx: CanvasRenderingContext2D) => {

  const tileSize = 64;
  const placementTiles: PlacementTile[] = [];
  const placementTilesData2D = [];

  for (let i = 0; i < worldData.levels[0].placementTiles.length; i += 20) {
    placementTilesData2D.push(worldData.levels[0].placementTiles.slice(i, i + 20));
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