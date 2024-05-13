describe('Array operations', () => {
  test('should add elements correctly', () => {
    const result = [1, 2, 3].concat([4, 5, 6]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
