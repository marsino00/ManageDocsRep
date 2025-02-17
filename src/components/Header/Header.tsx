import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './Header.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNotifications, {
  Notification,
} from '../../hooks/useNotifications/useNotifications';
import {NotificationBadge} from '../NotificationBadge/NotificationBadge';
import NotificationsModal from '../NotificationsModal/NotificationsModal';

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useNotifications((batch: Notification[]) => {
    setNotifications(prev => [...prev, ...batch]);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      <TouchableOpacity
        disabled={notifications.length === 0 ? true : false}
        onPress={() => setModalVisible(true)}
        style={styles.iconContainer}>
        <Icon name="bell-o" size={24} color="#000" />
        <NotificationBadge count={notifications.length} />
      </TouchableOpacity>

      <NotificationsModal
        visible={modalVisible}
        notifications={notifications}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default Header;
