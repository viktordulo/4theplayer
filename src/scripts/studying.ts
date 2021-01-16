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
// citizen.greeting();
// console.log(`I'm ${citizen.age} year old. My height is ${citizen.height} cm`);

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

// console.log(outputData);

//#endregion

//#region Check promise

const promise = new Promise<string> ((resolve, reject) => {
    setTimeout(() => {
        resolve('Nice!');
    }, 1000)
})

promise.then(data => {
    // console.log(data);
});

// console.log(promise);

//#endregion


//#region Generics

const person = Object.assign({name: 'Victor', age: 22}, {name: 'Lena'});

function greet<T>(value: T, counts: number) {
    for (let i = 0; i < counts; i++) {
        console.log(`Try ${i+1}: ${value}`);        
    }
}

function merge<T extends object, U extends object>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);
}
// greet('Hello', 2);
// greet(1999, 1);
// greet(person.name, 3);

const mergedObj = merge({name: 'Victor'}, ['Hello', 1, [123]]);
// console.log(mergedObj);

function findTheKey<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key]; 
}
// console.log(findTheKey({name: 'Victor'}, 'name'));

class ArrayStorage<T> {
    private data: T[] = [];

    addItem(value: T) {
        this.data.push(value);
    }

    removeItem(value: T) {
        this.data.splice(this.data.indexOf(value), 1);
    }

    showItems() {
        console.log([...this.data]);
    }

}

const storage = new ArrayStorage<number>();
storage.addItem(1);
storage.addItem(1);
storage.addItem(2);
storage.addItem(3);
storage.addItem(5);
storage.addItem(1);
storage.removeItem(1);
// storage.showItems();
/** Better not to use object type like this -> {name: '123', age: 123} 
 * Instead let's use -> person = {name: '123', age: 123}
 * storage.addItem(person) is much better
*/
const storage1 = new ArrayStorage<string>();
storage1.addItem('Hi');


const readonlyArray: Readonly<number[]> = [1,1,2,3,5,8,13,21];

interface Goal {
    title: string;
    description: string;
    deadline: Date;
}

function createGoal(title: string, description: string, dl: Date): Goal {
    const goal: Partial<Goal> = {};
    goal.title = title;
    goal.description = description;
    goal.deadline = dl;
    return <Goal>goal;
}

//#endregion

//#region Decorators

// Receiving error document is not defined, but works in JS.
// function Creator(text: string, element: string) {
//     return function(constructor: any) {
//         const hookedEl = document.getElementById(element);
//         const p = new constructor();
//         if (hookedEl) {
//             hookedEl.innerHTML = `<h4>${text} with the name ${p.name}</h4>`;
//         }
//     }
// }

// @Creator('Animal', 'paste')
class Animal {
    name = "Nuras";
    age = 5;
    constructor() {
        console.log('Animal created');
    }
}

/** We can use decorators not only for classes, but also for properties, accessors, methods, method arguments. */

/**  Used for class as previous one @see Creator() 
 * This executes when the class just exist in the code.
 * But we can make it executes when the instance creates. @see Logger1().
*/
function Logger() {
    return function(constructor: any) {
        const construct = new constructor();
        console.log(construct.name);
    }
}

// Executes when we creates the instance of the class.
// This new class substitute the original functions!
function Logger1() {
    return function<T extends { new (...args: any[]): {name: string} }>(constructorOriginal: T) {
        return class extends constructorOriginal {
            constructor(...args: any[]) {
                super();
                const element = document.getElementById('paste');
                let c = new constructorOriginal();
                if (element) {
                    element.innerHTML = args[0];
                }
            }
        }
    }
}

// This is used for property (need 2 arguments).
function Log1(target: any, propertyName: string | Symbol) {
    console.log(target);
    console.log(propertyName);
}

// This is used for accessors and methods.
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// This is used for arguments.
function Log3(target: any, name: string | Symbol, position: number) {
    console.log(target);
    console.log(name);
    console.log(position);
}

// @Logger1()
class Product {
    // @Log1
    name = 'soda';
    private price: number;

    // @Log2
    set setPrice(value: number) {
        if (value > 0) this.price = value; 
    }

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    // @Log2
    calculate(/* @Log3 */ value: number): number {
        return (value + this.price);
    }
}

const product = new Product('milk', 21);
console.log(product.calculate(10));

//#endregion