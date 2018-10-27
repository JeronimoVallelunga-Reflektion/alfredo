import React, { Component } from 'react';
import PropTypes from 'prop-types';
import consoleTracker from './tracker/console';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CodeIcon from '@material-ui/icons/Code';
import SwapHorizontalCircleRoundedIcon from '@material-ui/icons/SwapHorizontalCircleRounded';

import TabContainer from './components/TabContainer';

import styles from './App.module.css';

function TabContainerOld(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const stylesTheme = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    zIndex: 1,
    position: 'fixed',
    margin: theme.spacing.unit,
    bottom: '64px',
    right: '0',
  },
});

class App extends Component {
  state = {
    open: false,
    value: 0,
  };

  handleToggle = () => {
    const value = this.state.open ? 0 : this.state.value;
    this.setState(state => ({ open: !state.open, value }));
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };  

  render() {
    const { classes } = this.props;
    const { open, value } = this.state;
    return (
      <div className={styles.App}>
        <Button variant="fab" color="primary" aria-label="Alfredo" className={classes.button} onClick={this.handleToggle}>
          <Avatar
            alt="AlfredO"
            src="https://image.ibb.co/iwJbAq/logo.jpg"
          />
        </Button>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper square className={classes.paper}>
            <Tabs value={value} onChange={this.handleChangeTab}>
              <Tab label="Console" icon={<CodeIcon />} />
              <Tab label="Network" icon={<NetworkCheckIcon />} />
              <Tab label="Human Events" icon={<FingerprintIcon />} />
              <Tab label="Redux Actions" icon={<SwapHorizontalCircleRoundedIcon />} />
            </Tabs>
            {value === 0 && <TabContainer tracker={consoleTracker} />}
            {value === 1 && <TabContainerOld>Item Two</TabContainerOld>}
            {value === 2 && <TabContainerOld>Item Three</TabContainerOld>}
            {value === 3 && <TabContainerOld>Item Four</TabContainerOld>}
          </Paper>
        </Slide>        
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesTheme)(App);