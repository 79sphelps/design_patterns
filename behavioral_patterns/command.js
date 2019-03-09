/*
Definition
Encapsulate a request as an object, thereby letting you parameterize clients with
different requests, queue or log requests, and support undoable operations.

Frequency of use (in JavaScript):high

Summary
The Command pattern encapsulates actions as objects. Command objects allow for
loosely coupled systems by separating the objects that issue a request from the
objects that actually process the request. These requests are called events and
the code that processes the requests are called event handlers.

Suppose you are building an application that supports the Cut, Copy, and Paste
clipboard actions. These actions can be triggered in different ways throughout
the app: by a menu system, a context menu (e.g. by right clicking on a textbox),
or by a keyboard shortcut.

Command objects allow you to centralize the processing of these actions, one
for each operation. So, you need only one Command for processing all Cut requests,
one for all Copy requests, and one for all Paste requests.

Because commands centralize all processing, they are also frequently involved
in handling Undo functionality for the entire application.
*/

'use strict';


let add = (x, y) => { return x + y; }
let sub = (x, y) => { return x - y; }
let mul = (x, y) => { return x * y; }
let div = (x, y) => { return x / y; }

class Command {
    constructor(execute, undo, value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
    }
}

let AddCommand = value => new Command(add, sub, value);
let SubCommand = value => new Command(sub, add, value);
let MulCommand = value => new Command(mul, div, value);
let DivCommand = value => new Command(div, mul, value);

class Calculator {
    constructor() {
        this.current = 0;
        this.commands = [];
    }

    _action(cmd) {
        //console.log(cmd.execute.name);
        //const name = cmd.execute.toString().substr(9, 3);
        const name = cmd.execute.name;
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    execute(cmd) {
        this.current = cmd.execute(this.current, cmd.value);
        this.commands.push(cmd);
        console.log(`${this._action(cmd)}: ${cmd.value}`);
    }

    undo() {
        let cmd = this.commands.pop();
        this.current = cmd.undo(this.current, cmd.value);
        console.log(`Undo ${this._action(cmd)}: ${cmd.value}`);
    }

    getCurrentValue() {
        return this.current;
    }
}

let run = () => {
    let calculator = new Calculator();

    // issue commands
    calculator.execute(AddCommand(100));
    calculator.execute(SubCommand(24));
    calculator.execute(MulCommand(6));
    calculator.execute(DivCommand(2));

    // reverse last two commands
    calculator.undo();
    calculator.undo();

    console.log(`\nValue: ${calculator.getCurrentValue()}`);
}

run();

/* ES5 VERSION

/*
let Command = function (execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

let AddCommand = function (value) {
    return new Command(add, sub, value);
};

let SubCommand = function (value) {
    return new Command(sub, add, value);
};

let MulCommand = function (value) {
    return new Command(mul, div, value);
};

let DivCommand = function (value) {
    return new Command(div, mul, value);
};

let Calculator = function () {
    let current = 0;
    let commands = [];

    function action(command) {
        let name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return {
        execute: function (command) {
            current = command.execute(current, command.value);
            commands.push(command);
            console.log(action(command) + ": " + command.value);
        },

        undo: function () {
            let command = commands.pop();
            current = command.undo(current, command.value);
            console.log("Undo " + action(command) + ": " + command.value);
        },

        getCurrentValue: function () {
            return current;
        }
    }
}
*/
