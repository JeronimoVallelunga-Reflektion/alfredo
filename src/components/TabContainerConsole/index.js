import React from 'react';
import consoleTracker from '../../tracker/console';
import TabContainer from '../TabContainer';

consoleTracker.start();
export default () => <TabContainer tracker={consoleTracker} />;