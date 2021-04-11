import { HowLongPipe } from './how-long.pipe';

describe('HowLongPipe', () => {
  let pipe: HowLongPipe;

  beforeEach(() => {
    const baseTime = new Date(2021, 2, 3);
    jest.useFakeTimers('modern');
    jest.setSystemTime(baseTime);

    pipe = new HowLongPipe();
  });

  it('transforms "2016-02-23" to "5 years ago"', () => {
    expect(pipe.transform('2016-02-23')).toBe('5 years ago');
  });

  it('transforms "2021-01-23" to "2 months ago"', () => {
    expect(pipe.transform('2021-01-23')).toBe('2 months ago');
  });

  it('transforms "2021-03-01" to "2 days ago"', () => {
    expect(pipe.transform('2021-03-01')).toBe('2 days ago');
  })
});

