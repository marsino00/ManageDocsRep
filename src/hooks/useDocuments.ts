import {useState, useCallback, useEffect} from 'react';
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

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/documents`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error at getting documents:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDocuments();
    setRefreshing(false);
  }, [fetchDocuments]);

  return {documents, refreshing, onRefresh};
};
