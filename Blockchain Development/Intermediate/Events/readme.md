## What Do Events Do?

Events in Solidity act like logs. They help record specific actions on the blockchain, allowing external applications to listen and react to changes. In this contract, the `NumberChanged` event captures and stores old and new values whenever the stored number is updated.

## Example

If you call `setNumber(10)` after the initial value is `0`, the event will log:
```
NumberChanged(0, 10)
```

This means the number changed from `0` to `10`.