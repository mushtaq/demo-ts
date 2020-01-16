interface HttpLocation {
    connectionType: string;
    port: number;
}

interface AkkaLocation {
    connectionType: string;
    actorRefURI: string;
}

type TypedLocation = { HttpLocation: HttpLocation } | { AkkaLocation: AkkaLocation }

// ================== Test ============
function processLocation(loc: TypedLocation): string {
    if ("HttpLocation" in loc) return `Found HttpLocation ${loc.HttpLocation.port}`;
    if ("AkkaLocation" in loc) return `Found AkkaLocation, ${loc.AkkaLocation.actorRefURI}`;
    return assertUnreachable(loc)
}

function assertUnreachable(x: never): never {
    throw new Error("unreachable code");
}

let loc: TypedLocation = {
    "AkkaLocation": {
        "connectionType": "akka",
        "actorRefURI": "akka://test@192.168.1.7:52008/user/my-actor-3#-1169205431"
    }
};

console.log(processLocation(loc));
