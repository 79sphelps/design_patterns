/*
Definition
Define an interface for creating an object, but let subclasses decide which class
to instantiate. Factory Method lets a class defer instantiation to subclasses.

Frequency of use (in JavaScript): medium high

Summary
A Factory Method creates new objects as instructed by the client. One way to
create objects in JavaScript is by invoking a constructor function with the
new operator. There are situations however, where the client does not, or
should not, know which one of several candidate objects to instantiate. The
Factory Method allows the client to delegate object creation while still
retaining control over which type to instantiate.

The key objective of the Factory Method is extensibility. Factory Methods
are frequently used in applications that manage, maintain, or manipulate
collections of objects that are different but at the same time have many
characteristics (i.e. methods and properties) in common. An example would
be a collection of documents with a mix of Xml documents, Pdf documents,
and Rtf documents.
*/

'use strict';


class Factory {
    createEmployee(type) {
        let employee;

        if (type === 'fulltime') {
            employee = new FullTime();
        } else if (type === 'parttime') {
            employee = new PartTime();
        }

        employee.type = type;

        employee.say = () => {
            console.log(`${employee.type}: rate ${employee.hourly}/hour`);
        };

        return employee;
    }
}

class FullTime {
    constructor() {
        this.hourly = '$12';
    }
}

class PartTime {
    constructor() {
        this.hourly = '$11';
    }
}

let run = () => {
    let employees = [];
    let factory = new Factory();

    employees.push(factory.createEmployee('fulltime'));
    employees.push(factory.createEmployee('parttime'));

    for (let i = 0; i < employees.length; i++) {
        employees[i].say();
    }
}


run();

/* ES5 VERSION

function Factory() {
    this.createEmployee = function(type) {
        let employee;

        if (type === 'fulltime') {
            employee = new FullTime();
        } else if (type === 'parttime') {
            employee = new PartTime();
        }

        employee.type = type;

        employee.say = function() {
            console.log(this.type + ': rate ' + this.hourly + '/hour');
        }

        return employee;
    }
}

let FullTime = function() {
    this.hourly = '$12';
}
let PartTime = function() {
    this.hourly = '$11';
}
*/