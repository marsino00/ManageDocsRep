import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  left: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  direction: {
    flexDirection: 'row',
    padding: 10,
  },
  modeButton: {},
  modeButtonActive: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modeButtonInactive: {
    backgroundColor: '#E1E2E6',

    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
