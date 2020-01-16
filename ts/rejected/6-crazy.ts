interface HttpLocation {
    prefix: string;
    componentType: string;
    connectionType: string;
    port: number;
}

interface AkkaLocation {
    prefix: string;
    componentType: string;
    connectionType: string;
    actorRefURI: string;
}

type TypeName<T> =
    T extends "HttpLocation" ? HttpLocation :
        T extends "AkkaLocation" ? AkkaLocation :
            "object";

type TypedLocation = { HttpLocation: HttpLocation } | { AkkaLocation: AkkaLocation }

declare function dd<T extends String>(x: T): TypeName<T>;

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

let a: keyof TypedLocation;
// ================== Test ============
function processLocation(loc: any): void {
    let key = Object.keys(loc)[0];
    switch (key) {
        case "HttpLocation":
            return console.log(`Found HttpLocation ${dd(key).port}`);
        case "AkkaLocation":
            return console.log(`Found AkkaLocation, ${dd(key).actorRefURI}`);
    }
}

let loc: TypedLocation = {
    "AkkaLocation": {
        "prefix": "csw.hcd1",
        "componentType": "hcd",
        "connectionType": "akka",
        "actorRefURI": "akka: //test@192.168.1.7:52008/user/my-actor-3#-1169205431"
    }
};

processLocation(loc);
