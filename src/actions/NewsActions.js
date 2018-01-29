'use strict';

/*
** Redux Actions for the News
*/

export const fetchNews = () => {
  return {
    type: 'FETCH_NEWS',
    payload: {
      client: 'default',
      request: {
        url: '/json/get/bPdFkqPEte?indent=2'
      }
    }
  }
}

export const fetchNewsSuccess = (response) => {
  return {
    type: 'FETCH_NEWS_SUCESS',
    payload: response
  }
}

export const fetchNewsFailure = (error) => {
  return {
    type: 'FETCH_NEWS_FAILURE',
    payload: error
  }
}
