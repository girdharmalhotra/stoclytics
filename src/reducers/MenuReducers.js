'use strict';

/*
** Reducer to handle the state of the menu across the app
*/

import { MenuContent } from 'data/MenuContent';

const appMenuState = {
  menuItems: MenuContent,
  menuIsOpen: false
};

// Menu Reducers
export const MenuReducers = (state = appMenuState, action) => {
  const currentState = state; // current app state.
  switch (action.type) {
    case 'GET_MENU_STATE':
      return currentState;
    case 'UPDATE_MENU_VISIBILITY':
      const newState = Object.assign({},currentState,{menuIsOpen: action.payload});
      return newState;
    default:
      return state;
  }
}
