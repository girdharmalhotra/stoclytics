'use strict';

/*
** Component to Load the Stock Chart.
*/

import React from 'react';
import Chart from './Chart';
import { Icon } from 'rmwc/Icon';
import SMA from 'highcharts/indicators/indicators';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStockDetails,fetchStockDetailsSuccess,fetchStockDetailsFailure } from 'actions/StocksActions';

// import {SampleStockData} from 'data/SampleStockData';

function mapStateToProps(state, ownProps) {
  return {
    stocks: state.stocks,
    ownProps: ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchStockDetails,fetchStockDetailsSuccess,fetchStockDetailsFailure}, dispatch);
}

class StockChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadChart: false,
      loading: true,
      stock: {}
    };
  }

  componentDidMount() {
    this.props.fetchStockDetails(this.props.ticker).then(
      this.props.fetchStockDetailsSuccess
    ).catch(
      this.props.fetchStockDetailsFailure
    );
    // setTimeout( this.setState({ loadChart: true }),1000 );
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.stocks[nextProps.ticker]) {
      this.setState({ stock: this.props.stocks[nextProps.ticker], loading: false });
    } else {
      this.setState({ loading: true });
      this.props.fetchStockDetails(nextProps.ticker).then(
        this.props.fetchStockDetailsSuccess
      ).catch(
        this.props.fetchStockDetailsFailure
      );
    }
  }

  buildOptions() {
    let { meta,data } = this.state.stock;
    // split the data set into ohlc and volume
    const ohlc = [],
        volume = [],
        dataLength = data.length,
        // set the allowed units for data grouping
        groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ]];

    for (let i = 0; i < dataLength; i++) {
        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ]);

        volume.push([
            data[i][0], // the date
            data[i][5] // the volume
        ]);
    }

    const options = {
      rangeSelector: {
        buttons: [
          {
            type: 'week',
            count: 1,
            text: '1w'
          },{
            type: 'month',
            count: 1,
            text: '1m'
          },{
            type: 'month',
            count: 3,
            text: '3m'
          },{
            type: 'all',
            text: 'All'
          }
        ],
        selected: 2
      },
      // title: {
      //   text: 'NYSE:'+meta.Symbol
      // },
      // subtitle: {
      //   text: 'NYSE:AAPL'
      // },
      yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -2
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 1,
        resize: {
          enabled: true
        }
      },{
        labels: {
          align: 'right',
          x: -2
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 1
      }],
      tooltip: {
        split: true
      },
      plotOptions: {
        candlestick: {
          color: 'red',
          upColor: 'green'
        },
        series: {
          dataGrouping: {
            units: groupingUnits
          }
        }
      },
      series: [{
        type: 'candlestick',
        name: meta.Symbol,
        id: meta.Symbol,
        zIndex: 2,
        tooltip: {
          valuePrefix: '$'
        },
        data: ohlc.reverse()
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volume.reverse(),
        yAxis: 1
      },{
        type: 'sma',
        linkedTo: meta.Symbol,
        zIndex: 1,
        marker: {
            enabled: false
        },
        tooltip: {
          valuePrefix: '$'
        }
      }]
    }
    return options;
  }

  //Render the Stock Chart
  render() {
    if( !this.state.loading && Object.keys(this.state.stock).length > 0 ) {
      const chartOptions = this.buildOptions();
      return(
        <Chart container="chart-container" options={chartOptions} modules={[SMA]}></Chart>
      );
    } else {
      return( <Icon className="spin-animation" use="loop" /> );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StockChart);
