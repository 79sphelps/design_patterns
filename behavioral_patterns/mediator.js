/*
Definition
Define an object that encapsulates how a set of objects interact. Mediator promotes loose 
coupling by keeping objects from referring to each other explicitly, and it lets you 
vary their interaction independently.

Frequency of use (in JavaScript):medium low

Summary
The Mediator pattern provides central authority over a group of objects by encapsulating 
how these objects interact. This model is useful for scenarios where there is a need 
to manage complex conditions in which every object is aware of any state change in any 
other object in the group.

The Mediator patterns are useful in the development of complex forms. Take for example 
a page in which you enter options to make a flight reservation. A simple Mediator rule 
would be: you must enter a valid departure date, a valid return date, the return date 
must be after the departure date, a valid departure airport, a valid arrival airport, 
a valid number of travelers, and only then the Search button can be activated.

Another example of Mediator is that of a control tower on an airport coordinating 
arrivals and departures of airplanes.
*/

'use strict';

let Participant = function(name) {
    this.name = name;
    this.chatroom = null;
};
 
Participant.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
};
 
let Chatroom = function() {
    let participants = {};
 
    return {
 
        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
 
        send: function(message, from, to) {
            if (to) {                // single message
                to.receive(message, from);    
            } else {                       // broadcast message
                for (key in participants) {   
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};

function run() {
    let yoko = new Participant("Yoko");
    let john = new Participant("John");
    let paul = new Participant("Paul");
    let ringo = new Participant("Ringo");
 
    let chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);
 
    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
}

run();