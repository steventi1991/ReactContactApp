import 'react-native';
import 'isomorphic-fetch';
import React from 'react';
import Index from '../index.ios.js';

import renderer from 'react-test-renderer';
import App from '../src/App.js';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});
