import sum from '../server'

describe('unit test', () => {
  test('expect 1 + 2 = 3', () => {
    expect(sum(1, 2)).toEqual(3)
  })
})
