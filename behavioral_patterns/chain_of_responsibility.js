/*
Definition
Avoid coupling the sender of a request to its receiver by giving more than one object a chance
to handle the request. Chain the receiving objects and pass the request along the chain until
an object handles it.

Frequency of use (in JavaScript): medium

Summary
The Chain of Responsibility pattern provides a chain of loosely coupled objects one of which
can satisfy a request. This pattern is essentially a linear search for an object that can
handle a particular request.

An example of a chain-of-responsibility is event-bubbling in which an event propagates through
a series of nested controls one of which may choose to handle the event.

The Chain of Responsiblity patterns is related to the Chaining Pattern which is frequently
used in JavaScript (jQuery makes extensive use of this pattern).
*/

'use strict';


class Request {
    constructor(amount) {
        this.amount = amount;
        console.log(`Requested: $${amount}\n`);
    }

    get(bill) {
        let count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        console.log(`Dispense ${count} $${bill} bills`);
        return this;
    }
}

let run = () => {
    let request = new Request(378);
    request.get(100).get(50).get(20).get(10).get(5).get(1);
}

run();

/* ES5 VERSION

let Request = function(amount) {
    this.amount = amount;
    console.log("Requested: $" + amount + "\n");
}

Request.prototype = {
    get: function(bill) {
        let count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        console.log("Dispense " + count + " $" + bill + " bills");
        return this;
    }
}
*/