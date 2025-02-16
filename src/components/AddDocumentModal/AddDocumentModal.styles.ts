import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
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
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  fileSelected: {
    marginTop: 4,
    fontStyle: 'italic',
    color: '#666',
  },
  chooseButton: {
    flexDirection: 'row',
    gap: 10,
    width: 130,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    padding: 10,
  },
  chooseFileText: {color: '#007bff'},
  titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  submitContainer: {padding: 15, backgroundColor: '#f3f4f6'},
});
