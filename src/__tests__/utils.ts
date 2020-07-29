import { calculateBookStrId } from '../utils'

test('id: 822995', () => {
  expect(calculateBookStrId('822995')).toBe('a57325c05c8ed3a57224187')
})

test('id: 695233', () => {
  expect(calculateBookStrId('695233')).toBe('ce032b305a9bc1ce0b0dd2a')
})
