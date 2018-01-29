'use strict';

/*
** Redux Actions for the Stocks.
*/

export const fetchStockDetails = (ticker) => {
  return {
    type: 'FETCH_STOCK_DETAILS',
    payload: {
      client: 'stocks',
      request: {
        url: '/query?function=TIME_SERIES_DAILY&symbol='+ticker+'&apikey=UTKFPOW2N14RLEEH'
      }
    }
  }
}

export const fetchStockDetailsSuccess = (response) => {
  return {
    type: 'FETCH_STOCK_DETAILS_SUCESS',
    payload: response
  }
}

export const fetchStockDetailsFailure = (error) => {
  return {
    type: 'FETCH_STOCK_DETAILS_FAILURE',
    payload: error
  }
}
