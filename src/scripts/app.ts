//#region Intersection types check.

interface Visible extends Touchable {
    color: string;
    height: number;
    width: number;
    alive: boolean;
}

type Touchable = {
    weight: number;
}

type Feel = {
    surface: string;
}

type BasicType1 = number | string;
type BasicType2 = string | boolean;

type Combination1 = Touchable & Feel;
type Combination2 = BasicType1 & BasicType2;
type Combination3 = Touchable & BasicType1; //????

const a: Combination1 = {
    weight: 30,
    surface: 'soft'
}

const b: Combination2 = 'Hello';

// #endregion.

//#region Classes check

class Cat implements Visible{
    color = 'black';
    height = 40;
    width = 20;
    alive = true;
    weight = 10;
}

class Human {
    constructor(public age: number, protected skin: string = 'white') {
    }
}

class Person extends Human {
    constructor(protected name: string) {
        super(25);
    }
    greeting(): void {
        console.log('Hello, my name is ' + this.name);
    }
}

class Man extends Person {
    height: number = 182;
}

const citizen = new Man('Victor');
citizen.greeting();
console.log(`I'm ${citizen.age} year old. My height is ${citizen.height} cm`);

//#endregion

//#region Index properties

interface AvailableServices {
    serviceId: number;
    [props: string]: number;
}

const phoneServicePack: AvailableServices = {
    serviceId: 1,
    calling: 50,
    internet: 100
}
/** Doesn't work */

// class MyServices implements AvailableServices {
//     serviceId = 1;
//     cleaning = 100
// }

//#endregion


//#region Nullish Coalescing

const falsyData = undefined;

const outputData = falsyData ?? 25; // Can also use "||", but '' will be falsy too. With ?? I can store ''. 

console.log(outputData);

//#endregion

//#region Check promise

const promise = new Promise<string> ((resolve, reject) => {
    setTimeout(() => {
        resolve('Nice!');
    }, 1000)
})

promise.then(data => {
    console.log(data);
});

console.log(promise);

//#endregion