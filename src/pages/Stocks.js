'use strict';

import React from 'react';

import { Grid, GridCell } from 'rmwc/Grid';
import { StockChart, StockHeader } from 'components/StockChart';
import { NewsLister, NewsHeader} from 'components/NewsLister';

import './styles.scss';

class Stocks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid className="grid-body">
        <GridCell span="9" tablet="8" phone="4">
          <StockHeader {...this.props.params}/>
          <StockChart {...this.props.params}/>
        </GridCell>
        <GridCell span="3" tablet="8" phone="4">
          <NewsHeader />
          <NewsLister />
        </GridCell>
      </Grid>
    );
  }
}

export default Stocks;
