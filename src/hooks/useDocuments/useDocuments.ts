import {useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

export type Document = {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Attachments: string[];
  Contributors: {ID: string; Name: string}[];
  Version: string;
};

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const API_URL = `${Config.API_HOST}:${Config.API_PORT}`;
  const STORAGE_KEY = 'offlineDocuments';

  //Stores the provided documents in AsyncStorage for offline access.
  const storeDocumentsOffline = async (docs: Document[]) => {
    try {
      const jsonValue = JSON.stringify(docs);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error storing offline documents:', error);
    }
  };

  //Loads documents from AsyncStorage in case the user is offline.
  const loadDocumentsOffline = async (): Promise<Document[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading offline documents:', error);
      return [];
    }
  };

  /*
    Fetches documents from the server if the user is online.
    If not , loads them from AsyncStorage and update the state with the retrieved data.
  */
  const fetchDocuments = useCallback(async () => {
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const response = await fetch(`http://${API_URL}/documents`);
        const data = await response.json();
        setDocuments(data);
        storeDocumentsOffline(data);
      } else {
        console.warn('No internet connection. Loading offline documents...');
        const offlineDocs = await loadDocumentsOffline();
        setDocuments(offlineDocs);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      const offlineDocs = await loadDocumentsOffline();
      setDocuments(offlineDocs);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  //Refreshes the document list when the user pulls to refresh.
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDocuments();
    setRefreshing(false);
  }, [fetchDocuments]);

  //Creates a new document and updates the state and AsyncStorage with the new data.
  const onCreate = useCallback(
    async (newDocData: {name: string; version: string; file: string}) => {
      const newDoc: Document = {
        ID: Date.now().toString(),
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
        Title: newDocData.name,
        Attachments: [newDocData.file],
        Contributors: [{ID: '1234', Name: 'Roger'}],
        Version: newDocData.version,
      };

      const updatedDocuments = [newDoc, ...documents];
      setDocuments(updatedDocuments);
      await storeDocumentsOffline(updatedDocuments);
    },
    [documents],
  );
  return {documents, refreshing, onRefresh, onCreate};
};
