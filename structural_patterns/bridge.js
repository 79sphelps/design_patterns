/*
Definition
Decouple an abstraction from its implementation so that the two can vary independently.

Frequency of use (in JavaScript): low

Summary
The Bridge pattern allows two components, a client and a service, to work together with 
each component having its own interface. Bridge is a high-level architectural pattern 
and its main goal is to write better code through two levels of abstraction. It facilitates 
very loose coupling of objects. It is sometimes referred to as a double Adapter pattern.

An example of the Bridge pattern is an application (the client) and a database driver 
(the service). The application writes to a well-defined database API, for example ODBC, 
but behind this API you will find that each driver's implementation is totally different 
for each database vendor (SQL Server, MySQL, Oracle, etc.).

The Bridge pattern is a great pattern for driver development but it is rarely seen in JavaScript.
*/

"use strict";

// input devices

let Gestures = function(output) {
  this.output = output;

  this.tap = function() {
    this.output.click();
  };
  this.swipe = function() {
    this.output.move();
  };
  this.pan = function() {
    this.output.drag();
  };
  this.pinch = function() {
    this.output.zoom();
  };
};

let Mouse = function(output) {
  this.output = output;

  this.click = function() {
    this.output.click();
  };
  this.move = function() {
    this.output.move();
  };
  this.down = function() {
    this.output.drag();
  };
  this.wheel = function() {
    this.output.zoom();
  };
};

// output devices

let Screen = function() {
  this.click = function() {
    console.log("Screen select");
  };
  this.move = function() {
    console.log("Screen move");
  };
  this.drag = function() {
    console.log("Screen drag");
  };
  this.zoom = function() {
    console.log("Screen zoom in");
  };
};

let Audio = function() {
  this.click = function() {
    console.log("Sound oink");
  };
  this.move = function() {
    console.log("Sound waves");
  };
  this.drag = function() {
    console.log("Sound screetch");
  };
  this.zoom = function() {
    console.log("Sound volume up");
  };
};

function run() {
  let screen = new Screen();
  let audio = new Audio();

  let hand = new Gestures(screen);
  let mouse = new Mouse(audio);

  hand.tap();
  hand.swipe();
  hand.pinch();

  mouse.click();
  mouse.move();
  mouse.wheel();
}

run();

/* Simplified
let Screen = function() {
  this.click = function() {
    console.log("Screen select");
  };
  this.move = function() {
    console.log("Screen move");
  };
  this.drag = function() {
    console.log("Screen drag");
  };
  this.zoom = function() {
    console.log("Screen zoom in");
  };
};

let Gestures = function(output) {
  this.output = output;

  this.tap = function() {
    this.output.click();
  };
  this.swipe = function() {
    this.output.move();
  };
  this.pan = function() {
    this.output.drag();
  };
  this.pinch = function() {
    this.output.zoom();
  };
};

function run() {
  let screen = new Screen();
  let hand = new Gestures(screen);
  hand.tap();
  hand.swipe();
  hand.pinch();
}

run();

*/
