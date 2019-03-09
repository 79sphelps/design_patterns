/*
Definition
Specify the kind of objects to create using a prototypical instance, and create new
objects by copying this prototype.

Frequency of use (in JavaScript): high

Summary
The Prototype Pattern creates new objects, but rather than creating non-initialized
objects it returns objects that are initialized with values it copied from a
prototype - or sample - object. The Prototype pattern is also referred to as the
Properties pattern.

An example of where the Prototype pattern is useful is the initialization of
business objects with values that match the default values in the database. The
prototype object holds the default values that are copied over into a newly
created business object.

Classical languages rarely use the Prototype pattern, but JavaScript being a
prototypal language uses this pattern in the construction of new objects and
their prototypes.
*/

'use strict';


class CustomerPrototype {
    constructor(proto) {
        this.proto = proto;
    }

    clone() {
        let customer = new Customer();
        customer.first = this.proto.first;
        return customer;
    }
}

class Customer {
    constructor(first) {
        this.first = first;
    }

    say() {
        console.log(`name: ${this.first}`);
    }
}

let run = () => {
    var proto = new Customer('steve');
    var prototype = new CustomerPrototype(proto);

    var customer = prototype.clone();
    customer.say();
}

run();

/* ES5 VERSION

function CustomerPrototype(proto) {
    this.proto = proto;

    this.clone = function() {
        let customer = new Customer();
        customer.first = proto.first;
        return customer;
    };
}

function Customer(first) {
    this.first = first;

    this.say = function() {
        console.log('name: ' + this.first);
    };
}
*/