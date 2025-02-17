import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardGrid: {
    marginBottom: 5,
    padding: 10,
    maxHeight: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    gap: 5,
    marginBottom: 8,
  },
  headerGrid: {
    flexDirection: 'column',
    minHeight: 60,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  version: {
    fontSize: 10,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    marginRight: 16,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
  listItem: {
    color: '#666',
  },
  icon: {
    color: '#000',
  },
});
