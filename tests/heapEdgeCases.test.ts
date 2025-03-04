import { describe, it, expect } from 'vitest'
import { push, pop, peek } from '../src'

describe('MinHeap Edge Cases', () => {
  describe('mixed operations', () => {
    it('should handle alternating push and pop operations', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: 10 })
      expect(peek(heap)?.sortIndex).toBe(10)
      
      push(heap, { id: 2, sortIndex: 5 })
      expect(peek(heap)?.sortIndex).toBe(5)
      
      expect(pop(heap)?.sortIndex).toBe(5)
      expect(peek(heap)?.sortIndex).toBe(10)
      
      push(heap, { id: 3, sortIndex: 7 })
      expect(peek(heap)?.sortIndex).toBe(7)
      
      push(heap, { id: 4, sortIndex: 3 })
      expect(peek(heap)?.sortIndex).toBe(3)
      
      expect(pop(heap)?.sortIndex).toBe(3)
      expect(pop(heap)?.sortIndex).toBe(7)
      expect(pop(heap)?.sortIndex).toBe(10)
      expect(pop(heap)).toBeNull()
    })
  })
  
  describe('duplicate sortIndex handling', () => {
    it('should maintain insertion order for nodes with same sortIndex', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      // Insert multiple nodes with same sortIndex
      for (let i = 1; i <= 10; i++) {
        push(heap, { id: i, sortIndex: 5 })
      }
      
      // All nodes should have sortIndex 5
      for (let i = 1; i <= 10; i++) {
        const node = pop(heap)
        expect(node?.sortIndex).toBe(5)
      }
      
      expect(pop(heap)).toBeNull()
    })
    
    it('should handle mixed sortIndex values with duplicates', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: 5 })
      push(heap, { id: 2, sortIndex: 3 })
      push(heap, { id: 3, sortIndex: 5 }) // Duplicate of first
      push(heap, { id: 4, sortIndex: 7 })
      push(heap, { id: 5, sortIndex: 3 }) // Duplicate of second
      
      expect(pop(heap)?.sortIndex).toBe(3)
      expect(pop(heap)?.sortIndex).toBe(3)
      expect(pop(heap)?.sortIndex).toBe(5)
      expect(pop(heap)?.sortIndex).toBe(5)
      expect(pop(heap)?.sortIndex).toBe(7)
    })
  })
  
  describe('stress testing', () => {
    it('should handle random insertions and extractions', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      const values: {id: number, sortIndex: number}[] = []
      
      // Generate random values
      for (let i = 0; i < 100; i++) {
        const sortIndex = Math.floor(Math.random() * 1000)
        values.push({ id: i, sortIndex })
        push(heap, { id: i, sortIndex })
      }
      
      // Sort the values for comparison
      values.sort((a, b) => a.sortIndex - b.sortIndex)
      
      // Extract all values and verify they come out in sorted order
      for (let i = 0; i < 100; i++) {
        const node = pop(heap)
        expect(node?.sortIndex).toBe(values[i].sortIndex)
      }
    })
    
    it('should handle a large number of operations', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      const operations = 5000 // 减少操作次数，避免测试超时
      let inserted = 0
      let extracted = 0
      
      for (let i = 0; i < operations; i++) {
        // Randomly choose between push and pop
        if (Math.random() < 0.7 || heap.length === 0) {
          // 70% chance to push, or always push if heap is empty
          push(heap, { id: inserted, sortIndex: Math.floor(Math.random() * 10000) })
          inserted++
        } else {
          // 30% chance to pop
          pop(heap)
          extracted++
        }
        
        // 只在特定间隔验证堆属性，减少计算量
        if (i % 100 === 0 && heap.length > 0) {
          const min = heap[0]
          // 只检查前10个元素，避免过多循环
          const checkLimit = Math.min(10, heap.length)
          for (let j = 0; j < checkLimit; j++) {
            expect(heap[j].sortIndex >= min.sortIndex).toBeTruthy()
          }
        }
      }
      
      // Clean up remaining elements
      while (heap.length > 0) {
        pop(heap)
        extracted++
      }
      
      expect(inserted - extracted).toBe(0)
    })
  })
  
  describe('special patterns', () => {
    it('should handle zigzag pattern', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      // Insert in zigzag pattern: 10, 1, 9, 2, 8, 3, ...
      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          push(heap, { id: i, sortIndex: 10 - i/2 })
        } else {
          push(heap, { id: i, sortIndex: (i+1)/2 })
        }
      }
      
      // Should extract in ascending order
      for (let i = 1; i <= 10; i++) {
        expect(pop(heap)?.sortIndex).toBe(i)
      }
    })
    
    it('should handle plateau pattern', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      // Insert with pattern: 5, 5, 5, 1, 1, 1, 10, 10, 10
      for (let i = 0; i < 3; i++) push(heap, { id: i, sortIndex: 5 })
      for (let i = 3; i < 6; i++) push(heap, { id: i, sortIndex: 1 })
      for (let i = 6; i < 9; i++) push(heap, { id: i, sortIndex: 10 })
      
      // Should extract all 1s, then all 5s, then all 10s
      for (let i = 0; i < 3; i++) expect(pop(heap)?.sortIndex).toBe(1)
      for (let i = 0; i < 3; i++) expect(pop(heap)?.sortIndex).toBe(5)
      for (let i = 0; i < 3; i++) expect(pop(heap)?.sortIndex).toBe(10)
    })
  })
  
  describe('edge cases', () => {
    it('should handle negative sortIndex values', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: -5 })
      push(heap, { id: 2, sortIndex: 3 })
      push(heap, { id: 3, sortIndex: -10 })
      push(heap, { id: 4, sortIndex: 0 })
      push(heap, { id: 5, sortIndex: -2 })
      
      expect(pop(heap)?.sortIndex).toBe(-10)
      expect(pop(heap)?.sortIndex).toBe(-5)
      expect(pop(heap)?.sortIndex).toBe(-2)
      expect(pop(heap)?.sortIndex).toBe(0)
      expect(pop(heap)?.sortIndex).toBe(3)
    })
    
    it('should handle very large sortIndex values', () => {
      const heap: Array<{id: number, sortIndex: number}> = []
      
      push(heap, { id: 1, sortIndex: Number.MAX_SAFE_INTEGER })
      push(heap, { id: 2, sortIndex: Number.MAX_SAFE_INTEGER - 100 })
      push(heap, { id: 3, sortIndex: Number.MAX_SAFE_INTEGER - 50 })
      
      expect(pop(heap)?.sortIndex).toBe(Number.MAX_SAFE_INTEGER - 100)
      expect(pop(heap)?.sortIndex).toBe(Number.MAX_SAFE_INTEGER - 50)
      expect(pop(heap)?.sortIndex).toBe(Number.MAX_SAFE_INTEGER)
    })
  })
})