interface A1 {
    tag: "A1"
    prefixA: string
    b: B
    portA1: number
}

interface A2 {
    tag: "A2"
    prefixA: string
    b: B
    portA2: number
}

type A = A1 | A2

interface B1 {
    tag: "B1"
    prefixB: string
    portB1: number
}

interface B2 {
    tag: "B2"
    prefixB: string
    portB2: number
}

type B = B1 | B2

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

function flatten(input: any): A {
    const [[key, value]] = Object.entries(input);
    value.tag = key;
    return value
}

function flatten2(input: any): any {
    let keys = Object.keys(input);
    if (keys.length == 0) {
        console.log(input)
        return input
    }
    if (keys.length == 1) {
        let key = keys[0];
        let value = input[key];
        value.tag = key;
        return flatten2(value)
    }
    if (keys.length > 1) {
        demo(input, flatten2);
    }
}

console.log(flatten2(json));

let jj = {
    "a": 1,
    "b": 2
};

function demo(json: any, f: (a: any) => any): any {
    let keys = Object.keys(json);
    let map = keys.map(k => {
        console.log("key", k, json[k], Object.keys(json[k]));
        return [k, f(json[k])]
    });
    return Object.fromEntries(map)
}

// console.log(demo(jj, flatten2));


function isObject(value: any) {
    return (value && typeof value === 'object' && value.constructor === Object) == true;
}
