import fix from '../src/index';

test('Test enhancer is function', () => {
  expect(typeof fix === 'function').toBe(true);
});
