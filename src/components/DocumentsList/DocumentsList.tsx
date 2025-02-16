import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDocuments, Document} from '../../hooks/useDocuments';
import DocumentCard from '../DocumentCard/DocumentCard';
import ListOptions from '../ListOptions/ListOptions';
import {styles} from './DocumentsList.styles';

const DocumentsList = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const {documents} = useDocuments();

  const numColumns = viewMode === 'grid' ? 2 : 1;

  return (
    <View style={styles.container}>
      <ListOptions viewMode={viewMode} setViewMode={setViewMode} />
      <FlatList
        data={documents}
        key={viewMode}
        keyExtractor={(item: Document) => item.ID}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 && styles.columnWrapper}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <DocumentCard doc={item} isGrid={viewMode === 'grid'} />
          </View>
        )}
      />
    </View>
  );
};

export default DocumentsList;
