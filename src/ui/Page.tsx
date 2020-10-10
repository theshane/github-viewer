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
import {View, FlatList, Text} from 'react-native';
import {getCommits} from '../services/httpService';

interface ComponentProps {
  testID?: string;
  preProcessedCommits?: ItemProps[];
}

interface ItemProps {
  sha: string;
  message: string;
  name: string;
  index?: number;
  testID?: string;
}

const Item = ({
  sha,
  message,
  name,
  testID = 'Page:ListContainer:ListItem',
  index = 0,
}: ItemProps) => {
    console.log(`${testID}:${index}:name`);
  return (
    <View testID={`${testID}:${index}`}>
      <Text testID={`${testID}:${index}:message`}>{message}</Text>
      <Text testID={`${testID}:${index}:sha`}>{sha}</Text>
      <Text testID={`${testID}:${index}:name`}>{name}</Text>
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
        testID={`${testID}:ListContainer:ListItem`}
      />
    );
  };
  return (
    <>
      <View testID={`${testID}:container`}>
        <FlatList
          data={commits}
          testID={`${testID}:ListContainer`}
          renderItem={_renderItem}
          keyExtractor={(item: ItemProps) => item.sha}
        />
      </View>
    </>
  );
};
