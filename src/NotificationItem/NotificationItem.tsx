import React from 'react';
import {View, Text} from 'react-native';
import {Notification} from '../hooks/useNotifications';
import {styles} from './NotificationItem.styles';
import getRelativeTime from '../utils/getRelativeTime';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = ({notification}: NotificationItemProps) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationText}>
      {notification.UserName} created the document: {notification.DocumentTitle}{' '}
      {getRelativeTime(notification.Timestamp)}
    </Text>
  </View>
);
