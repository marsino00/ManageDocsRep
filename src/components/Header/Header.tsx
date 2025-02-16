import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './Header.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      <Icon name="bell-o" size={16} color="black" />
    </View>
  );
};

export default Header;
