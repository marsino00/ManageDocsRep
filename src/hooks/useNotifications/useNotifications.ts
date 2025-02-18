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
      console.log('Conectado al WebSocket de notificaciones');
    };

    ws.onmessage = e => {
      try {
        const notification: Notification = JSON.parse(e.data);
        batchRef.current.push(notification);
      } catch (error) {
        console.error('Error al parsear la notificación:', error);
      }
    };

    ws.onerror = e => {
      console.error('Error en WebSocket:', e.message);
    };

    ws.onclose = e => {
      console.log('WebSocket cerrado:', e.code, e.reason);
    };

    const intervalId = setInterval(() => {
      if (batchRef.current.length > 0) {
        onNotificationBatch([...batchRef.current]);
        batchRef.current = [];
      }
    }, 5000);

    return () => {
      ws.close();
      clearInterval(intervalId);
    };
  }, [onNotificationBatch]);
};
