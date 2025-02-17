import React from 'react';
import {View, Text} from 'react-native';
import {Notification} from '../hooks/useNotifications';
import {styles} from './NotificationItem.styles';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = ({notification}: NotificationItemProps) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationText}>
      {notification.UserName} created the document: {notification.DocumentTitle}
    </Text>
  </View>
);
