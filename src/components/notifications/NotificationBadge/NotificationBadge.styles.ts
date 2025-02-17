import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 5,
    right: 3,
    backgroundColor: Colors.filledIcon,
    borderRadius: 15,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  badgeText: {
    color: Colors.background,
    fontSize: 8,
    fontWeight: 'bold',
  },
});
