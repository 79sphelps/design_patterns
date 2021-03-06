/*
Definition
Define the skeleton of an algorithm in an operation, deferring some steps to
subclasses. Template Method lets subclasses redefine certain steps of an
algorithm without changing the algorithm's structure.

Frequency of use (in JavaScript): medium low

Summary
The Template Method pattern provides an outline of a series of steps for an
algorithm. Objects that implement these steps retain the original structure
of the algorithm but have the option to redefine or adjust certain steps.
This pattern is designed to offer extensibility to the client developer.

Template Methods are frequently used in general purpose frameworks or libraries
that will be used by other developer An example is an object that fires a
sequence of events in response to an action, for example a process request.
The object generates a 'preprocess' event, a 'process' event and a 'postprocess'
event. The developer has the option to adjust the response to immediately
before the processing, during the processing and immediately after the processing.

An easy way to think of Template Method is that of an algorithm with holes.
It is up to the developer to fill these holes with appropriate functionality
for each step.
*/

'use strict';


class DataStore {
    process() {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
}

class Inherit {
    constructor(proto) {
        let F = function() { };
        F.prototype = proto;
        return new F();
    }
}


let run = () => {
    //let mySql = inherit(datastore);
    let mySql = new Inherit(new DataStore());

    // implement template steps

    mySql.connect = () => { console.log("MySQL: connect step"); };
    mySql.select = () => { console.log("MySQL: select step"); };
    mySql.disconnect = () => { console.log("MySQL: disconnect step"); };

    mySql.process();
}

run();

/*
let datastore = {
    process: function() {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
};
*/

// Note: This is very much like the polyfill for Object.create(..)
// See page 408 of You Don't Know JS
/*
if (!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    }
}

// Or...
function createAndLinkObject(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
*/

/*
function inherit(proto) {
    let F = function() { };
    F.prototype = proto;
    return new F();
}
*/