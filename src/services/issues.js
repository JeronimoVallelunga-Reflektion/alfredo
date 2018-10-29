import actionsTracker from '../tracker/actions';
import consoleTracker from '../tracker/console';
import humanTracker from '../tracker/human';
import networkTracker from '../tracker/network';

export const create = () => {
  const issue = {
    actions: actionsTracker.serialize(),
    console: consoleTracker.serialize(),
    human: humanTracker.serialize(),
    network: networkTracker.serialize(),
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Issue created', issue);
      resolve(issue);
    }, 2000);
  });
};
