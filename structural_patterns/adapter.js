/*
Definition
Convert the interface of a class into another interface clients expect.
Adapter lets classes work together that couldn't otherwise because of
incompatible interfaces.

Frequency of use (in JavaScript): medium high

Summary:
The Adapter pattern translates one interface (an object's properties and methods) to another.
Adapters allows programming components to work together that otherwise wouldn't because of
mismatched interfaces. The Adapter pattern is also referred to as the Wrapper Pattern.

One scenario where Adapters are commonly used is when new components need to be integrated
and work together with existing components in the application.

Another scenario is refactoring in which parts of the program are rewritten with an improved
interface, but the old code still expects the original interface.
*/

'use strict';


class Shipping {
    request(zipStart, zipEnd, weight) {
        return '$49.75';
    }
}

class AdvancedShipping {
    constructor() {
        this.login = credentials => { };
        this.setStart = start => { };
        this.setDestination = dest => { };
        this.calculate = weight => { return "$39.50" };
    }
}

class ShippingAdapter {
    constructor(creds) {
        this.shipping = new AdvancedShipping();
        this.shipping.login(creds);
    }

    request(zipStart, zipEnd, weight) {
        this.shipping.setStart(zipStart);
        this.shipping.setDestination(zipEnd);
        return this.shipping.calculate(weight);
    }
}

let run = () => {
    let shipping = new Shipping();
    let credentials = { token: "30a8-6ee1" };
    let adapter = new ShippingAdapter(credentials);

    // original shipping object and interface
    let cost = shipping.request("78701", "10010", "2 lbs");
    console.log(`Old cost: ${cost}`);

    // new shipping object with adapted interface
    cost = adapter.request("78701", "10010", "2 lbs");
    console.log(`New cost: ${cost}`);
}

run();

/*
// old interface
function Shipping() {
    this.request = function(zipStart, zipEnd, weight) {
        return "$49.75";
    }
}

// new interface
function AdvancedShipping() {
    this.login = function(credentials) { };
    this.setStart = function(start) { };
    this.setDestination = function(dest) { };
    this.calculate = function(weight) { return "$39.50" };
}

// adapter interface
function ShippingAdapter(credentials) {
    let shipping = new AdvancedShipping();
    shipping.login(credentials);

    return {
        // Note: This 'request' public function has same signature as old interface function.
        request: function(zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}
*/