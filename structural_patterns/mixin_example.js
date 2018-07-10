/*
Mixins
In JavaScript we can only inherit from a single object. There can be only one 
[[Prototype]] for an object. And a class may extend only one other class.

But sometimes that feels limiting. For instance, I have a class StreetSweeper 
and a class Bicycle, and want to make a StreetSweepingBicycle.

Or, talking about programming, we have a class Renderer that implements 
templating and a class EventEmitter that implements event handling, and want 
to merge these functionalities together with a class Page, to make a page 
that can use templates and emit events.

There’s a concept that can help here, called “mixins”.

As defined in Wikipedia, a mixin is a class that contains methods for use by 
other classes without having to be the parent class of those other classes.

In other words, a mixin provides methods that implement a certain behavior, 
but we do not use it alone, we use it to add the behavior to other classes.
*/

// Mixin inheritance example
let sayMixin = {
    say(phrase) {
        console.log(phrase);
    }
};

let sayHiMixin = {
    __proto__: sayMixin,

    sayHi() {
        super.say(`Hello ${this.name}`);
    },
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};

// Simple mixin example
let sayGreetingMixin = {
    goodMorning() {
        console.log(`Good morning, ${this.name}`);
    },
    goodEvening() {
        console.log(`Good evening, ${this.name}`);
    }
};

// usage:

function User(name) {
    this.name = name;
}

/*
class User {
    constructor(name) {
      this.name = name;
    }
}
*/

Object.assign(User.prototype, sayHiMixin);
Object.assign(User.prototype, sayGreetingMixin);

new User('Tester').sayHi();
new User('Steve').goodMorning();
