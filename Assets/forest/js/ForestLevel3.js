(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("ForestLevel3",
{ "compressionlevel":-1,
 "height":12,
 "infinite":false,
 "layers":[
        {
         "data":[1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10,
            1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            9, 10, 9, 10, 9, 10, 2, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10,
            1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            9, 10, 9, 10, 9, 10, 2, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10],
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
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 19, 19, 19, 19, 19, 19, 8, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 6, 24, 17, 17, 17, 17, 17, 17, 22, 19, 8, 0,
            0, 0, 0, 0, 0, 0, 0, 6, 24, 17, 17, 6, 19, 19, 8, 17, 17, 17, 18, 0,
            0, 0, 0, 0, 0, 0, 6, 24, 17, 17, 6, 24, 0, 0, 22, 19, 8, 17, 18, 0,
            19, 19, 19, 19, 19, 19, 24, 17, 17, 6, 24, 0, 0, 0, 0, 0, 18, 17, 18, 0,
            17, 17, 17, 17, 17, 17, 17, 17, 6, 24, 0, 0, 0, 0, 0, 0, 18, 17, 18, 0,
            19, 19, 19, 19, 19, 19, 19, 19, 24, 0, 0, 0, 0, 0, 0, 0, 18, 17, 18, 0,
            0, 0, 0, 0, 0, 6, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 17, 18, 0,
            0, 0, 0, 0, 0, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 0,
            0, 0, 0, 0, 0, 18, 17, 6, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 0,
            0, 0, 0, 0, 0, 18, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 18, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":12,
         "id":2,
         "name":"Path",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 128, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 128, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":12,
         "id":3,
         "name":"Placement",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 106, 106, 106, 98, 98, 98, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97,
            106, 106, 98, 106, 0, 98, 98, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 98, 106, 106, 0, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98,
            0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 69,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 97, 107, 0, 0, 0, 77,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 88, 102, 103, 80, 0, 0, 0, 65,
            65, 66, 0, 0, 0, 0, 0, 0, 0, 0, 105, 105, 88, 110, 111, 80, 0, 0, 0, 73,
            73, 74, 69, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81,
            81, 82, 77, 78, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93,
            105, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81,
            105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 113, 0, 0, 123, 0, 97, 65, 66,
            105, 0, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 122, 0, 97, 0, 0, 73, 74],
         "height":12,
         "id":4,
         "name":"Details 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[73, 74, 69, 70, 0, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 0, 100, 73, 74,
            81, 82, 77, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 82,
            0, 0, 0, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 65,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73,
            0, 67, 68, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81,
            0, 75, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 75,
            0, 83, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69,
            87, 87, 0, 0, 0, 0, 0, 0, 0, 0, 67, 68, 0, 65, 66, 0, 0, 0, 0, 77,
            102, 103, 0, 0, 0, 0, 0, 0, 0, 0, 75, 76, 0, 73, 74, 0, 69, 70, 0, 0,
            110, 111, 0, 0, 0, 0, 0, 0, 0, 0, 83, 84, 0, 81, 82, 0, 77, 78, 0, 0],
         "height":12,
         "id":5,
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
         "id":6,
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
                         "x":-128,
                         "y":0
                        }, 
                        {
                         "x":-128,
                         "y":896
                        }, 
                        {
                         "x":418,
                         "y":893
                        }, 
                        {
                         "x":419,
                         "y":544
                        }, 
                        {
                         "x":1120,
                         "y":543
                        }, 
                        {
                         "x":1118,
                         "y":160
                        }, 
                        {
                         "x":992,
                         "y":159
                        }, 
                        {
                         "x":992,
                         "y":94
                        }, 
                        {
                         "x":672,
                         "y":94
                        }, 
                        {
                         "x":672,
                         "y":157
                        }, 
                        {
                         "x":609,
                         "y":157
                        }, 
                        {
                         "x":609,
                         "y":224
                        }, 
                        {
                         "x":544,
                         "y":224
                        }, 
                        {
                         "x":544,
                         "y":287
                        }, 
                        {
                         "x":482,
                         "y":287
                        }, 
                        {
                         "x":481,
                         "y":348
                        }, 
                        {
                         "x":-96,
                         "y":348
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
 "nextlayerid":7,
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