'use strict';

/*
** Toolbar Header for the App.
** Menu Icon on the left will toggle the sideNav.
*/

import React from 'react';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMenuVisibility } from 'actions/MenuActions';

function mapStateToProps(state) {
  return {
    menuIsOpen: state.menu.menuIsOpen
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateMenuVisibility
  },dispatch);
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleMenuVisibility() {
    this.props.updateMenuVisibility(!this.props.menuIsOpen);
  }

  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"
              onClick={this.toggleMenuVisibility.bind(this)}/>
            <ToolbarTitle>Stoclytics</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <ToolbarIcon tag="a" use="account_circle" href="#" title="Logout" />
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
