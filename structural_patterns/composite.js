/*
Definition
Compose objects into tree structures to represent part-whole hierarchies. Composite lets 
clients treat individual objects and compositions of objects uniformly.

Frequency of use (in JavaScript): high

Summary
The Composite pattern allows the creation of objects with properties that are primitive 
items or a collection of objects. Each item in the collection can hold other collections 
themselves, creating deeply nested structures.

A tree control is a perfect example of a Composite pattern. The nodes of the tree either 
contain an individual object (leaf node) or a group of objects (a subtree of nodes).

All nodes in the Composite pattern share a common set of properties and methods which 
supports individual objects as well as object collections. This common interface greatly 
facilitates the design and construction of recursive algorithms that iterate over each 
object in the Composite collection.
*/

'use strict';

let Node = function (name) {
    this.children = [];
    this.name = name;
}
 
Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },
 
    remove: function (child) {
        let length = this.children.length;
        for (let i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },
 
    getChild: function (i) {
        return this.children[i];
    },
 
    hasChildren: function () {
        return this.children.length > 0;
    }
}
 
// recursively traverse a (sub)tree
 
function traverse(indent, node) {
    console.log(Array(indent++).join("--") + node.name);
 
    for (let i = 0, len = node.children.length; i < len; i++) {
        traverse(indent, node.getChild(i));
    }
}

function run() {
    let tree = new Node("root");
    let left = new Node("left")
    let right = new Node("right");
    let leftleft = new Node("leftleft");
    let leftright = new Node("leftright");
    let rightleft = new Node("rightleft");
    let rightright = new Node("rightright");
 
    tree.add(left);
    tree.add(right);
    tree.remove(right);  // note: remove
    tree.add(right);
 
    left.add(leftleft);
    left.add(leftright);
 
    right.add(rightleft);
    right.add(rightright);
 
    traverse(1, tree);

}

run();