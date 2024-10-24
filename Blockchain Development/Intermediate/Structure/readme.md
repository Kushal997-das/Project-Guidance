## What Do Structures Do?

Structures (or structs) in Solidity are custom data types that group multiple variables into a single unit. In this contract, the `User` structure holds a name and an age for each user.

## Example

If an address `0x123...` calls `setUser("Kushal", 25)`, the struct will store:
```
users[0x123...] = User("Alice", 25)
```

When that address calls `getUser()`, it will return `("Kushal", 25)`.