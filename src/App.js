import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import './App.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
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

export default withStyles(styles)(App);