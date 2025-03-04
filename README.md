# @0bipinnata0/heap

A high-performance TypeScript implementation of a min heap data structure that supports both ESM and CommonJS. This implementation is optimized for handling large datasets and provides stable ordering for elements with equal priorities.

## Installation

```bash
pnpm add @0bipinnata0/heap
```

## Features

- 🚀 High performance implementation
- 🔄 Stable ordering for equal priorities
- 💪 Handles large datasets efficiently
- 📦 Support for both ESM and CommonJS
- 🎯 Type-safe with TypeScript
- 🧪 Comprehensive test coverage

## Usage

```typescript
import { push, pop, peek } from '@0bipinnata0/heap'

// Create a min heap array for objects with sortIndex
const heap: Array<{id: number, sortIndex: number}> = []

// Push elements
push(heap, { id: 1, sortIndex: 5 })
push(heap, { id: 2, sortIndex: 3 })
push(heap, { id: 3, sortIndex: 7 })
push(heap, { id: 4, sortIndex: 1 })

// Peek at minimum element without removing it
console.log(peek(heap)) // { id: 4, sortIndex: 1 }

// Pop elements in ascending order
console.log(pop(heap)) // { id: 4, sortIndex: 1 }
console.log(pop(heap)) // { id: 2, sortIndex: 3 }
console.log(pop(heap)) // { id: 1, sortIndex: 5 }
console.log(pop(heap)) // { id: 3, sortIndex: 7 }
```

## API

### Functions

- `push(heap: T[], value: T): void`
  - Adds a new element to the heap
  - Time complexity: O(log n)

- `peek(heap: T[]): T | null`
  - Returns the minimum element without removing it
  - Returns null if heap is empty
  - Time complexity: O(1)

- `pop(heap: T[]): T | null`
  - Removes and returns the minimum element
  - Returns null if heap is empty
  - Time complexity: O(log n)

## Performance Characteristics

- Push operation: O(log n)
- Pop operation: O(log n)
- Peek operation: O(1)
- Space complexity: O(n)

## Edge Cases Handling

- Empty heap operations return null
- Stable ordering for elements with equal priorities
- Supports negative priority values
- Handles very large priority values (up to Number.MAX_SAFE_INTEGER)

## Use Cases

- Priority queues
- Task scheduling systems
- Graph algorithms (Dijkstra's, Prim's)
- Event scheduling
- Real-time data processing

## Testing

The package includes comprehensive test coverage for:
- Basic operations (push, pop, peek)
- Edge cases and boundary conditions
- Performance with large datasets
- Stability of ordering
- Stress testing with random operations

Run tests with:
```bash
pnpm test
```

## License

MIT