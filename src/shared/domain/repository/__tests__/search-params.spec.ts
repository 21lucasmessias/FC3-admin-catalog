import { SearchParams } from '../search-params';

describe('SearchParams', () => {
  describe('given a new SearchParams instance', () => {
    let params: SearchParams;

    beforeEach(() => {
      params = new SearchParams();
    });

    describe('when using the default values', () => {
      test('then page should be 1', () => {
        expect(params.page).toBe(1);
      });

      test('then per_page should be 15', () => {
        expect(params.per_page).toBe(15);
      });

      test('then sort should be null', () => {
        expect(params.sort).toBeNull();
      });

      test('then sort_dir should be null', () => {
        expect(params.sort_dir).toBeNull();
      });

      test('then filter should be null', () => {
        expect(params.filter).toBeNull();
      });
    });
  });

  describe('given an arrange of page values', () => {
    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: '', expected: 1 },
      { page: 'fake', expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    test.each(arrange)('when page is $page, then page should be $expected', ({ page, expected }) => {
      const params = new SearchParams({ page: page as any });
      expect(params.page).toBe(expected);
    });
  });

  describe('given an arrange of per_page values', () => {
    const arrange = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: '', expected: 15 },
      { per_page: 'fake', expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 5.5, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 1, expected: 1 },
      { per_page: 2, expected: 2 },
      { per_page: 10, expected: 10 },
    ];

    test.each(arrange)('when per_page is $per_page, then per_page should be $expected', ({ per_page, expected }) => {
      const params = new SearchParams({ per_page: per_page as any });
      expect(params.per_page).toBe(expected);
    });
  });

  describe('given an arrange of sort values', () => {
    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: '', expected: null },
      { sort: 0, expected: '0' },
      { sort: -1, expected: '-1' },
      { sort: 5.5, expected: '5.5' },
      { sort: true, expected: 'true' },
      { sort: false, expected: 'false' },
      { sort: {}, expected: '[object Object]' },
      { sort: 'field', expected: 'field' },
    ];

    test.each(arrange)('when sort is $sort, then sort should be $expected', ({ sort, expected }) => {
      const params = new SearchParams({ sort: sort as any });
      expect(params.sort).toBe(expected);
    });
  });

  describe('given an arrange of sort_dir values', () => {
    const arrange = [
      { sort_dir: null, expected: 'asc' },
      { sort_dir: undefined, expected: 'asc' },
      { sort_dir: '', expected: 'asc' },
      { sort_dir: 0, expected: 'asc' },
      { sort_dir: 'fake', expected: 'asc' },
      { sort_dir: 'asc', expected: 'asc' },
      { sort_dir: 'ASC', expected: 'asc' },
      { sort_dir: 'desc', expected: 'desc' },
      { sort_dir: 'DESC', expected: 'desc' },
    ];

    test.each(arrange)('when sort_dir is $sort_dir, then sort_dir should be $expected', ({ sort_dir, expected }) => {
      const params = new SearchParams({ sort: 'field', sort_dir: sort_dir as any });
      expect(params.sort_dir).toBe(expected);
    });
  });

  describe('given an arrange of filter values', () => {
    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: '', expected: null },
      { filter: 0, expected: '0' },
      { filter: -1, expected: '-1' },
      { filter: 5.5, expected: '5.5' },
      { filter: true, expected: 'true' },
      { filter: false, expected: 'false' },
      { filter: {}, expected: '[object Object]' },
      { filter: 'field', expected: 'field' },
    ];

    test.each(arrange)('when filter is $filter, then filter should be $expected', ({ filter, expected }) => {
      const params = new SearchParams({ filter: filter as any });
      expect(params.filter).toBe(expected);
    });
  });
});
