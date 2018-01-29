'use strict';

/*
** Wrapper Component for the App.
** Will display the Toolbar Header and SideNav on Everypage.
** Child components will be rendered as per the Route.
*/

import React from 'react';
import Header from './Header';
import SideNav from 'components/SideNav/SideNav';

class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pageId = this.props.params.ticker;

    return (
      <div id={pageId}>
        <Header />
        <SideNav routeParams={this.props.params}/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default PageWrapper;
