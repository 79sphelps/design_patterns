/*
Definition
Use sharing to support large numbers of fine-grained objects efficiently.

Frequency of use (in JavaScript): high

Summary
The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects
efficiently. Shared flyweight objects are immutable, that is, they cannot be changed as
they represent the characteristics that are shared with other objects.

Essentially Flyweight is an 'object normalization technique' in which common properties
are factored out into shared flyweight objects. (Note: the idea is similar to data model
normalization, a process in which the modeler attempts to minimize redundancy).

An example of the Flyweight Pattern is within the JavaScript engine itself which maintains
a list of immutable strings that are shared across the application.

Other examples include characters and line-styles in a word processor, or 'digit receivers'
in a public switched telephone network application. You will find flyweights mostly in
utility type applications such as word processors, graphics programs, and network apps;
they are less often used in data-driven business type applications.
*/

"use strict";


class Flyweight {
  constructor(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
  }
}

class FlyWeightFactory {
  constructor() {
    this.flyweights = {};
  }

  get(make, model, processor) {
    if (!this.flyweights[make + model]) {
      this.flyweights[make + model] = new Flyweight(make, model, processor);
    }
    return this.flyweights[make + model];
  }

  getCount() {
    let count = 0;
    for (let f in this.flyweights) count++;
    return count;
  }
}

class ComputerCollection {
  constructor() {
    this.computers = {};
    this.count = 0;
  }

  add(make, model, processor, memory, tag) {
    this.computers[tag] = new Computer(make, model, processor, memory, tag);
    this.count++;
  }

  get(tag) {
    return this.computers[tag];
  }

  getCount() { return this.count; }
}

class Computer {
  constructor(make, model, processor, memory, tag) {
    this.flyweight = factory.get(make, model, processor);
    this.memory = memory;
    this.tag = tag;
    this.getMake = function() {
      return this.flyweight.make;
    };
  }
}

var factory = new FlyWeightFactory();

let run = () => {
  let computers = new ComputerCollection();

  computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
  computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
  computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
  computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

  console.log(`Computers: ${computers.getCount()}`);
  console.log(`Flyweights: ${factory.getCount()}`);
}

run();

/* ES5 VERSION */
/*
function Flyweight(make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
}

let FlyWeightFactory = (function() {
  let flyweights = {};

  return {
    get: function(make, model, processor) {
      if (!flyweights[make + model]) {
        flyweights[make + model] = new Flyweight(make, model, processor);
      }
      return flyweights[make + model];
    },

    getCount: function() {
      let count = 0;
      for (let f in flyweights) count++;
      return count;
    }
  };
})();

function ComputerCollection() {
  let computers = {};
  let count = 0;

  return {
    add: function(make, model, processor, memory, tag) {
      computers[tag] = new Computer(make, model, processor, memory, tag);
      count++;
    },

    get: function(tag) {
      return computers[tag];
    },

    getCount: function() {
      return count;
    }
  };
}

let Computer = function(make, model, processor, memory, tag) {
  this.flyweight = FlyWeightFactory.get(make, model, processor);
  this.memory = memory;
  this.tag = tag;
  this.getMake = function() {
    return this.flyweight.make;
  };
  // ...
};
*/