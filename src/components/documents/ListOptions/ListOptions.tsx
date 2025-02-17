import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './ListOptions.styles';
import Colors from '../../../constants/colors';
interface ListOptionsProps {
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
  sortBy: 'title' | 'version';
  setSortBy: (option: 'title' | 'version') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const ListOptions = ({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: ListOptionsProps) => {
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleSortProp = () => {
    setSortBy(sortBy === 'title' ? 'version' : 'title');
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortProp}>
          <Icon name="sort" size={16} color="black" />
          <Text>Sort by: {sortBy === 'title' ? 'Title' : 'Version'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
          <Icon
            name={sortOrder === 'asc' ? 'caret-up' : 'caret-down'}
            size={16}
            color="black"
          />
        </TouchableOpacity>
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
            color={
              viewMode === 'list' ? Colors.filledIcon : Colors.textSecondary
            }
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
            color={
              viewMode === 'grid' ? Colors.filledIcon : Colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListOptions;
