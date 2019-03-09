/*
Definition
Without violating encapsulation, capture and externalize an object's internal state so
that the object can be restored to this state later.

Frequency of use (in JavaScript): low

Summary
The Memento pattern provides temporary storage as well as restoration of an object.
The mechanism in which you store the object’s state depends on the required duration
of persistence, which may vary.

You could view a database as an implementation of the Memento design pattern in which
objects are persisted and restored. However, the most common reason for using this
pattern is to capture a snapshot of an object’s state so that any subsequent changes
can be undone easily if necessary.

Essentially, a Memento is a small repository that stores an object’s state. Scenarios
in which you may want to restore an object into a state that existed previously
include: saving and restoring the state of a player in a computer game or the
implementation of an undo operation in a database.

In JavaScript Mementos are easily implemented by serializing and de-serializing
objects with JSON.
*/

'use strict';


class Person {
    constructor(name, street, city, state) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
    }

    hydrate() {
        let memento = JSON.stringify(this);
        return memento;
    }

    dehydrate(memento) {
        let m = JSON.parse(memento);
        this.name = m.name;
        this.street = m.street;
        this.city = m.city;
        this.state = m.state;
    }
}

class CareTaker {
    constructor() {
        this.mementos = {};
    }

    add(key, memento) {
        this.mementos[key] = memento;
    }

    get(key) {
        return this.mementos[key];
    }
}


let run = () => {
    let mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
    let john = new Person("John Wang", "48th Street", "San Jose", "CA");
    let caretaker = new CareTaker();

    // save state

    caretaker.add(1, mike.hydrate());
    caretaker.add(2, john.hydrate());

    // mess up their names

    mike.name = "King Kong";
    john.name = "Superman";

    // restore original state

    mike.dehydrate(caretaker.get(1));
    john.dehydrate(caretaker.get(2));

    console.log(mike.name);
    console.log(john.name);
}

run();

/* ES5 VERSION

let Person = function(name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
}

Person.prototype = {
    hydrate: function() {
        let memento = JSON.stringify(this);
        return memento;
    },

    dehydrate: function(memento) {
        let m = JSON.parse(memento);
        this.name = m.name;
        this.street = m.street;
        this.city = m.city;
        this.state = m.state;
    }
}

let CareTaker = function() {
    this.mementos = {};

    this.add = function(key, memento) {
        this.mementos[key] = memento;
    },

    this.get = function(key) {
        return this.mementos[key];
    }
}
*/