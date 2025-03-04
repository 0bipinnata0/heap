# @0bipinnata0/heap

A TypeScript implementation of a min heap data structure that supports both ESM and CommonJS.

## Installation

```bash
pnpm add @0bipinnata0/heap
```

## Usage

```typescript
import { MinHeap } from '@0bipinnata0/heap'

// Create a min heap for numbers
const numberHeap = new MinHeap<number>((a, b) => a - b)

// Insert values
numberHeap.insert(5)
numberHeap.insert(3)
numberHeap.insert(7)
numberHeap.insert(1)
numberHeap.insert(4)

// Get the minimum value without removing it
console.log(numberHeap.peek()) // 1

// Extract minimum values in order
console.log(numberHeap.extractMin()) // 1
console.log(numberHeap.extractMin()) // 3
console.log(numberHeap.extractMin()) // 4
console.log(numberHeap.extractMin()) // 5
console.log(numberHeap.extractMin()) // 7

// Working with custom objects
interface Person {
  name: string
  age: number
}

const personHeap = new MinHeap<Person>((a, b) => a.age - b.age)

personHeap.insert({ name: 'Alice', age: 30 })
personHeap.insert({ name: 'Bob', age: 25 })
personHeap.insert({ name: 'Charlie', age: 35 })

const youngest = personHeap.extractMin()
console.log(youngest) // { name: 'Bob', age: 25 }
```

## API

### Constructor

```typescript
new MinHeap<T>(compare: (a: T, b: T) => number)
```

Creates a new min heap with a custom comparison function.

### Methods

- `insert(value: T): void` - Insert a new value into the heap
- `peek(): T | undefined` - Get the minimum value without removing it
- `extractMin(): T | undefined` - Remove and return the minimum value
- `clear(): void` - Clear all values from the heap
- `toArray(): T[]` - Convert the heap to an array

### Properties

- `size: number` - Get the number of elements in the heap
- `isEmpty: boolean` - Check if the heap is empty

## License

MIT 