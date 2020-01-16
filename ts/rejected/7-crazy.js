"use strict";
function getProperty(o, propertyName) {
    return o[propertyName]; // o[propertyName] is of type T[K]
}
// ================== Test ============
function processLocation(loc) {
    console.log(loc);
    switch (loc.name) {
        case "HttpLocation":
            return console.log(`Found HttpLocation ${loc.value.port}`);
        case "AkkaLocation":
            return console.log(`Found AkkaLocation, ${loc.value.actorRefURI}`);
    }
}
let loc = {
    "AkkaLocation": {
        "prefix": "csw.hcd1",
        "componentType": "hcd",
        "connectionType": "akka",
        "actorRefURI": "akka: //test@192.168.1.7:52008/user/my-actor-3#-1169205431"
    }
};
processLocation(loc);
