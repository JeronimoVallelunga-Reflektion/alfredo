import actionsTracker from '../tracker/actions';
import consoleTracker from '../tracker/console';
import humanTracker from '../tracker/human';
import networkTracker from '../tracker/network';

function downloadObjectAsJson(exportObj, exportName) {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export const create = () => {
  const issue = {
    version: window.rfk_portal_version(),
    timestamp: Date.now(),
    data: {
      actions: actionsTracker.serialize(),
      console: consoleTracker.serialize(),
      human: humanTracker.serialize(),
      network: networkTracker.serialize()
    }
  };

  return new Promise(resolve => {
    console.log('Issue created', issue);
    downloadObjectAsJson(issue, `issue-${new Date().toISOString()}`);
    resolve(issue);
  });
};
