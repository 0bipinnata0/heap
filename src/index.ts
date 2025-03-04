export class MinHeap<T> {
  private heap: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  /**
   * Get the size of the heap
   */
  get size(): number {
    return this.heap.length;
  }

  /**
   * Check if the heap is empty
   */
  get isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Insert a new element into the heap
   */
  insert(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.size - 1);
  }

  /**
   * Get the minimum element without removing it
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Remove and return the minimum element
   */
  extractMin(): T | undefined {
    if (this.isEmpty) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop()!;
    
    if (!this.isEmpty) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return min;
  }

  /**
   * Clear all elements from the heap
   */
  clear(): void {
    this.heap = [];
  }

  /**
   * Convert the heap to an array
   */
  toArray(): T[] {
    return [...this.heap];
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;

      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (
        leftChildIndex < this.size &&
        this.compare(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size &&
        this.compare(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === index) break;

      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      index = smallestIndex;
    }
  }
} 