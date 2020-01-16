function flatten(json: any): any {
    if (typeof json === "object") {
        if (json == null) return json;
        if (Array.isArray(json)) return json.map(flatten);
        const keys = Object.keys(json);
        if (keys.length == 0) return json;
        if (keys.length > 1) return flattenMembers(json);
        if (keys.length == 1) return flattenObject(json)
    } else {
        return json
    }
}

function flattenMembers(json: any): any {
    const keys = Object.keys(json);
    const entries = keys.map(k => [k, flatten(json[k])]);
    return Object.fromEntries(entries)
}


function flattenObject(json: any): any {
    const [[key, value]] = Object.entries(json);
    if (isPseudoObject(value)) {
        return {key: flatten(json)}
    }
    value.tag = key;
    return flatten(value)
}

function isPseudoObject(value: unknown): boolean {
    return Array.isArray(value) || value == null
}

let json: any = {
    "A1": {
        prefixA: "prefixA",
        b: {
            "B2": {
                prefixB: "prefixB",
                portB2: 200
            }
        },
        portA1: 100
    }
};

console.log(flatten(json));
