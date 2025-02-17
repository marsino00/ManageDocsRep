import React, {useMemo, useState, useCallback} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import DocumentCard from '../DocumentCard/DocumentCard';
import ListOptions from '../ListOptions/ListOptions';
import {styles} from './DocumentsList.styles';
import {Document, useDocuments} from '../../hooks/useDocuments/useDocuments';

const DocumentsList = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'title' | 'version'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const {documents, onRefresh} = useDocuments();
  const [refreshing, setRefreshing] = useState(false);
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

  const refreshDocuments = useCallback(async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

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
          <View
            style={[
              styles.cardContainer,
              viewMode === 'grid' && styles.cardContainerGrid,
            ]}>
            <DocumentCard doc={item} isGrid={viewMode === 'grid'} />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshDocuments}
          />
        }
      />
    </View>
  );
};

export default DocumentsList;
