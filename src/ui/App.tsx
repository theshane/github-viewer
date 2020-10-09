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
import {SafeAreaView, View, Text} from 'react-native';

interface AppProps {
  testID?: string;
}

export const App = ({testID}: AppProps) => {
  return (
    <>
      <SafeAreaView testID={testID}>
        <View testID={`${testID}:Page`}>
          <Text>Page</Text>
        </View>
      </SafeAreaView>
    </>
  );
};
