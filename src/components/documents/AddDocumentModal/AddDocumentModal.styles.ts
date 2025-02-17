import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalbg,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    padding: 16,
    gap: 5,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  fileSelected: {
    marginTop: 4,
    fontStyle: 'italic',
    color: Colors.textSecondary,
  },
  chooseButton: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    padding: 10,
    alignSelf: 'flex-start',
  },
  chooseFileText: {color: Colors.filledIcon, flexShrink: 1},
  titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  submitContainer: {padding: 15, backgroundColor: Colors.appBackground},
});
