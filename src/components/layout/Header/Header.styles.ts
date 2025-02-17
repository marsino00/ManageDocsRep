import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalbg,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    maxHeight: '80%',
    padding: 16,
  },
  modalHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  modalTitle: {
    fontWeight: 600,
    fontSize: 20,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.filledIcon,
  },
  flatListContainer: {
    paddingVertical: 8,
  },
});
