import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  left: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 8,
    shadowColor: Colors.textPrimary,
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
  modeButton: {paddingHorizontal: 20, paddingVertical: 10},
  modeButtonActive: {
    backgroundColor: Colors.background,
  },
  modeButtonInactive: {
    backgroundColor: Colors.inactive,
  },
});
