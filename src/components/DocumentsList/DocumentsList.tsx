import React from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';
import {styles} from './DocumentsList.styles';
import {useDocuments, Document} from '../../hooks/useDocuments';

const DocumentsList = () => {
  const {documents, refreshing, onRefresh} = useDocuments();

  const renderItem = ({item}: {item: Document}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text>{new Date(item.CreatedAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <FlatList
      data={documents}
      keyExtractor={item => item.ID}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default DocumentsList;
