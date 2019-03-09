/*
Definition
Define a one-to-many dependency between objects so that when one object changes state,
all its dependents are notified and updated automatically.

Frequency of use (in JavaScript): high

Summary
The Observer pattern offers a subscription model in which objects subscribe to an event
and get notified when the event occurs. This pattern is the cornerstone of event driven
programming, including JavaScript. The Observer pattern facilitates good object-oriented
design and promotes loose coupling.

When building web apps you end up writing many event handlers. Event handlers are
functions that will be notified when a certain event fires. These notifications
optionally receive an event argument with details about the event (for example the
x and y position of the mouse at a click event).

The event and event-handler paradigm in JavaScript is the manifestation of the Observer
design pattern. Another name for the Observer pattern is Pub/Sub, short for
Publication/Subscription.
*/

'use strict';


class Click {
    constructor() {
        this.handlers = [];
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            item => {
                if (item !== fn) return item;
            }
        )
    }

    fire(o, thisObj) {
        let scope = thisObj;
        this.handlers.forEach(item => item.call(scope, o));
    }
}

let run = () => {
    let clickHandler = item => console.log(`fired: ${item}`);

    let click = new Click();

    click.subscribe(clickHandler);
    click.fire('event #1');
    click.unsubscribe(clickHandler);
    click.fire('event #2');
    click.subscribe(clickHandler);
    click.fire('event #3');
}

run();

/* ES5 VERSION

function Click() {
    this.handlers = [];  // observers
}

Click.prototype = {
    subscribe: function(fn) {
        this.handlers.push(fn);
    },

    unsubscribe: function(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    fire: function(o, thisObj) {
        //let scope = thisObj || window;
        let scope = thisObj;
        this.handlers.forEach(function(item) {
            item.call(scope, o);
        });
    }
};
*/