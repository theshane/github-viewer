/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {Page} from './Page';

interface GenericComponentProps {
  testID?: string;
  dependencies?: {
    getCommits: Function;
    useState: [any, Function];
  };
}

export const App = ({testID}: GenericComponentProps) => {
  return (
    <>
      <SafeAreaView testID={testID}>
        <Page
          testID={`${testID}:Page`}
          preProcessedCommits={[
            {
              sha: '12345332144314321',
              name: 'Shane Burgess',
              message: 'Tesst message',
            },
            {
              sha: '12345332144314322',
              name: 'Shane Burgess',
              message: 'Tesst message',
            },
            {
              sha: '12345332144314323',
              name: 'Shane Burgess',
              message: 'Tesst message',
            },
          ]}
        />
      </SafeAreaView>
    </>
  );
};
