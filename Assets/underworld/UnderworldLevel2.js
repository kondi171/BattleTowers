(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("UnderworldLevel2",
{ "compressionlevel":-1,
 "height":12,
 "infinite":false,
 "layers":[
        {
         "data":[19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
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
         "data":[200, 200, 200, 200, 201, 0, 0, 0, 0, 0, 0, 199, 200, 200, 200, 200, 200, 200, 200, 201,
            212, 212, 212, 212, 213, 0, 0, 0, 0, 0, 0, 211, 212, 212, 212, 212, 212, 212, 212, 213,
            224, 224, 236, 212, 213, 0, 0, 0, 0, 0, 0, 211, 212, 235, 224, 224, 224, 236, 212, 213,
            0, 0, 211, 212, 213, 0, 199, 200, 200, 200, 200, 248, 212, 213, 0, 0, 0, 211, 212, 213,
            0, 0, 211, 212, 247, 200, 248, 212, 212, 212, 212, 212, 212, 213, 0, 0, 0, 211, 212, 213,
            0, 0, 211, 212, 212, 212, 212, 212, 235, 224, 224, 224, 224, 225, 0, 0, 0, 211, 212, 213,
            0, 0, 223, 224, 224, 224, 224, 224, 225, 0, 0, 0, 0, 0, 0, 0, 0, 211, 212, 213,
            0, 0, 0, 0, 199, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 201, 0, 211, 212, 213,
            0, 0, 0, 0, 211, 212, 212, 212, 212, 212, 212, 212, 212, 212, 212, 213, 0, 211, 212, 213,
            0, 0, 0, 0, 211, 212, 235, 224, 224, 224, 224, 224, 224, 236, 212, 247, 200, 248, 212, 213,
            0, 0, 0, 0, 211, 212, 213, 0, 0, 0, 0, 0, 0, 211, 212, 212, 212, 212, 212, 213,
            0, 0, 0, 0, 211, 212, 213, 0, 0, 0, 0, 0, 0, 223, 224, 224, 224, 224, 224, 225],
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
            0, 0, 0, 0, 0, 318, 0, 0, 0, 318, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            318, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 318, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            318, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 318, 0, 0, 0, 0, 318, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 282,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270, 271, 0, 0, 0, 0, 0, 0, 0, 294,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 282, 283, 0, 0, 0, 0, 0, 0, 0, 0],
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
         "data":[0, 0, 0, 0, 0, 0, 0, 284, 285, 0, 0, 277, 0, 0, 0, 0, 296, 297, 0, 227,
            0, 0, 0, 0, 0, 0, 0, 296, 297, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 202, 203, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270, 271, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 282, 283, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 294, 295, 0, 0,
            237, 238, 239, 0, 0, 265, 266, 267, 0, 0, 0, 217, 0, 219, 220, 262, 263, 264, 0, 272,
            249, 250, 251, 0, 0, 277, 278, 279, 0, 0, 0, 0, 0, 231, 232, 274, 275, 276, 0, 284,
            0, 217, 0, 230, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 286, 287, 288, 0, 296,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 298, 299, 300, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 289,
            214, 215, 0, 0, 0, 0, 0, 0, 0, 270, 271, 272, 273, 0, 0, 0, 0, 0, 0, 301],
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
                         "x":-256,
                         "y":0
                        }, 
                        {
                         "x":-256,
                         "y":960
                        }, 
                        {
                         "x":351.333333333333,
                         "y":960
                        }, 
                        {
                         "x":352.666666666667,
                         "y":546
                        }, 
                        {
                         "x":930,
                         "y":546.666666666667
                        }, 
                        {
                         "x":928.666666666667,
                         "y":676.666666666667
                        }, 
                        {
                         "x":1187,
                         "y":676
                        }, 
                        {
                         "x":1186.66666666667,
                         "y":95
                        }, 
                        {
                         "x":800.333333333333,
                         "y":94
                        }, 
                        {
                         "x":800,
                         "y":290
                        }, 
                        {
                         "x":480,
                         "y":290
                        }, 
                        {
                         "x":480,
                         "y":358
                        }, 
                        {
                         "x":223,
                         "y":356
                        }, 
                        {
                         "x":224,
                         "y":95
                        }, 
                        {
                         "x":-90,
                         "y":97
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
 "nextobjectid":2,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.0",
 "tileheight":64,
 "tilesets":[
        {
         "firstgid":1,
         "source":"tilesetFromDesert.tsx"
        }, 
        {
         "firstgid":197,
         "source":"UnderworldTileset.tsx"
        }],
 "tilewidth":64,
 "type":"map",
 "version":"1.10",
 "width":20
});