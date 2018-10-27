import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const alfredo = document.createElement('div');
alfredo.id = 'alfredo-root';
document.getElementsByTagName('body')[0].appendChild(alfredo);

ReactDOM.render(<App />, alfredo);
