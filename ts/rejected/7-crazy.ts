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

interface TypedLocation {
    HttpLocation: HttpLocation
    AkkaLocation: AkkaLocation
}

type TypedLocation1 = { HttpLocation: HttpLocation } | { AkkaLocation: AkkaLocation }

// type DD = {
//     [K in keyof TypedLocation]: { k: TypedLocation[K] } |
// }

type TypeName<T> =
    T extends "HttpLocation" ? HttpLocation :
        T extends "AkkaLocation" ? AkkaLocation :
            "object";


declare function dd<T extends String>(x: T): TypeName<T>;

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

// type X<I> = { [k in keyof I]: { name: k; value: I[k]; } }[keyof I];
type X<I> = { [k in keyof I]: I[k] };
let ff: X<TypedLocation>;

// ================== Test ============
function processLocation(loc: Pick<TypedLocation, keyof TypedLocation>): void {
    console.log(loc);
    switch (loc.AkkaLocation) {
        case "HttpLocation":
            return console.log(`Found HttpLocation ${loc.value.port}`);
        case "AkkaLocation":
            return console.log(`Found AkkaLocation, ${loc.value.actorRefURI}`);
    }
}

let loc: Pick<TypedLocation, "AkkaLocation"> = {
    "AkkaLocation": {
        "prefix": "csw.hcd1",
        "componentType": "hcd",
        "connectionType": "akka",
        "actorRefURI": "akka: //test@192.168.1.7:52008/user/my-actor-3#-1169205431"
    }
};

processLocation(loc);
