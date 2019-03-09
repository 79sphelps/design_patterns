/*
Definition
Provide a surrogate or placeholder for another object to control access to it.

Frequency of use (in JavaScript): medium high

Summary
The Proxy pattern provides a surrogate or placeholder object for another object and 
controls access to this other object.

In object-oriented programming, objects do the work they advertise through their 
interface (properties and methods). Clients of these objects expect this work to be 
done quickly and efficiently. However, there are situations where an object is severely 
constrained and cannot live up to its responsibility. Typically this occurs when there 
is a dependency on a remote resource (resulting in network latency) or when an object 
takes a long time to load.

In situations like these you apply the Proxy pattern and create a proxy object that 
‘stands in’ for the original object. The Proxy forwards the request to a target object. 
The interface of the Proxy object is the same as the original object and clients may 
not even be aware they are dealing with a proxy rather than the real object.
*/

"use strict";

function GeoCoder() {
  this.getLatLng = function(address) {
    if (address === "Amsterdam") {
      return "52.3700° N, 4.8900° E";
    } else if (address === "London") {
      return "51.5171° N, 0.1062° W";
    } else if (address === "Paris") {
      return "48.8742° N, 2.3470° E";
    } else if (address === "Berlin") {
      return "52.5233° N, 13.4127° E";
    } else {
      return "";
    }
  };
}

function GeoProxy() {
  let geocoder = new GeoCoder();
  let geocache = {};

  return {
    getLatLng: function(address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      console.log(address + ": " + geocache[address]);
      return geocache[address];
    },
    getCount: function() {
      let count = 0;
      for (let code in geocache) {
        count++;
      }
      return count;
    }
  };
}

function run() {
  let geo = new GeoProxy();

  // geolocation requests

  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("London");
  geo.getLatLng("London");

  console.log("\nCache size: " + geo.getCount());
}

run();

/*
//==================================================
// Simplified

function DataStore() {
  this.getData = function(key) {
    if (key === "1") {
      return "100";
    } else if (key === "2") {
      return "200";
    } else if (key === "3") {
      return "300";
    } else if (key === "4") {
      return "400";
    } else {
      return "";
    }
  };
}

function DataProxy() {
  let datastore = new DataStore();
  let datacache = {};

  return {
    getData: function(key) {
      if (!datacache[key]) {
        datacache[key] = datastore.getData(key);
      }
      console.log(key + ": " + datacache[key]);
      return datacache[key];
    },
    getCount: function() {
      let count = 0;
      for (let c in datacache) count++;
      return count;
    }
  };
}

function run2() {
  let data = new DataProxy();
  data.getData("1");
  data.getData("2");
  data.getData("2");
  data.getData("2");
  data.getData("3");
  data.getData("3");
  data.getData("4");

  console.log("\nCache size: " + data.getCount());
}

run2();
*/
