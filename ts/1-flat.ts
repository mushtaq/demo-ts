interface HttpLocation {
    _type: "HttpLocation";
    connectionType: string;
    port: number;
}

interface AkkaLocation {
    _type: "AkkaLocation";
    connectionType: string;
    actorRefURI: string;
}

type TypedLocation = AkkaLocation | HttpLocation

// ================== Test ============
function processLocation(loc: TypedLocation): string {
    switch (loc._type) {
        case "HttpLocation":
            return `Found HttpLocation ${loc.port}`;
        case "AkkaLocation":
            return `Found AkkaLocation, ${loc.actorRefURI}`;
    }
}

let loc: TypedLocation = {
    "_type": "AkkaLocation",
    "connectionType": "akka",
    "actorRefURI": "akka: //test@192.168.1.7:52008/user/my-actor-3#-1169205431"
};

console.log(processLocation(loc));
