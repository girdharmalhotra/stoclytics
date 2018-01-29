'use strict';

/*
** Component to Display the Details of the Stock in the Header.
*/

import React from 'react';
import { connect } from 'react-redux';

const monthMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
};

function mapStateToProps(state) {
  return {
    stocks: state.stocks
  }
}

class StockHeader extends React.Component {
  constructor(props) {
    super(props);

    this.stockMeta = {};
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.stocks[nextProps.ticker]) {
      const updated = new Date(nextProps.stocks[nextProps.ticker].meta['Last'].replace(/-/g, '/'));
      this.stockMeta = {
        symbol: 'NYSE:' + nextProps.ticker,
        updated: updated.getDate() + ' ' + monthMap[updated.getMonth()] + ', ' + updated.getFullYear(),
        prevClose: '$' + nextProps.stocks[nextProps.ticker].data[0][4],
        prevOpen: '$' + nextProps.stocks[nextProps.ticker].data[0][1]
      }
    }
  }

  render() {
    return(
      <div className="stock-header">
        <h2>{this.stockMeta.symbol}</h2>
        <div>
          <span className="sub-text"><span className="label">Open:</span> {this.stockMeta.prevOpen} </span> |
          <span className="sub-text"><span className="label"> Close:</span> {this.stockMeta.prevClose} </span> |
          <span className="sub-text"><span className="label"> Last Updated:</span> {this.stockMeta.updated}</span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(StockHeader);
