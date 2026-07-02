import { fmt, parseDuration, debounce, shuffle } from '../utils';

describe('Audio utilities', () => {
  describe('fmt', () => {
    test('formats seconds to MM:SS correctly', () => {
      expect(fmt(0)).toBe('0:00');
      expect(fmt(30)).toBe('0:30');
      expect(fmt(60)).toBe('1:00');
      expect(fmt(90)).toBe('1:30');
      expect(fmt(3661)).toBe('61:01');
    });

    test('handles falsy or NaN values gracefully', () => {
      expect(fmt(null)).toBe('0:00');
      expect(fmt(undefined)).toBe('0:00');
      expect(fmt(NaN)).toBe('0:00');
    });
  });

  describe('parseDuration', () => {
    test('parses MM:SS format correctly', () => {
      expect(parseDuration('3:42')).toBe(222);
      expect(parseDuration('4:18')).toBe(258);
      expect(parseDuration('0:30')).toBe(30);
    });

    test('parses HH:MM:SS format correctly', () => {
      expect(parseDuration('1:30:00')).toBe(5400);
      expect(parseDuration('2:15:30')).toBe(8130);
    });

    test('returns default value for falsy input', () => {
      expect(parseDuration(null)).toBe(1200);
      expect(parseDuration(undefined)).toBe(1200);
      expect(parseDuration('')).toBe(1200);
    });
  });

  describe('debounce', () => {
    test('debounces function calls', () => {
      jest.useFakeTimers();
      const fn = jest.fn();
      const debounced = debounce(fn, 300);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('shuffle', () => {
    test('returns a new array with same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).not.toBe(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    test('handles empty array', () => {
      expect(shuffle([])).toEqual([]);
    });

    test('handles single element array', () => {
      expect(shuffle([1])).toEqual([1]);
    });
  });
});
