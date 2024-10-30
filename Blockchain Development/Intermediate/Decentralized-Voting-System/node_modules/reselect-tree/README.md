reselect-tree
=============

Wrapper around reactjs's [reselect](https://github.com/reactjs/reselect)
library for creating trees of selectors.

Designed to allow selectors to be organized into separate namespaces easily,
with the ability to identify dependencies between selectors in the tree.

Usage Example
=============

Install with:

```
npm install --save reselect-tree
```


Then define a file `selectors.js`:

```javascript
import { createSelectorTree, createLeaf } from "reselect-tree";

const selectors = require("./dist/reselect-tree.js");
const createSelectorTree = selectors.createSelectorTree;
const createLeaf = selectors.createLeaf;

const select = createSelectorTree({
  shop: {
    taxPercent: state => state.shop.taxPercent
  },
  cart: {
    items: state => state.cart.items,

    subtotal: createLeaf(
      ['./items'],

      (items) => items.reduce((acc, item) => acc + item.value, 0)
    ),

    tax: createLeaf(
      ['/shop/taxPercent', './subtotal'],

      (taxPercent, subtotal) => subtotal * (taxPercent / 100)
    ),

    total: createLeaf(
      ['./subtotal', './tax'], (subtotal, tax) => ({ total: subtotal + tax })
    )
  }
});


let exampleState = {
  shop: {
    taxPercent: 8,
  },
  cart: {
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(select.cart.subtotal(exampleState)) // 2.15
console.log(select.cart.tax(exampleState))      // 0.172
console.log(select.cart.total(exampleState))    // { total: 2.322 }
```

You can also select non-leaf nodes, for structured representations:

```javascript
console.log(select.cart(exampleState))
{ items:
   [ { name: 'apple', value: 1.2 },
     { name: 'orange', value: 0.95 } ],
  subtotal: 2.15,
  tax: 0.172,
  total: { total: 2.322 } }
```

Override Root Selectors
-----------------------

You can override the default aggregation behavior by defining a custom child
`_`. e.g.:

```javascript
const select = createSelectorTree({
  shop: {
    taxPercent: state => state.shop.taxPercent
  },
  cart: {
    _: createLeaf(
      ['./items', './total'],

      (items, total) => ({ items, total })
    ),

    items: state => state.cart.items,

    subtotal: createLeaf(
      ['./items'],

      (items) => items.reduce((acc, item) => acc + item.value, 0)
    ),

    tax: createLeaf(
      ['/shop/taxPercent', './subtotal'],

      (taxPercent, subtotal) => subtotal * (taxPercent / 100)
    ),

    total: createLeaf(
      ['./subtotal', './tax'], (subtotal, tax) => ({ total: subtotal + tax })
    )
  }
});
```

This changes how `select.cart` behaves, instead acting as `select.cart._`:

```javascript
console.log(select.cart(exampleState));   // { items:
                                          //    [ { name: 'apple', value: 1.2 },
                                          //      { name: 'orange', value: 0.95 } ],
                                          //    total: { total: 2.322 } }
console.log(select.cart._(exampleState)); // { items:
                                          //    [ { name: 'apple', value: 1.2 },
                                          //      { name: 'orange', value: 0.95 } ],
                                          //    total: { total: 2.322 } }
```
