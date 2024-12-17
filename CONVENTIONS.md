If at all possible, follow the SOLID Principles:

- Single Responsibility - A class should have a single responsibility or job, and only one reason to change
- Open/Closed - Software entities should be open for extension but closed for modification
- Liskov Substitution - If a parent class and a child class exist, the parent and child class can be interchanged without incorrect results
- Interface segregation - A class should have small, focused interfaces, rather than large, monolithic ones
- Dependency Inversion - High-level modules should not depend on low-level modules, and instead, both should depend on abstractions

Tests should always be written first, using TDD.

Names should make sense to a human. No variables (except for simple for loops) should be single letters or just acronyms.

All inputs should be validated.

We do not use exceptions for control flow.
