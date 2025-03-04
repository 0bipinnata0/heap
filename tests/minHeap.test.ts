import { describe, it, expect } from 'vitest'
import { MinHeap } from '../src'

describe('MinHeap', () => {
  describe('number heap', () => {
    it('should maintain min heap property', () => {
      const heap = new MinHeap<number>((a, b) => a - b)
      
      heap.insert(5)
      heap.insert(3)
      heap.insert(7)
      heap.insert(1)
      heap.insert(4)

      expect(heap.peek()).toBe(1)
      expect(heap.size).toBe(5)
      expect(heap.isEmpty).toBe(false)
    })

    it('should extract minimum elements in order', () => {
      const heap = new MinHeap<number>((a, b) => a - b)
      
      heap.insert(5)
      heap.insert(3)
      heap.insert(7)
      heap.insert(1)
      heap.insert(4)

      expect(heap.extractMin()).toBe(1)
      expect(heap.extractMin()).toBe(3)
      expect(heap.extractMin()).toBe(4)
      expect(heap.extractMin()).toBe(5)
      expect(heap.extractMin()).toBe(7)
      expect(heap.extractMin()).toBeUndefined()
      expect(heap.isEmpty).toBe(true)
    })

    it('should clear all elements', () => {
      const heap = new MinHeap<number>((a, b) => a - b)
      
      heap.insert(5)
      heap.insert(3)
      heap.insert(7)

      expect(heap.size).toBe(3)
      heap.clear()
      expect(heap.isEmpty).toBe(true)
    })

    it('should convert to array', () => {
      const heap = new MinHeap<number>((a, b) => a - b)
      
      heap.insert(5)
      heap.insert(3)
      heap.insert(7)
      heap.insert(1)
      heap.insert(4)

      const array = heap.toArray()
      expect(array).toHaveLength(5)
      expect(array).toContain(1)
      expect(array).toContain(3)
      expect(array).toContain(4)
      expect(array).toContain(5)
      expect(array).toContain(7)
    })
  })

  describe('object heap', () => {
    interface Person {
      name: string
      age: number
    }

    it('should work with custom objects', () => {
      const heap = new MinHeap<Person>((a, b) => a.age - b.age)
      
      heap.insert({ name: 'Alice', age: 30 })
      heap.insert({ name: 'Bob', age: 25 })
      heap.insert({ name: 'Charlie', age: 35 })

      const youngest = heap.extractMin()
      expect(youngest).toEqual({ name: 'Bob', age: 25 })
    })
  })
}) 