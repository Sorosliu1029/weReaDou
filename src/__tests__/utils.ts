import {
  calculateBookStrId,
  calculateScore,
  calculateSimilarity,
  cleanTitle,
} from '../utils'

test('calculateBookStrId: 822995', () => {
  expect(calculateBookStrId('822995')).toBe('a57325c05c8ed3a57224187')
})

test('calculateBookStrId: 695233', () => {
  expect(calculateBookStrId('695233')).toBe('ce032b305a9bc1ce0b0dd2a')
})

test('calculateScore: "abc", ["a", "b", "c"]', () => {
  expect(calculateScore('abc', ['a', 'b', 'c'])).toBe(1)
})

test('calculateScore: "0", ["a", "b", "c"]', () => {
  expect(calculateScore('0', ['a', 'b', 'c'])).toBe(0)
})

test('calculateScore: "abyz", ["a", "b", "c", "d"]', () => {
  expect(calculateScore('abyz', ['a', 'b', 'c', 'd'])).toBe(0.5)
})

test('calculateScore: "abyz", ["a", "b", "c"]', () => {
  expect(calculateScore('abyz', ['a', 'b', 'c'])).toBe(2 / 3)
})

test('calculateSimilarity: "abc", "abc"', () => {
  expect(calculateSimilarity('abc', 'abc')).toBe(1)
})

test('calculateSimilarity: "abc", "xyz"', () => {
  expect(calculateSimilarity('abc', 'xyz')).toBe(0)
})

test('calculateSimilarity: "abcd", "cdef"', () => {
  expect(calculateSimilarity('abcd', 'cdef')).toBe(1 / 3)
})

test('cleanTitle: "abcd"', () => {
  expect(cleanTitle('abcd')).toBe('abcd')
})

test('cleanTitle: "三国演义（全二册）"', () => {
  expect(cleanTitle('三国演义（全二册）')).toBe('三国演义')
})