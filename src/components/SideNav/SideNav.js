'use strict';

/*
** Component to Menu as a SideNav.
** Resposively handled based on the screen width.
*/

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMenuVisibility } from 'actions/MenuActions';

import { Drawer, DrawerContent, DrawerHeader } from 'rmwc/Drawer';
import { ListItem, ListItemText } from 'rmwc/List';
import Submenu from 'components/SideNav/Submenu';
import './styles.scss';

function mapStateToProps(state) {
  return {
    menuItems: state.menu.menuItems,
    menuIsOpen: state.menu.menuIsOpen
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateMenuVisibility
  },dispatch);
}

// define each menu item.
const MenuItem = ({ url, label, currentPage }) => {
  return (
    <ListItem activated={ currentPage === url.split('/').pop() }>
      <Link to={url}>
        <ListItemText>{label}</ListItemText>
      </Link>
    </ListItem>
  );
};

export class SideNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: true
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.doSizeCheck());
    this.doSizeCheck();
  }

  // Resposively handle based on the screen width.
  doSizeCheck() {
    if (window.innerWidth > 640) {
      this.setState({ isMobile: false });
      this.props.updateMenuVisibility(true);
    } else {
      this.setState({ isMobile: true });
      this.props.updateMenuVisibility(false);
    }
  }

  // iterate recursively and render the menu items.
  contentToRender(content) {
    let _this = this;
    return content.map(m => {
      if (m.options) {
        const openMenuByDefault = _this.shouldMenuBeOpen(m.label)
        return (
          <Submenu label={m.label} key={m.label} open={openMenuByDefault}>
            {m.options.map(v => {
              return _this.contentToRender([v]);
            }
            )}
          </Submenu>
        );
      }
      return <MenuItem label={m.label} url={m.url} key={m.label} currentPage={_this.props.routeParams.ticker}/>;
    })
  }

  // decide if the submenu should be open.
  shouldMenuBeOpen(label) {
    return label.toLowerCase() === this.props.routeParams.category
        || label.toLowerCase() === this.props.routeParams.sector
        || label.toLowerCase() === this.props.routeParams.ticker;
  }

  render() {
    const contentItems = this.contentToRender(this.props.menuItems);
    return (
      <Drawer
        id="sideNav"
        open={this.props.menuIsOpen}
        persistent={!this.state.isMobile}
        temporary={this.state.isMobile}
        onClose={() => this.props.updateMenuVisibility(false)}
      >
        <DrawerHeader className="sideNav-header">
          US Stcoks
        </DrawerHeader>
        <DrawerContent className="sideNav-content">
          {contentItems}
        </DrawerContent>
      </Drawer>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideNav);
