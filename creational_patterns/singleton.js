/*
Definition
Ensure a class has only one instance and provide a global point of access to it.

Frequency of use (in JavaScript): high

Summary
The Singleton Pattern limits the number of instances of a particular object to just one. 
This single instance is called the singleton.

Singletons are useful in situations where system-wide actions need to be coordinated 
from a single central place. An example is a database connection pool. The pool manages 
the creation, destruction, and lifetime of all database connections for the entire 
application ensuring that no connections are 'lost'.

Singletons reduce the need for global variables which is particularly important in 
JavaScript because it limits namespace pollution and associated risk of name collisions. 
The Module pattern is JavaScript's manifestation of the Singleton pattern.

Several other patterns, such as, Factory, Prototype, and Façade are frequently 
implemented as Singletons when only one instance is needed.
*/

'use strict';

let Singleton = (function() {
    let instance;

    function createInstance() {
        let object = new Object('my instance');
        return object;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            } 
            return instance;
        }
    };
})();

function run() {
    let i1 = Singleton.getInstance();
    let i2 = Singleton.getInstance();
    console.log('Same instance? ' + (i1 === i2));
}

run();

/* ES6
class Singleton {
  
  constructor() {
    let instance;
  }

  createInstance() {
    let obj = new Object('');
    return obj;
  }

  get instance() {
    if (!instance) {
      instance = this.createInstance();
    }
    return instance;
  }
}

function run() {
  let i1 = Singleton.instance;
  let i2 = Singleton.instance;
  console.log((i1 === i2));
}

run();
*/