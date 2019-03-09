/*
Definition
Define a family of algorithms, encapsulate each one, and make them interchangeable.
Strategy lets the algorithm vary independently from clients that use it.

Frequency of use (in JavaScript):medium

Summary
The Strategy pattern encapsulates alternative algorithms (or strategies) for a
particular task. It allows a method to be swapped out at runtime by any other
method (strategy) without the client realizing it. Essentially, Strategy is a
group of algorithms that are interchangeable.

Say we like to test the performance of different sorting algorithms to an array
of numbers: shell sort, heap sort, bubble sort, quicksort, etc. Applying the
Strategy pattern to these algorithms allows the test program to loop through
all algorithms, simply by changing them at runtime and test each of these against
the array. For Strategy to work all method signatures must be the same so that
they can vary without the client program knowing about it.

In JavaScript the Strategy pattern is widely used as a plug-in mechanism when
building extensible frameworks. This can be a very effective approach.
*/

'use strict';


class Shipping {
    constructor() {
        this.company = '';
    }

    setStrategy(company) {
        this.company = company;
    }

    calculate(pkg) {
        return this.company.calculate(pkg);
    }
}

class UPS {
    calculate(pkg) { return '$45.95'; }
}

class USPS {
    calculate(pkg) { return '$39.40'; }
}

class Fedex {
    calculate(pkg) { return '$43.20'; }
}

let run = () => {
    let pkg = { from: "76712", to: "10012", weigth: "lkg" };

    // the 3 strategies

    let ups = new UPS();
    let usps = new USPS();
    let fedex = new Fedex();

    let shipping = new Shipping();

    shipping.setStrategy(ups);
    console.log(`UPS Strategy: ${shipping.calculate(pkg)}`);
    shipping.setStrategy(usps);
    console.log(`USPS Strategy: ${shipping.calculate(pkg)}`);
    shipping.setStrategy(fedex);
    console.log(`Fedex Strategy: ${shipping.calculate(pkg)}`);
}

run();

/* ES5 VERSION

let Shipping = function() {
    this.company = "";
};

Shipping.prototype = {
    setStrategy: function(company) {
        this.company = company;
    },

    calculate: function(package) {
        return this.company.calculate(package);
    }
};

let UPS = function() {
    this.calculate = function(package) {
        // calculations...
        return "$45.95";
    }
};

let USPS = function() {
    this.calculate = function(package) {
        // calculations...
        return "$39.40";
    }
};

let Fedex = function() {
    this.calculate = function(package) {
        // calculations...
        return "$43.20";
    }
};
*/