(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("ForestLevel2",
{ "compressionlevel":-1,
 "height":12,
 "infinite":false,
 "layers":[
        {
         "data":[3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4,
            11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12,
            3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4,
            11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12,
            3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4,
            11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12,
            3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4,
            11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12,
            3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4,
            11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12,
            3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4,
            11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12, 11, 12],
         "height":12,
         "id":1,
         "name":"Background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 18, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            19, 19, 19, 19, 8, 18, 17, 18, 0, 0, 6, 19, 19, 19, 19, 19, 19, 19, 19, 8,
            17, 17, 17, 17, 18, 18, 17, 18, 0, 0, 18, 17, 17, 17, 17, 17, 17, 17, 17, 18,
            19, 19, 8, 17, 18, 18, 17, 18, 0, 0, 18, 17, 6, 19, 19, 19, 19, 8, 17, 18,
            0, 0, 18, 17, 18, 18, 17, 22, 19, 19, 24, 17, 18, 0, 0, 0, 0, 18, 17, 18,
            0, 0, 18, 17, 18, 18, 17, 17, 17, 17, 17, 17, 18, 0, 0, 0, 0, 18, 17, 18,
            0, 0, 18, 17, 18, 22, 19, 19, 19, 19, 19, 19, 24, 0, 0, 0, 0, 18, 17, 18,
            0, 0, 18, 17, 22, 19, 19, 19, 19, 19, 8, 0, 0, 6, 19, 19, 19, 24, 17, 18,
            0, 0, 18, 17, 17, 17, 17, 17, 17, 17, 18, 0, 0, 18, 17, 17, 17, 17, 17, 18,
            0, 0, 22, 19, 19, 19, 19, 19, 8, 17, 22, 19, 19, 24, 17, 6, 19, 19, 19, 24,
            0, 0, 0, 0, 0, 0, 0, 0, 18, 17, 17, 17, 17, 17, 17, 18, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 22, 19, 19, 19, 19, 19, 19, 24, 0, 0, 0, 0],
         "height":12,
         "id":3,
         "name":"Path",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65,
            0, 0, 0, 128, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81],
         "height":12,
         "id":4,
         "name":"Placement",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 68,
            103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 76],
         "height":12,
         "id":5,
         "name":"Details 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[106, 113, 108, 113, 98, 0, 0, 0, 0, 0, 109, 72, 109, 98, 87, 97, 95, 97, 87, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 97, 97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 85, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 97, 97, 97, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 69, 70, 0, 0, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 89, 0, 0,
            0, 77, 78, 0, 0, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 69, 70, 0],
         "height":12,
         "id":6,
         "name":"Details 2",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":7,
         "name":"Way",
         "objects":[
                {
                 "height":0,
                 "id":1,
                 "name":"",
                 "polyline":[
                        {
                         "x":0,
                         "y":0
                        }, 
                        {
                         "x":-138.5,
                         "y":160
                        }, 
                        {
                         "x":224.5,
                         "y":159
                        }, 
                        {
                         "x":224,
                         "y":542.5
                        }, 
                        {
                         "x":608,
                         "y":542
                        }, 
                        {
                         "x":608,
                         "y":671
                        }, 
                        {
                         "x":929,
                         "y":671
                        }, 
                        {
                         "x":929,
                         "y":543
                        }, 
                        {
                         "x":1183,
                         "y":543
                        }, 
                        {
                         "x":1184,
                         "y":158
                        }, 
                        {
                         "x":736,
                         "y":159.5
                        }, 
                        {
                         "x":736,
                         "y":352
                        }, 
                        {
                         "x":416,
                         "y":351.5
                        }, 
                        {
                         "x":417,
                         "y":-102.5
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":0,
                 "y":0
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":8,
 "nextobjectid":2,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.1",
 "tileheight":64,
 "tilesets":[
        {
         "firstgid":1,
         "source":"Background+Path.tsx"
        }, 
        {
         "firstgid":65,
         "source":"DetailsForest.tsx"
        }],
 "tilewidth":64,
 "type":"map",
 "version":"1.10",
 "width":20
});