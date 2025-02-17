import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  notificationItem: {
    borderBottomWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
});
