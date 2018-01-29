'use strict';

/*
** Component to List the News Items.
*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNews,fetchNewsSuccess,fetchNewsFailure } from 'actions/NewsActions';

import { List,SimpleListItem } from 'rmwc/List';
import NewsDetailsDialog from './NewsDetailsDialog';

import './styles.scss';

function mapStateToProps(state) {
  return {
    news: state.news
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchNews,fetchNewsFailure,fetchNewsSuccess},dispatch);
}

class NewsLister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      newsItemViewed: {}
    };
  }

  closeDialog = () => this.setState({ openDialog: false });
  openDialog = (item) => this.setState({ newsItemViewed: item, openDialog: true });

  componentDidMount() {
    // Fetch the news.
    this.props.fetchNews().then(
      this.props.fetchNewsSuccess
    ).catch(
      this.props.fetchNewsFailure
    );
  }

  renderDialog() {
    if(Object.keys(this.state.newsItemViewed).length > 0) {
      return(<NewsDetailsDialog newsItem={this.state.newsItemViewed} closeDialog={this.closeDialog.bind(this)}/>);
    } else {
      return null;
    }
  }

  render() {
    const newsItems = this.props.news.map( (item,idx) => <SimpleListItem className="headline" key={idx} onClick={() => this.openDialog(item)} text={item.sentence} meta="library_books" />);

    return (
      <div className="news-lister">
        <List className="headline-list" dense>
          {newsItems}
        </List>
        {this.state.openDialog ? this.renderDialog() : null}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsLister);
