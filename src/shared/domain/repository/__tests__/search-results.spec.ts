import { SearchResult } from '../search-result';

describe('SearchResult', () => {
  describe('given an arrange of props to create a SearchResult instance', () => {
    const arrange = [
      {
        props: {
          items: [],
          total: 0,
          current_page: 1,
          per_page: 15,
        },
        expected: {
          items: [],
          total: 0,
          current_page: 1,
          per_page: 15,
          last_page: 1,
        },
      },
      {
        props: {
          items: [],
          total: 100,
          current_page: 1,
          per_page: 20,
        },
        expected: {
          items: [],
          total: 100,
          current_page: 1,
          per_page: 20,
          last_page: 5,
        },
      },
      {
        props: {
          items: [],
          total: 101,
          current_page: 1,
          per_page: 20,
        },
        expected: {
          items: [],
          total: 101,
          current_page: 1,
          per_page: 20,
          last_page: 6,
        },
      },
    ];

    test.each(arrange)('when props are $props, then SearchResult should be $expected', ({ props, expected }) => {
      const searchResult = new SearchResult(props);
      expect(searchResult).toMatchObject(expected);
    });
  });
});
