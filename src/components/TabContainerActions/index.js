import React from 'react';
import actionsTracker from '../../tracker/actions';
import TabContainer from '../TabContainer';

actionsTracker.start();
export default () => <TabContainer tracker={actionsTracker} />;