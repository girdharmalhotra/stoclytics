'use strict';

/*
** Component to Load the Details of the Selected News Item in a Dialog.
*/

import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from 'rmwc/Dialog';

class NewsDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { newsItem } = this.props;
    return (
      <Dialog open={true} onClose={this.props.closeDialog}>
        <DialogSurface>
          <DialogHeader>
            <DialogHeaderTitle>{newsItem.sentence}</DialogHeaderTitle>
          </DialogHeader>
          <DialogBody>{newsItem.context_after}</DialogBody>
          <DialogFooter>
              <DialogFooterButton cancel>Close</DialogFooterButton>
          </DialogFooter>
        </DialogSurface>
        <DialogBackdrop />
      </Dialog>
    );
  }
}

export default NewsDetailsDialog;
