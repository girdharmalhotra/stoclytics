'use strict';

/*
** Redux Actions for the Menu
*/

export const getMenuState = () => {
  return {
    type: 'GET_MENU_STATE'
  }
}

export const updateMenuState = (newState) => {
  return {
    type: 'UPDATE_MENU_STATE',
    payload: newState
  }
}

export const updateMenuVisibility = (newState) => {
  return {
    type: 'UPDATE_MENU_VISIBILITY',
    payload: newState
  }
}
