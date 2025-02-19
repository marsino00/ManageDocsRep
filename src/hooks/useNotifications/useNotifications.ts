import {useEffect, useRef} from 'react';
import Config from 'react-native-config';

export type Notification = {
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
};

export const useNotifications = (
  onNotificationBatch: (notifications: Notification[]) => void,
) => {
  const batchRef = useRef<Notification[]>([]);

  useEffect(() => {
    const API_URL = `${Config.API_HOST}:${Config.API_PORT}`;
    const ws = new WebSocket(`ws://${API_URL}/notifications`);

    ws.onopen = () => {
      console.log('Connected to the WebSocket for notifications');
    };

    ws.onmessage = e => {
      try {
        const notification: Notification = JSON.parse(e.data);
        batchRef.current.push(notification);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };

    ws.onerror = e => {
      console.error('WebSocket error:', e.message);
    };

    ws.onclose = e => {
      console.log('WebSocket closed:', e.code, e.reason);
    };

    //Sends accumulated notifications in batches every 5 seconds and clears the ref.
    const intervalId = setInterval(() => {
      if (batchRef.current.length > 0) {
        onNotificationBatch([...batchRef.current]);
        batchRef.current = [];
      }
    }, 5000);

    //Clean ws connection and interval on unmount.
    return () => {
      ws.close();
      clearInterval(intervalId);
    };
  }, [onNotificationBatch]);
};
