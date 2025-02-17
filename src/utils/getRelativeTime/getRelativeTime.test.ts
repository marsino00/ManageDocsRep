import getRelativeTime from './getRelativeTime';

describe('getRelativeTime', () => {
  const fixedNow = new Date('2023-01-10T12:00:00.000Z');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns seconds ago when diff is less than 60 seconds', () => {
    const dateString = new Date('2023-01-10T11:59:55.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('5 seconds ago');
  });

  it('returns minutes ago when diff is less than 60 minutes', () => {
    const dateString = new Date('2023-01-10T11:50:00.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('10 minutes ago');
  });

  it('returns hours ago when diff is less than 24 hours', () => {
    const dateString = new Date('2023-01-10T09:00:00.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('3 hours ago');
  });

  it('returns days ago when diff is less than 7 days', () => {
    const dateString = new Date('2023-01-08T12:00:00.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('2 days ago');
  });

  it('returns weeks ago when diff is less than 4 weeks', () => {
    const dateString = new Date('2022-12-27T12:00:00.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('2 weeks ago');
  });

  it('returns months ago when diff is less than 12 months', () => {
    const dateString = new Date('2022-11-10T12:00:00.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('2 months ago');
  });

  it('returns years ago when diff is >= 12 months', () => {
    const dateString = new Date('2022-01-10T12:00:00.000Z').toISOString();
    expect(getRelativeTime(dateString)).toBe('1 year ago');
  });
});
