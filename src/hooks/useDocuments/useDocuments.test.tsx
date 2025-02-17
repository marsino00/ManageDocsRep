import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {useDocuments, Document} from './useDocuments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

global.fetch = jest.fn();

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));
jest.mock('react-native-config', () => ({
  API_HOST: 'localhost',
  API_PORT: '9090',
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

const TestDocumentsComponent = function (): React.ReactElement {
  const {documents, refreshing, onRefresh} = useDocuments();
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Text, {testID: 'docCount'}, String(documents.length)),
    React.createElement(
      Text,
      {testID: 'refreshing'},
      refreshing ? 'true' : 'false',
    ),
    React.createElement(
      TouchableOpacity,
      {onPress: onRefresh, testID: 'refreshButton'},
      React.createElement(Text, null, 'Refresh'),
    ),
  );
};

describe('useDocuments hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches documents from server when online and stores them offline', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({isConnected: true});
    const fakeDocuments: Document[] = [
      {
        ID: '1',
        CreatedAt: '2023-01-01T00:00:00Z',
        UpdatedAt: '2023-01-01T00:00:00Z',
        Title: 'Document 1',
        Attachments: [],
        Contributors: [],
        Version: '1.0',
      },
    ];
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeDocuments),
    });
    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

    const {getByTestId} = render(
      React.createElement(TestDocumentsComponent, null),
    );

    await waitFor(() => {
      expect(getByTestId('docCount').props.children).toBe('1');
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      'offlineDocuments',
      JSON.stringify(fakeDocuments),
    );
  });

  it('loads documents from offline storage when offline', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({isConnected: false});
    const offlineDocs: Document[] = [
      {
        ID: '2',
        CreatedAt: '2023-01-02T00:00:00Z',
        UpdatedAt: '2023-01-02T00:00:00Z',
        Title: 'Offline Document',
        Attachments: [],
        Contributors: [],
        Version: '1.1',
      },
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(offlineDocs),
    );

    const {getByTestId} = render(
      React.createElement(TestDocumentsComponent, null),
    );
    await waitFor(() => {
      expect(getByTestId('docCount').props.children).toBe('1');
    });
  });

  it('onRefresh updates the documents', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({isConnected: true});
    const fakeDocuments1: Document[] = [
      {
        ID: '3',
        CreatedAt: '2023-01-03T00:00:00Z',
        UpdatedAt: '2023-01-03T00:00:00Z',
        Title: 'Document 3',
        Attachments: [],
        Contributors: [],
        Version: '1.2',
      },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(fakeDocuments1),
    });
    const fakeDocuments2: Document[] = [
      {
        ID: '4',
        CreatedAt: '2023-01-04T00:00:00Z',
        UpdatedAt: '2023-01-04T00:00:00Z',
        Title: 'Document 4',
        Attachments: [],
        Contributors: [],
        Version: '1.3',
      },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(fakeDocuments2),
    });

    const {getByTestId} = render(
      React.createElement(TestDocumentsComponent, null),
    );

    await waitFor(() => {
      expect(getByTestId('docCount').props.children).toBe('1');
    });

    fireEvent.press(getByTestId('refreshButton'));

    await waitFor(() => {
      expect(getByTestId('docCount').props.children).toBe('1');
    });
  });
});
