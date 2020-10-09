/**
 * @format
 */

import React from 'react';
import {App} from '../src/ui/App';
import {utilGetFirstByTestID} from './utils/test_utils';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App testID="GHSpec" />);
  });

  it('should render the page component', () => {
    const app = renderer.create(<App testID="GHSpec" />);
    const page = utilGetFirstByTestID(app, 'GHSpec:Page');
    expect(page).toBeDefined();
  });
});
