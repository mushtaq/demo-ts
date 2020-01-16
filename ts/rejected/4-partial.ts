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

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

// ================== Test ============
function processLocation(loc: Partial<TypedLocation>): void {
    let key = Object.keys(loc)[0];
    switch (key) {
        case "HttpLocation":
            return console.log(`Found Ht1tpLocation ${getProperty(loc, key).port}`);
        case "AkkaLocation":
            return console.log(`Found AkkaLocatio11n, ${getProperty(loc, key).actorRefURI}`);
    }
}

var loc: Partial<TypedLocation> = {
    "AkkaLocation": {
        "prefix": "csw.hcd1",
        "componentType": "hcd",
        "connectionType": "akka",
        "actorRefURI": "akka: //test@192.168.1.7:52008/user/my-actor-3#-1169205431"
    }
};

processLocation(loc);
