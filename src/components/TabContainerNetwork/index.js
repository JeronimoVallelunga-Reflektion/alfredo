import React from 'react';
import networkTracker from '../../tracker/network';
import TabContainer from '../TabContainer';

networkTracker.start();
export default () => <TabContainer tracker={networkTracker} />;