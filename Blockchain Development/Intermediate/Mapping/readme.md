## What Do Mappings Do?

Mappings in Solidity are like hash tables. They store key-value pairs and allow quick lookups. In this contract, the `balances` mapping stores an address as a key and associates it with a balance amount.

## Example

If an address `0x123...` calls `setBalance(100)`, the mapping will store:
```
balances[0x123...] = 100
```

When that address calls `getBalance()`, it will return `100`.