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
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {Page} from './Page';

const styles = StyleSheet.create({
  safeAreaStyle: {margin: 10, flex: 1},
  headerStyle: {fontWeight: 'bold', fontSize: 24, alignSelf: 'center'},
});

export const App = () => {
  return (
    <>
      <SafeAreaView testID={'GHApp'} style={styles.safeAreaStyle}>
        <Text style={styles.headerStyle}>GithubViewerBurgess</Text>
        <Page testID="GHApp:Page" />
      </SafeAreaView>
    </>
  );
};
