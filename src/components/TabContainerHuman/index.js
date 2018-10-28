import React from 'react';
import humanTracker from '../../tracker/human';
import TabContainer from '../TabContainer';

humanTracker.start();
export default () => <TabContainer tracker={humanTracker} />;