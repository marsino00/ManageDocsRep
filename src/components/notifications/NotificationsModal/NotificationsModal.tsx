import React from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {styles} from './NotificationsModal.styles';
import {Notification} from 'hooks';
import {NotificationItem} from '..';

type NotificationsModalProps = {
  visible: boolean;
  notifications: Notification[];
  onClose: () => void;
};

export const NotificationsModal = ({
  visible,
  notifications,
  onClose,
}: NotificationsModalProps) => {
  const modalNotifications = notifications.slice(-15);

  const renderNotification = ({item}: {item: Notification}) => (
    <NotificationItem notification={item} />
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
  );
};

// export default NotificationsModal;
