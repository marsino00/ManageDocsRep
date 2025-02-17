import React, {useState} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {styles} from './Header.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNotifications, {Notification} from '../../hooks/useNotifications';
import {NotificationBadge} from '../NotificationBadge/NotificationBadge';
import {NotificationItem} from '../../NotificationItem/NotificationItem';

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useNotifications((batch: Notification[]) => {
    setNotifications(prev => [...prev, ...batch]);
  });

  const modalNotifications = notifications.slice(-15);

  const renderNotification = ({item}: {item: Notification}) => (
    <NotificationItem notification={item} />
  );

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

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={modalNotifications}
              keyExtractor={item => item.DocumentID}
              renderItem={renderNotification}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
