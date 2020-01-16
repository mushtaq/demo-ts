// direct mapping to CSW location models json representation
interface HttpLocationIR {
    HttpLocation: HTTPLocationClass;
}

interface HTTPLocationClass {
    prefix: string;
    componentType: string;
    connectionType: string;
    port: number;
}

interface AkkaLocationIR {
    AkkaLocation: AkkaLocationClass;
}

interface AkkaLocationClass {
    prefix: string;
    componentType: string;
    connectionType: string;
    actorRefURI: string;
}

// ===========================================

// tagged union representation of CSW location models
interface HTTPLocation {
    tag: "HttpLocation"
    HttpLocation: HTTPLocationClass;
}

interface AkkaLocation {
    tag: "AkkaLocation"
    AkkaLocation: AkkaLocationClass;
}
type TypedLocation = HTTPLocation | AkkaLocation

// =============================

function decodeLocation(loc: any): TypedLocation {
    if (instanceOfDummyHttpLocation(loc)) {
        return {
            tag: "HttpLocation",
            "HttpLocation":  loc.HttpLocation
        }
    } else if (instanceOfDummyAkkaLocation(loc)) {
        return {
            tag: "AkkaLocation",
            "AkkaLocation":  loc.AkkaLocation
        }
    }
    throw new Error('Unable to parse $loc');
}

function instanceOfDummyHttpLocation(object: any): object is HttpLocationIR {
    return 'HttpLocation' in object;
}

function instanceOfDummyAkkaLocation(object: any): object is AkkaLocationIR {
    return 'AkkaLocation' in object;
}

// ================== Test ============
function processLocation(loc: TypedLocation): void {
    switch (loc.tag) {
        case "HttpLocation": console.log(`Found HttpLocation ${ loc.HttpLocation.port }`); return
        case "AkkaLocation": console.log(`Found AkkaLocation, ${ loc.AkkaLocation.actorRefURI }`); return
    }
}

var myLocation: TypedLocation = decodeLocation({
        "AkkaLocation": {
            "prefix": "csw.hcd1",
            "componentType": "hcd",
            "connectionType": "akka",
            "actorRefURI": "akka: //test@192.168.1.7:52008/user/my-actor-3#-1169205431"
        }
    }
)

processLocation(myLocation)