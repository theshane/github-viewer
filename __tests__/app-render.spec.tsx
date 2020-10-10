/**
 * @format
 */

import React from 'react';
import {App} from '../src/ui/App';
import {utilGetFirstByTestID} from './utils/test_utils';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.useFakeTimers();

describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should render the page component', () => {
    const app = renderer.create(<App />);
    const page = utilGetFirstByTestID(app, 'GHApp:Page');
    expect(page).toBeDefined();
  });
});
