import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './ListOptions.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text>Sort by</Text>
        <Icon name="caret-down" size={16} color="black" />
      </View>
      <View style={styles.right}>
        <Icon name="th-list" size={16} color="black" />
        <Icon name="th" size={16} color="black" />
      </View>
    </View>
  );
};

export default ListOptions;
