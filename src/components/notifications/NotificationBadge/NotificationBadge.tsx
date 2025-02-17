import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './NotificationBadge.styles';

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge = ({count}: NotificationBadgeProps) => {
  if (count === 0) {
    return null;
  }
  const badgeText = count > 15 ? '15+' : `${count}`;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{badgeText}</Text>
    </View>
  );
};
