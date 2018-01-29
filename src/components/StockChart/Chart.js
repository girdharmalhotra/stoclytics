'use strict';

/*
** Component to Create a Highcharts chart.
*/

import React from 'react';
import Highcharts from 'highcharts/highstock';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    menuIsOpen: state.menu.menuIsOpen
  }
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  createChart(props) {
    // Set container which the chart should render to.
    this.chart = new Highcharts[props.type || 'stockChart'](
        props.container,
        props.options
    );
  }

  // When the DOM is ready, create the chart.
  componentDidMount() {
    // Extend Highcharts with modules
    if (this.props.modules) {
        this.props.modules.forEach(function (module) {
            module(Highcharts);
        });
    }
    this.createChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.menuIsOpen !== this.props.menuIsOpen) {
      this.chart.reflow();
      return;
    }
    if(nextProps && nextProps.options && nextProps.options.series) {
      this.createChart(nextProps);
    }
  }

  //Destroy chart before unmount.
  componentWillUnmount() {
      this.chart.destroy();
  }

  //Create the div which the chart will be rendered to.
  render() {
      return React.createElement('div', { id: this.props.container });
  }
}

export default connect(mapStateToProps)(Chart);
