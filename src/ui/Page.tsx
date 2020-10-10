/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {getCommits} from '../services/httpService';

interface ComponentProps {
  testID?: string;
  preProcessedCommits?: ItemProps[];
}

export interface ItemProps {
  sha: string;
  message: string;
  name: string;
  date: string;
  index?: number;
  testID?: string;
}

const styles = StyleSheet.create({
  itemStyle: {
    borderBottomColor: '#e1e4e8',
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {fontWeight: 'bold'},
  pageContainer: {borderColor: '#e1e4e8', borderWidth: 1, borderRadius: 6},
  fullHeight: {height: '100%'},
  muted: {color: '#999999'},
  noData: {padding: 15, alignSelf: 'center'},
});

const Item = ({
  sha,
  message,
  name,
  testID = 'Page:ListContainer:ListItem',
  index = 0,
  date,
}: ItemProps) => {
  return (
    <View testID={`${testID}:${index}`} style={styles.itemStyle}>
      <View style={styles.messageContainer}>
        <Text testID={`${testID}:${index}:message`} style={styles.bold}>
          {`${message.slice(0, 30)}...`}
        </Text>
        <Text testID={`${testID}:${index}:sha`} style={styles.muted}>
          {`sha: ${sha.slice(0, 7)}...`}
        </Text>
      </View>
      <View style={styles.nameContainer}>
        <Text testID={`${testID}:${index}:name`} style={styles.muted}>
          {name}
        </Text>
        <Text testID={`${testID}:${index}:date`} style={styles.muted}>
          {date}
        </Text>
      </View>
    </View>
  );
};

export const Page = ({
  testID = 'GH',
  preProcessedCommits = [],
}: ComponentProps) => {
  const [commits, setCommits] = useState(preProcessedCommits);
  useEffect(() => {
    preProcessedCommits.length === 0 &&
      getCommits().then((data) => {
        setCommits(data);
      });
  }, [preProcessedCommits.length]);

  const _renderItem = ({item, index}: {item: ItemProps; index: number}) => {
    return (
      <Item
        sha={item.sha}
        message={item.message}
        name={item.name}
        index={index}
        date={item.date}
        testID={`${testID}:ListContainer:ListItem`}
      />
    );
  };
  return (
    <>
      {commits.length ? (
        <View testID={`${testID}:container`} style={styles.pageContainer}>
          <FlatList
            data={commits}
            testID={`${testID}:ListContainer`}
            renderItem={_renderItem}
            keyExtractor={(item: ItemProps) => item.sha}
            style={styles.fullHeight}
          />
        </View>
      ) : (
        <Text style={styles.noData}>
          Unable to retreive data, please check your netwok settings.
        </Text>
      )}
    </>
  );
};
