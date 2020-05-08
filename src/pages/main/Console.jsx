import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from '@emotion/styled';

import HistoryItem from './console/history/components/history-item';
import ConsoleInput from './console/input/components/console-input';

import classNames from 'classnames';


export class ConsolePaneUnconnected extends React.Component {
  static propTypes = {
    historyIds: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);
    this.historyScrollerRef = React.createRef();
  }

  componentDidUpdate() {
    // scroll to bottom on update
    this.historyScrollerRef.current.scrollTo({
      top: this.historyScrollerRef.current.scrollHeight,
      behavior: "smooth"
    });
  }

  render() {
    let histContents = [];
    if(this.props.historyIds.length) {
      histContents = this.props.historyIds.map(historyId => (
        <HistoryItem historyId={historyId} key={historyId} />
      ));
    } else {

    }

    return (
      <div
        className="pane-content"
        style={{
          overflow: "hidden"
        }}
      >
      <div
          className="console-pane"
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            maxWidth: "100%",
            height: "100%",
            overflow: "hidden"
          }}
        >
          <div
            className="history-items"
            style={{
              flexGrow: 1,
              maxHeight: "100%",
              overflow: "auto"
            }}
            ref={this.historyScrollerRef}
          >
            {histContents}
          </div>
          <ConsoleInput />
        </div>
      </div>
    );
  }
}


function areStatesEqual(next, prev) {
  return (
    isEqual(
      next.history.map(h => h.historyId),
      prev.history.map(h => h.historyId)
    )
  );
}

export function mapStateToProps(state) {
  return {
    historyIds: state.history.map(h => h.historyId),
  };
}

export default connect(mapStateToProps, null, null, { areStatesEqual })(
  ConsolePaneUnconnected
);


/*
export function Console(): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <div className={classNames([styles.button, styles.close])} />
          <div className={classNames([styles.button, styles.minimize])} />
          <div className={classNames([styles.button, styles.fullscreen])} />
        </div>
      </div>

      <div className={styles.content} aria-hidden="true">
        <code>

        </code>
      </div>
      <div>
        <ConsoleInput />
        </div>
    </div>
  );
}
*/
