/**
 * @format
 */

import React from 'react';
import {Page} from '../src/ui/PAge';
import {utilGetFirstByTestID} from './utils/test_utils';
import {testCommits} from './fixtures/testData';
import moxios from 'moxios';

// Note: test renderer must be required after react-native.
import renderer, {act, ReactTestRenderer} from 'react-test-renderer';
import {processCommit} from '../src/services/httpService';

// I am not sure why I need this
jest.useFakeTimers();

describe('Page', () => {
  let app: ReactTestRenderer;
  beforeEach(() => {
    act(() => {
      app = renderer.create(
        <Page
          testID="GHSpec:Page"
          preProcessedCommits={testCommits.map((commit) => processCommit(commit))}
        />,
      );
    });
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render the page component', () => {
    const page = utilGetFirstByTestID(app, 'GHSpec:Page:container');
    expect(page).toBeDefined();
  });

  it('should render the list container', () => {
    const container = utilGetFirstByTestID(app, 'GHSpec:Page:ListContainer');
    expect(container).toBeDefined();
  });

  it('should render the list items', () => {
    const item = utilGetFirstByTestID(
      app,
      'GHSpec:Page:ListContainer:ListItem:0',
    );
    expect(item).toBeDefined();
  });

  it('should render the message in the list item', () => {
    const itemMessage = utilGetFirstByTestID(
      app,
      'GHSpec:Page:ListContainer:ListItem:0:message',
    );
    expect(itemMessage).toBeDefined();
    expect(itemMessage?.props.children).toEqual(testCommits[0].commit.message);
  });

  it('should render the sha in the list item', () => {
    const itemMessage = utilGetFirstByTestID(
      app,
      'GHSpec:Page:ListContainer:ListItem:0:sha',
    );
    expect(itemMessage).toBeDefined();
    expect(itemMessage?.props.children).toEqual(testCommits[0].sha);
  });

  it('should render the name in the list item', () => {
    const itemName = utilGetFirstByTestID(
      app,
      'GHSpec:Page:ListContainer:ListItem:0:name',
    );
    expect(itemName).toBeDefined();
    expect(itemName?.props.children).toEqual(testCommits[0].commit.author.name);
  });
});
