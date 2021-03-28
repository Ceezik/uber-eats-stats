import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const app = document.createElement('div');
app.id = 'uber-eats-stats-root';
document.body.append(app);
ReactDOM.render(React.createElement(App), app);
