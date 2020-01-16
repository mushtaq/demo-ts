"use strict";
function getProperty(o, propertyName) {
    return o[propertyName]; // o[propertyName] is of type T[K]
}
// ================== Test ============
function processLocation(loc) {
    let key = Object.keys(loc)[0];
    switch (key) {
        case "HttpLocation":
            return console.log(`Found HttpLocation ${dd(key).port}`);
        case "AkkaLocation":
            return console.log(`Found AkkaLocation, ${dd(key).actorRefURI}`);
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
