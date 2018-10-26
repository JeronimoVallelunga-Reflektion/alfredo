import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import styles from './App.module.css';

const stylesTheme = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={styles.App}>
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
          <FaceIcon />
        </Button>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesTheme)(App);