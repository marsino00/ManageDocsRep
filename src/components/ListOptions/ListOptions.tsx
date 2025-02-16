import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './ListOptions.styles';
interface ListOptionsProps {
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
}
const ListOptions = ({viewMode, setViewMode}: ListOptionsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.sortButton}>
          <Icon name="sort" size={16} color="black" />
          <Text>Sort by</Text>
        </View>
        <View style={styles.direction}>
          <Icon name="caret-down" size={16} color="black" />
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity
          onPress={() => setViewMode('list')}
          style={[
            styles.modeButton,
            viewMode === 'list'
              ? styles.modeButtonActive
              : styles.modeButtonInactive,
          ]}>
          <Icon
            name="th-list"
            size={14}
            color={viewMode === 'list' ? '#007bff' : '#888'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('grid')}
          style={[
            styles.modeButton,
            viewMode === 'grid'
              ? styles.modeButtonActive
              : styles.modeButtonInactive,
          ]}>
          <Icon
            name="th-large"
            size={14}
            color={viewMode === 'grid' ? '#007bff' : '#888'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListOptions;
