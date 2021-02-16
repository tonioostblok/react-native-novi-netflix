import reducer from '../src/store/netflix.js';
import * as netflixStore from '../src/store/netflix.js';

describe('Netflix reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        shows: [],
      },
    );
  });

  it('should handle FETCH_SHOWS_CHANGE', () => {
    const payload = [
      {
        title: 'Breaking bad',
        img: 'https://lorem.pixel/?width=300&height=300',
        year: '2013',
        synopsis: 'Breaking bad is about a Science teacher who creates meth inside a caravan',
      },
    ];
    expect(
      reducer([], {
        type: netflixStore.FETCH_SHOWS_CHANGE,
        payload,
      }),
    ).toEqual({
      shows: [
        {
          title: 'Breaking bad',
          img: 'https://lorem.pixel/?width=300&height=300',
          year: '2013',
          synopsis: 'Breaking bad is about a Science teacher who creates meth inside a caravan',
        },
      ],
    });
  });
});
