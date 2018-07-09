/*
Definition
Provide a unified interface to a set of interfaces in a subsystem. 
Façade defines a higher-level interface that makes the subsystem easier to use.

Frequency of use (in JavaScript): high

Summary
The Façade pattern provides an interface which shields clients from complex functionality 
in one or more subsystems. It is a simple pattern that may seem trivial but it is powerful 
and extremely useful. It is often present in systems that are built around a multi-layer 
architecture.

The intent of the Façade is to provide a high-level interface (properties and methods) 
that makes a subsystem or toolkit easy to use for the client.

On the server, in a multi-layer web application you frequently have a presentation layer 
which is a client to a service layer. Communication between these two layers takes place 
via a well-defined API. This API, or façade, hides the complexities of the business objects 
and their interactions from the presentation layer.

Another area where Façades are used is in refactoring. Suppose you have a confusing or 
messy set of legacy objects that the client should not be concerned about. You can hide 
this code behind a Façade. The Façade exposes only what is necessary and presents a cleaner 
and easy-to-use interface.

Façades are frequently combined with other design patterns. Facades themselves are often 
implemented as singleton factories.
*/

'use strict';

let Mortgage = function(name) {
    this.name = name;
};

Mortgage.prototype = {
    applyFor: function(amount) {
        let result = 'approved';
        if (!new Bank().verify(this.name, amount)) {
            result = 'denied';
        } else if (!new Credit().get(this.name)) {
            result = "denied";
        } else if (!new Background().check(this.name)) {
            result = "denied";
        }
        return this.name + ' has been ' + result + ' for a ' + amount + ' mortgage';
    }
}

let Bank = function() {
    this.verify = function(name, amount) {
        return true;
    }
};

let Credit = function() {
    this.get = function(name) {
        // complex logic ...
        return true;
    }
}
 
let Background = function() {
    this.check = function(name) {
        // complex logic ...
        return true;
    }
}

function run() {
    let mortgage = new Mortgage('Joan');
    let result = mortgage.applyFor('$100,000');
    console.log(result);
}

run();