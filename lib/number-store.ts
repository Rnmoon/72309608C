export class NumberStore {
  private numbers: number[] = []
  private windowSize: number

  constructor(windowSize: number) {
    this.windowSize = windowSize
  }

  /**
   * Add a number to the store, ensuring uniqueness and respecting window size
   */
  addNumber(num: number): void {
    // Check if the number already exists in the store
    if (!this.numbers.includes(num)) {
      // If we've reached the window size, remove the oldest number
      if (this.numbers.length >= this.windowSize) {
        this.numbers.shift() // Remove the oldest number (first in array)
      }

      // Add the new number
      this.numbers.push(num)
    }
  }

  /**
   * Get all numbers in the store
   */
  getNumbers(): number[] {
    return this.numbers
  }

  /**
   * Calculate the average of all numbers in the store
   */
  getAverage(): number {
    if (this.numbers.length === 0) {
      return 0
    }

    const sum = this.numbers.reduce((acc, num) => acc + num, 0)
    return sum / this.numbers.length
  }

  /**
   * Clear all numbers from the store
   */
  clear(): void {
    this.numbers = []
  }

  /**
   * Set the window size
   */
  setWindowSize(size: number): void {
    this.windowSize = size

    // If current numbers exceed new window size, trim the array
    if (this.numbers.length > this.windowSize) {
      this.numbers = this.numbers.slice(-this.windowSize)
    }
  }
}
