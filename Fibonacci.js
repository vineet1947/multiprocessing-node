class Fibonacci {
  // Recursive method to get the nth Fibonacci number
  getNthNumber(n) {
    if (n <= 1) {
      return n
    }
    return this.getNthNumber(n - 1) + this.getNthNumber(n - 2)
  }

  // Method to calculate the sum of Fibonacci numbers up to nth
  getFibonacciSum(n) {
    let sum = 0
    for (let i = 0; i <= n; i++) {
      sum += this.getNthNumber(i)
    }
    return sum
  }
}

module.exports = new Fibonacci()

// class Fibonacci {
//   constructor() {
//     this.memo = {}
//   }

//   // Recursive method with memoization to get the nth Fibonacci number
//   getNthNumber(n) {
//     if (n <= 1) {
//       return n
//     }
//     if (this.memo[n]) {
//       return this.memo[n]
//     }
//     this.memo[n] = this.getNthNumber(n - 1) + this.getNthNumber(n - 2)
//     return this.memo[n]
//   }

//   // Method to calculate the sum of Fibonacci numbers up to nth
//   getFibonacciSum(n) {
//     let sum = 0
//     for (let i = 0; i <= n; i++) {
//       sum += this.getNthNumber(i)
//     }
//     return sum
//   }
// }

// module.exports = Fibonacci
