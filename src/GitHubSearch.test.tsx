import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GitHubSearch from './GitHubSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GitHubSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
