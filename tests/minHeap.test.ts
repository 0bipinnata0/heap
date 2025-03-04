import { describe, it, expect } from 'vitest'
import { push, pop, peek } from '../src'

describe('MinHeap', () => {
  describe('empty heap', () => {
    it('should return null when peeking empty heap', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      expect(peek(heap)).toBeNull()
    })

    it('should return null when popping empty heap', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      expect(pop(heap)).toBeNull()
    })
  })

  describe('single element heap', () => {
    it('should handle single element operations', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      const node = { id: 1, sortIndex: 5 }
      
      push(heap, node)
      expect(peek(heap)).toBe(node)
      expect(pop(heap)).toBe(node)
      expect(heap.length).toBe(0)
    })
  })

  describe('multiple elements heap', () => {
    it('should maintain min heap property', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: 5 })
      push(heap, { id: 2, sortIndex: 3 })
      push(heap, { id: 3, sortIndex: 7 })
      push(heap, { id: 4, sortIndex: 1 })
      
      expect(peek(heap)?.sortIndex).toBe(1)
      expect(pop(heap)?.sortIndex).toBe(1)
      expect(peek(heap)?.sortIndex).toBe(3)
    })

    it('should extract minimum elements in order', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: 5 })
      push(heap, { id: 2, sortIndex: 3 })
      push(heap, { id: 3, sortIndex: 7 })
      push(heap, { id: 4, sortIndex: 1 })
      push(heap, { id: 5, sortIndex: 4 })

      expect(pop(heap)?.sortIndex).toBe(1)
      expect(pop(heap)?.sortIndex).toBe(3)
      expect(pop(heap)?.sortIndex).toBe(4)
      expect(pop(heap)?.sortIndex).toBe(5)
      expect(pop(heap)?.sortIndex).toBe(7)
      expect(pop(heap)).toBeNull()
    })

    it('should handle nodes with same sortIndex', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: 5 })
      push(heap, { id: 2, sortIndex: 5 })
      push(heap, { id: 3, sortIndex: 5 })
      
      const first = pop(heap)
      const second = pop(heap)
      const third = pop(heap)
      
      expect(first?.sortIndex).toBe(5)
      expect(second?.sortIndex).toBe(5)
      expect(third?.sortIndex).toBe(5)
      expect(pop(heap)).toBeNull()
    })

    it('should handle large number of elements', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      const size = 1000
      
      // Insert elements in random order
      for (let i = size - 1; i >= 0; i--) {
        push(heap, { id: i, sortIndex: i })
      }
      
      // Verify elements are extracted in ascending order
      for (let i = 0; i < size; i++) {
        const node = pop(heap)
        expect(node?.sortIndex).toBe(i)
      }
      
      expect(pop(heap)).toBeNull()
    })

    it('should handle ascending sequence', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      for (let i = 0; i < 5; i++) {
        push(heap, { id: i, sortIndex: i })
      }
      
      for (let i = 0; i < 5; i++) {
        expect(pop(heap)?.sortIndex).toBe(i)
      }
    })

    it('should handle descending sequence', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      for (let i = 4; i >= 0; i--) {
        push(heap, { id: i, sortIndex: i })
      }
      
      for (let i = 0; i < 5; i++) {
        expect(pop(heap)?.sortIndex).toBe(i)
      }
    })

    it('should maintain heap property after multiple operations', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      // Push some elements
      push(heap, { id: 1, sortIndex: 5 })
      push(heap, { id: 2, sortIndex: 3 })
      push(heap, { id: 3, sortIndex: 7 })
      
      // Pop minimum
      expect(pop(heap)?.sortIndex).toBe(3)
      
      // Push more elements
      push(heap, { id: 4, sortIndex: 2 })
      push(heap, { id: 5, sortIndex: 4 })
      
      // Verify order
      expect(pop(heap)?.sortIndex).toBe(2)
      expect(pop(heap)?.sortIndex).toBe(4)
      expect(pop(heap)?.sortIndex).toBe(5)
      expect(pop(heap)?.sortIndex).toBe(7)
    })
  })
})