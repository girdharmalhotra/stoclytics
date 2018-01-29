
/*
** Reducer to handle the state of the News Lister across the app
*/

// News Reducers
export const NewsReducers = (state = [], action) => {
  // const currentState = state; // current app state.
  switch (action.type) {
    case 'FETCH_NEWS_SUCESS':
      return [...action.payload.payload.data];
    case 'FETCH_NEWS_FAILURE':
      return [];
    default:
      return state;
  }
}
