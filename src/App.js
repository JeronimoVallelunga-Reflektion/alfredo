import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import BugIcon from '@material-ui/icons/BugReport';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CodeIcon from '@material-ui/icons/Code';
import SwapHorizontalCircleRoundedIcon from '@material-ui/icons/SwapHorizontalCircleRounded';

import { create as createIssue } from './services/issues';

import TabContainerConsole from './components/TabContainerConsole';
import TabContainerActions from './components/TabContainerActions';
import TabContainerHuman from './components/TabContainerHuman';
import TabContainerNetwork from './components/TabContainerNetwork';

import timetravel from './timetravel';

import styles from './App.module.css';

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

  handleCreate = () => {
    createIssue()
      .then(() => {
        alert('Issue created!');
      });
  };

  handleToggle = () => {
    const value = this.state.open ? 0 : this.state.value;
    this.setState(state => ({ open: !state.open, value }));
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleTimetravel = () => {
    timetravel.start();
  }

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
            {value === 0 && <TabContainerConsole />}
            {value === 1 && <TabContainerNetwork />}
            {value === 2 && <TabContainerHuman />}
            {value === 3 && <TabContainerActions />}
            <div className={styles.actions}>
              <IconButton className={classes.button} aria-label="Bug" onClick={this.handleCreate}>
                <BugIcon />
              </IconButton>
              <IconButton className={classes.button} aria-label="Play" onClick={this.handleTimetravel} >
                <PlayIcon />
              </IconButton>
            </div>
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
