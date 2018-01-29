/*
** Reducer to handle the state of the Loaded Stocks across the app
*/

// Stocks Reducers
export const StocksReducers = (state = {}, action) => {
  // const currentState = state; // current app state.
  switch (action.type) {
    case 'FETCH_STOCK_DETAILS_SUCESS':
      const rawData = action.payload.payload.data;
      const stockData = { 'meta': {}, data:[] };
      let symbol = '';
      // Format the Data received as per our needs.
      // Format the MetaData.
      for(let metaKey in rawData['Meta Data']) {
        const formatKey = metaKey.split(' '),
              formattedKey = formatKey[1];
        if(formattedKey === 'Symbol') {
          symbol = rawData['Meta Data'][metaKey];
        }
        stockData['meta'][formattedKey] = rawData['Meta Data'][metaKey];
      }
      //Format the Time Series Data as per Highcharts.
      for(let key in rawData['Time Series (Daily)']) {
        const item = rawData['Time Series (Daily)'];
        const timeInMilliSeconds = new Date(key.replace(/-/g, '/')).getTime();
        const chartData = [timeInMilliSeconds]; // actual day data.
        for(let dayData in item[key]) {
          chartData.push(parseFloat(item[key][dayData])); // add open,close,high,low and volume values for date.
        }
        stockData['data'].push(chartData);
      }
      const dataToStore = {};
      dataToStore[symbol] = stockData;
      return Object.assign({}, state, dataToStore);
    case 'FETCH_STOCK_DETAILS_FAILURE':
      return state;
    default:
      return state;
  }
}
