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

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }
 
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

function run() {
    let calculator = new Calculator();
 
    // issue commands
 
    calculator.execute(new AddCommand(100));
    calculator.execute(new SubCommand(24));
    calculator.execute(new MulCommand(6));
    calculator.execute(new DivCommand(2));
 
    // reverse last two commands
 
    calculator.undo();
    calculator.undo();
 
    console.log("\nValue: " + calculator.getCurrentValue());

}

run();