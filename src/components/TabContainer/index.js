import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

class Log extends PureComponent {
  render() {
    const { event } = this.props;
    return <div className={style.row}>{event}...</div>;
  }
}

class TabContainer extends Component {
  state = {
    events: []
  };

  componentWillMount() {
    const { tracker } = this.props;
    this.setState({ events: tracker.serialize() || [] });
    tracker.onChange(() => {
      this.setState({ events: tracker.serialize() || [] });
    });
  }

  render() {
    const { events } = this.state;
    return (
      <div className={style.root}>
        {events
          .reverse()
          .slice(0, 50)
          .map((event, index) => (
            <Log event={JSON.stringify(event).substring(0, 500)} />
          ))}
      </div>
    );
  }
}

TabContainer.propTypes = {
  tracker: PropTypes.object.isRequired
};

export default TabContainer;
