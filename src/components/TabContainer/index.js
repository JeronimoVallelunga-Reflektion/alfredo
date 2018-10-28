import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

class TabContainer extends Component {
  state = {
    events: [],
  };

  componentWillMount() {
    const { tracker } = this.props;
    this.setState({ events: tracker.get() });
    tracker.onChange(() => {
      this.setState({ events: tracker.get() });
    });
  }

  render() {
    const { events } = this.state;
    return (
      <div className={style.root}>
        { events.reverse().map(event => (<div className={style.row}>{JSON.stringify(event)}</div>)) }
      </div>
    );
  }
}

TabContainer.propTypes = {
  tracker: PropTypes.object.isRequired,
};

export default TabContainer;