'use strict';

/*
** Component for the News Header.
*/

import React from 'react';

class NewsHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="news-header">
        <h2>Latest News</h2>
      </div>
    );
  }
}

export default NewsHeader;
