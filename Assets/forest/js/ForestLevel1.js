(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("ForestLevel1",
{ "compressionlevel":-1,
 "height":12,
 "infinite":false,
 "layers":[
        {
         "data":[1, 2, 1, 2, 1, 2, 1, 2, 4, 4, 4, 4, 1, 2, 1, 2, 1, 12, 1, 2,
            9, 3, 3, 10, 9, 10, 9, 10, 9, 10, 9, 10, 4, 10, 9, 10, 12, 10, 9, 10,
            3, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 12, 12, 1, 2, 1, 2,
            3, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 12, 12, 10, 9, 10, 9, 10,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 12, 12, 1, 2, 1, 2, 1, 2,
            3, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 12, 10, 9, 10, 9, 10, 9, 10,
            3, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            3, 3, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 11, 10, 9, 10,
            1, 3, 3, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 11, 11, 1, 2,
            9, 10, 3, 4, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 11, 9, 10,
            1, 2, 1, 4, 4, 4, 4, 4, 4, 2, 1, 2, 1, 2, 1, 2, 1, 11, 11, 2,
            9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 11, 10],
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
         "data":[0, 18, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 18, 17, 18, 0, 6, 19, 19, 19, 19, 19, 8, 0, 6, 19, 19, 19, 19, 19, 19,
            0, 18, 17, 18, 6, 24, 17, 17, 17, 17, 17, 18, 0, 18, 17, 17, 17, 17, 17, 17,
            0, 18, 17, 18, 18, 17, 17, 6, 19, 8, 17, 18, 0, 18, 17, 6, 19, 19, 19, 19,
            0, 18, 17, 18, 18, 17, 6, 24, 0, 18, 17, 18, 0, 18, 17, 18, 0, 0, 0, 0,
            0, 18, 17, 18, 18, 17, 18, 0, 0, 18, 17, 18, 0, 18, 17, 18, 0, 0, 0, 0,
            0, 18, 17, 18, 18, 17, 18, 0, 0, 18, 17, 18, 0, 18, 17, 18, 0, 0, 0, 0,
            0, 18, 17, 18, 18, 17, 18, 0, 0, 18, 17, 18, 6, 24, 17, 18, 0, 0, 0, 0,
            0, 18, 17, 22, 24, 17, 18, 0, 0, 18, 17, 18, 18, 17, 17, 18, 0, 0, 0, 0,
            0, 18, 17, 17, 17, 17, 18, 0, 0, 18, 17, 22, 24, 17, 6, 24, 0, 0, 0, 0,
            0, 22, 19, 19, 19, 19, 24, 0, 0, 18, 17, 17, 17, 17, 18, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 19, 19, 19, 19, 24, 0, 0, 0, 0, 0],
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
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 128, 0,
            0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":12,
         "id":3,
         "name":"Placement",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[97, 0, 0, 0, 96, 92, 93, 0, 0, 0, 0, 0, 73, 74, 0, 0, 0, 77, 78, 84,
            123, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 81, 82, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            98, 0, 0, 0, 0, 0, 0, 0, 107, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0,
            106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65,
            105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73,
            98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81,
            97, 0, 0, 0, 0, 0, 0, 65, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            123, 122, 121, 113, 0, 69, 70, 73, 74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102],
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
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 68,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 76,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 84,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 67, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                 "id":2,
                 "name":"",
                 "polyline":[
                        {
                         "x":0,
                         "y":0
                        }, 
                        {
                         "x":161.5,
                         "y":-174
                        }, 
                        {
                         "x":158,
                         "y":607
                        }, 
                        {
                         "x":351,
                         "y":607
                        }, 
                        {
                         "x":350,
                         "y":223
                        }, 
                        {
                         "x":416,
                         "y":223.5
                        }, 
                        {
                         "x":415.5,
                         "y":159
                        }, 
                        {
                         "x":671,
                         "y":158.5
                        }, 
                        {
                         "x":672,
                         "y":671.5
                        }, 
                        {
                         "x":864,
                         "y":671.5
                        }, 
                        {
                         "x":863.5,
                         "y":542
                        }, 
                        {
                         "x":928,
                         "y":542.5
                        }, 
                        {
                         "x":928,
                         "y":158.5
                        }, 
                        {
                         "x":1397.5,
                         "y":158.5
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
         "visible":false,
         "x":0,
         "y":0
        }],
 "nextlayerid":7,
 "nextobjectid":3,
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