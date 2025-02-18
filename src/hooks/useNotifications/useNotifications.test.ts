import React from 'react';
import {Text} from 'react-native';
import {render, act} from '@testing-library/react-native';
import {Notification, useNotifications} from './useNotifications';

jest.useFakeTimers();
jest.mock('react-native-config', () => ({
  API_HOST: 'localhost',
  API_PORT: '9090',
}));

class FakeWebSocket {
  static instances: FakeWebSocket[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((e: {data: string}) => void) | null = null;
  onerror: ((e: {message: string}) => void) | null = null;
  onclose: ((e: {code: number; reason: string}) => void) | null = null;

  constructor() {
    FakeWebSocket.instances.push(this);
    setTimeout(() => {
      if (this.onopen) {
        this.onopen();
      }
    }, 0);
  }
  send() {}
  close() {}
}

(global as any).WebSocket = FakeWebSocket;

const TestNotificationsComponent = function (): React.ReactElement {
  const [batchCount, setBatchCount] = React.useState<number>(0);
  useNotifications((notificationsBatch: Notification[]) => {
    setBatchCount(notificationsBatch.length);
  });
  return React.createElement(Text, {testID: 'batchCount'}, String(batchCount));
};

describe('useNotifications hook', () => {
  afterEach(() => {
    FakeWebSocket.instances = [];
    jest.clearAllTimers();
  });

  it('accumulates notifications and calls onNotificationBatch every 5 seconds', () => {
    const {getByTestId} = render(
      React.createElement(TestNotificationsComponent, null),
    );

    const fakeNotification1: Notification = {
      Timestamp: new Date().toISOString(),
      UserID: 'user1',
      UserName: 'Alice',
      DocumentID: 'doc1',
      DocumentTitle: 'Document 1',
    };
    const fakeNotification2: Notification = {
      Timestamp: new Date().toISOString(),
      UserID: 'user2',
      UserName: 'Bob',
      DocumentID: 'doc2',
      DocumentTitle: 'Document 2',
    };

    act(() => {
      if (FakeWebSocket.instances[0].onmessage) {
        FakeWebSocket.instances[0].onmessage({
          data: JSON.stringify(fakeNotification1),
        });
        FakeWebSocket.instances[0].onmessage({
          data: JSON.stringify(fakeNotification2),
        });
      }
      jest.advanceTimersByTime(5000);
    });

    const batchCountText = getByTestId('batchCount').props.children;
    expect(Number(batchCountText)).toBe(2);
  });
});
