import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CodeIcon from '@material-ui/icons/Code';
import SwapHorizontalCircleRoundedIcon from '@material-ui/icons/SwapHorizontalCircleRounded';
import styles from './App.module.css';

function TabContainer(props) {
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
    left: '0',
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
          <FaceIcon />
        </Button>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper square className={classes.paper}>
            <Tabs value={value} onChange={this.handleChangeTab}>
              <Tab label="Console" icon={<CodeIcon />} />
              <Tab label="Network" icon={<NetworkCheckIcon />} />
              <Tab label="Human Events" icon={<FingerprintIcon />} />
              <Tab label="Redux Actions" icon={<SwapHorizontalCircleRoundedIcon />} />
            </Tabs>
            {value === 0 && <TabContainer>Item One</TabContainer>}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>}
            {value === 3 && <TabContainer>Item Four</TabContainer>}
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