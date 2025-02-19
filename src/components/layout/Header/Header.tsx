import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './Header.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Notification, useNotifications} from 'hooks';
import {NotificationBadge, NotificationsModal} from 'components/notifications';
import Colors from 'constants/colors';

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
        <Icon name="bell-o" size={24} color={Colors.textSecondary} />
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
