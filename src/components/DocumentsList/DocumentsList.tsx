import React, {useMemo, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDocuments, Document} from '../../hooks/useDocuments';
import DocumentCard from '../DocumentCard/DocumentCard';
import ListOptions from '../ListOptions/ListOptions';
import {styles} from './DocumentsList.styles';

const DocumentsList = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'title' | 'version'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const {documents} = useDocuments();
  const numColumns = viewMode === 'grid' ? 2 : 1;
  const sortedDocuments = useMemo(() => {
    return [...documents].sort((a, b) => {
      const aValue =
        sortBy === 'title' ? a.Title.toLowerCase() : a.Version.toLowerCase();
      const bValue =
        sortBy === 'title' ? b.Title.toLowerCase() : b.Version.toLowerCase();

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [documents, sortBy, sortOrder]);
  return (
    <View style={styles.container}>
      <ListOptions
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <FlatList
        data={sortedDocuments}
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
