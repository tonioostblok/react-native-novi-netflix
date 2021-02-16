import { NETFLIX_API_URL, API_REQUEST_HEADERS, API_REQUEST_OBJECT } from '../constants/api';

export const FETCH_SHOWS_CHANGE = 'FETCH_SHOWS_CHANGE';

export function fetchShowsChange(payload) {
  return ({
    type: FETCH_SHOWS_CHANGE,
    payload,
  });
}

/**
 * Fetches active netflix shows. Countrylist default id is for the Netherlands
 * @param offset
 * @param limit
 * @param countryList
 * @returns {function(*): Promise<unknown>}
 */
export const fetchActualShows = (offset = 0, limit = 10, countryList = 67, query = 'filterBy= New last 24 hours') => (dispatch) => {
  const requestObj = {
    ...API_REQUEST_OBJECT,
    method: 'GET',
    headers: {
      ...API_REQUEST_HEADERS,
    },
  };
  return fetch(`${NETFLIX_API_URL}/search?${query}&offset=${offset}&limit=${limit}&countrylist=${countryList}`, requestObj)
    .then((response) => Promise.resolve(response.json())).then((data) => {
      dispatch(fetchShowsChange(data.results));
      return Promise.resolve(data);
    }).catch((err) => {
      console.error(err);
    });
};

/**
 * Fetches deleted netflix shows. Default for countryList is the id of the Netherlands
 * @param offset
 * @param limit
 * @param countryList
 * @returns {function(*=): Promise<unknown>}
 */
export const fetchDeletedShows = (offset = 0,
  limit = 10,
  countryList = 67) => (dispatch) => {
  const requestObj = {
    ...API_REQUEST_OBJECT,
    method: 'GET',
    headers: {
      ...API_REQUEST_HEADERS,
    },
  };
  return fetch(`${NETFLIX_API_URL}expiring?offset=${offset}&limit=${limit}&countrylist=${countryList}`, requestObj)
    .then((response) => Promise.resolve(response.json())).then((data) => {
      /**
       * due to the api not showing actual title details in the expiring endpoint,
       * we need to do this longer way of feching them.
      */
      const sortedByExpireDate = data.results.sort((a, b) => (
        new Date(a.expiredate) - new Date(b.expiredate)));
      const promises = sortedByExpireDate.map((val) => fetch(`${NETFLIX_API_URL}title?netflixid=${val.netflixid}`, requestObj).then((response) => Promise.resolve(response.json())).then((response) => {
        const show = response.results[0];
        return {
          title: show.title,
          img: show.img,
          year: show.year,
          synopsis: show.synopsis,
          expireDate: val.expiredate,
        };
      }));
      Promise.all(promises).then((res) => {
        dispatch(fetchShowsChange(res));
      });
      return Promise.resolve(data);
    }).catch((err) => {
      console.error(err);
    });
};

export const initialState = {
  shows: [],
};

export default function netflixReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHOWS_CHANGE:
      return { ...state, shows: action.payload };
    default:
      return { ...state };
  }
}
